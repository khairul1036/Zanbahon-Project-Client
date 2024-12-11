import React, { useState, useEffect, useRef, useContext, useId } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import Header from "../components/Header";
import { FaCar, FaTruckMoving } from "react-icons/fa";
import { GiPathDistance } from "react-icons/gi";
import { IoTimeOutline } from "react-icons/io5";
import { TbCurrencyTaka } from "react-icons/tb";
import { PiMotorcycleFill } from "react-icons/pi";
import { BiSolidBusSchool } from "react-icons/bi";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const ShareRide = () => {
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const [routingControl, setRoutingControl] = useState(null);
  const [startLocation, setStartLocation] = useState({
    value: "",
    lat: null,
    lon: null,
  });
  const [endLocation, setEndLocation] = useState({
    value: "",
    lat: null,
    lon: null,
  });
  const [autocompleteResults, setAutocompleteResults] = useState({
    start: [],
    end: [],
  });
  const [map, setMap] = useState(null);

  // New state for distance and duration
  const [distanceKm, setDistanceKm] = useState(null);
  const [durationHours, setDurationHours] = useState(null);
  const [durationMin, setDurationMin] = useState(null);

  // fetch vehicle info
  const [vehicles, setVehicles] = useState([]);
  const { dbUserName, UserId, dbUserEmail, dbUserRole } = useContext(AuthContext);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize the map only once
    const leafletMap = L.map(mapRef.current).setView([23.8103, 90.4125], 8);

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(leafletMap);

    setMap(leafletMap);

    return () => {
      // Cleanup the map on component unmount
      if (leafletMap) {
        leafletMap.remove();
      }
    };
  }, []);

  const fetchAutocomplete = async (query, type) => {
    if (!query) {
      setAutocompleteResults((prev) => ({ ...prev, [type]: [] }));
      return;
    }
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${query}&countrycodes=BD`
    );
    const locations = await response.json();
    setAutocompleteResults((prev) => ({ ...prev, [type]: locations }));
  };

  const handleAutocompleteSelect = (type, location) => {
    if (type === "start") {
      setStartLocation({
        value: location.display_name,
        lat: location.lat,
        lon: location.lon,
      });
      setAutocompleteResults((prev) => ({ ...prev, start: [] }));
    } else {
      setEndLocation({
        value: location.display_name,
        lat: location.lat,
        lon: location.lon,
      });
      setAutocompleteResults((prev) => ({ ...prev, end: [] }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!startLocation.lat || !endLocation.lat) {
      alert("Please select valid locations from the dropdown.");
      return;
    }

    const startLatLng = [
      parseFloat(startLocation.lat),
      parseFloat(startLocation.lon),
    ];
    const endLatLng = [
      parseFloat(endLocation.lat),
      parseFloat(endLocation.lon),
    ];

    if (routingControl) {
      map.removeControl(routingControl);
    }

    const newRoutingControl = L.Routing.control({
      waypoints: [L.latLng(...startLatLng), L.latLng(...endLatLng)],
      routeWhileDragging: true,
      showAlternatives: true,
      altLineOptions: { styles: [{ color: "blue", opacity: 0.6, weight: 6 }] },
    })
      .on("routesfound", (e) => {
        const route = e.routes[0];
        const distance = (route.summary.totalDistance / 1000).toFixed(1);
        const totalTimeInMinutes = route.summary.totalTime / 60;
        const hours = Math.floor(totalTimeInMinutes / 60);
        const minutes = Math.round(totalTimeInMinutes % 60);

        // Set the state with calculated values
        setDistanceKm(distance);
        setDurationHours(hours);
        setDurationMin(minutes);
      })
      .addTo(map);

    setRoutingControl(newRoutingControl);
    // form.reset();
  };

  // Automatically show the modal when the values are available
  useEffect(() => {
    if (distanceKm && durationHours !== null && durationMin !== null) {
      document.getElementById("my_modal_5").showModal();
    }
  }, [distanceKm, durationHours, durationMin]);



 // fetch vehicle info
 useEffect(() => {
    fetch("http://localhost/zanbahon-server/vehicle.php")
      .then((res) => res.json())
      .then((data) => setVehicles(data.vehicles))
      .catch((err) => console.log(err));
  }, []);

console.log(vehicles);

const handleRideSubmitData= (VehicleId, startLocation, endLocation, totalAmount, distanceKm, durationHours, durationMin) => {    
     const rider_id = UserId;
     const driver_id = 0;
     const vehicle_id = VehicleId;
     const ServiceName  = "Ride Share";
     const pickup_location = startLocation;
     const drop_location = endLocation;
     const total_fare_amount = totalAmount;
     const total_distance = distanceKm;
     const approximate_time = `${durationHours}h ${durationMin}m`;

     const requestRideShare = {rider_id, driver_id, vehicle_id, ServiceName, pickup_location, drop_location, total_fare_amount, total_distance, approximate_time}

     console.log(requestRideShare);

     if (requestRideShare) {
       // store user details in database
       fetch("http://localhost/zanbahon-server/ride.php", {
         method: "POST",
         headers: {
           "content-type": "application/json",
         },
         body: JSON.stringify(requestRideShare),
       })
         .then((res) => res.json())
         .then((data) => {
           console.log(data.ServiceId);
           if(data.ServiceId){
            document.getElementById("my_modal_5").close();
            navigate('/all-service')
           }
        //    form.reset();
         });
     } else {
       return;
     }

}

  return (
    <div>
      <header className="z-20">
        <Header />
      </header>
      <main>
        <div className="container mx-auto p-4">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <div className="w-full md:w-1/4 bg-white shadow-md p-4 mb-4 md:mb-0 md:mr-4">
              <h2 className="text-lg font-semibold mb-2">Set Waypoints</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">
                    Pickup Location
                  </label>
                  <input
                    type="text"
                    placeholder="Type a location..."
                    value={startLocation.value}
                    onChange={(e) => {
                      setStartLocation({
                        ...startLocation,
                        value: e.target.value,
                      });
                      fetchAutocomplete(e.target.value, "start");
                    }}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  <div className="w-60 autocomplete-box">
                    {autocompleteResults.start.map((location, index) => (
                      <div
                        key={index}
                        className="autocomplete-item"
                        onClick={() =>
                          handleAutocompleteSelect("start", location)
                        }
                      >
                        {location.display_name}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Destination Location
                  </label>
                  <input
                    type="text"
                    placeholder="Type a location..."
                    value={endLocation.value}
                    onChange={(e) => {
                      setEndLocation({ ...endLocation, value: e.target.value });
                      fetchAutocomplete(e.target.value, "end");
                    }}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  <div className="w-60 autocomplete-box">
                    {autocompleteResults.end.map((location, index) => (
                      <div
                        key={index}
                        className="autocomplete-item"
                        onClick={() =>
                          handleAutocompleteSelect("end", location)
                        }
                      >
                        {location.display_name}
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#178783] text-white rounded-md p-2"
                >
                  Plot Route
                </button>
              </form>
            </div>
            <div
              id="map"
              ref={mapRef}
              className="w-full md:w-3/4 h-96 pb-20 z-10"
            ></div>
          </div>
        </div>
      </main>


      {/* Modal show available vehicle*/}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
            <div className="text-right">
                <form method="dialog">
                <button className="text-2xl text-gray-600">X</button>
                </form>
            </div>
          <h3 className="text-lg font-semibold mb-3">Choose a Ride</h3>
          
          {/* <p><strong>Start Location:</strong> {startLocation.value}</p>
          <p><strong>End Location:</strong> {endLocation.value}</p>
          <p><strong>Distance:</strong> {distanceKm} km</p>
          <p><strong>Duration:</strong> {durationHours} hours and {durationMin} minutes</p> */}

        <div className="grid grid-cols-1 gap-4">
        {vehicles.map((vehi) => (
            <div
            key={vehi.VehicleId}
            className="bg-white rounded-lg overflow-hidden border border-[#178783]"
            >
            <div className="flex justify-between items-center p-4">
                {/* Vehicle Type with Icon */}
                {(() => {
                    switch (vehi.VehicleType) {
                    case "Car":
                        return (
                            <FaCar className="text-6xl p-3 text-[#178783] border border-[#178783] rounded-full"/>
                        );
                    case "Motorcycle":
                        return (
                            <PiMotorcycleFill className="text-6xl p-3 text-[#178783] border border-[#178783] rounded-full"/>
                        );
                    case "Truck":
                        return (
                            <FaTruckMoving className="text-6xl p-3 text-[#178783] border border-[#178783] rounded-full"/>
                        );
                    default:
                        return (
                            <BiSolidBusSchool className="text-6xl p-3 text-[#178783] border border-[#178783] rounded-full"/>
                        );
                    }
                })()}
                <div className="space-y-1">
                    <h3 className="text-lg font-semibold">{vehi.VehicleType}</h3>
                    {/* Vehicle Details */}
                    <div className="flex items-center">
                        <GiPathDistance className="text-xl mr-2"/> 
                        <p className="text-sm">
                        {distanceKm} km
                        </p>
                    </div>
                    <div className="flex items-center">
                        <IoTimeOutline className="text-xl mr-2"/>
                        <p className="text-sm">
                        {durationHours}h {durationMin}m
                        </p>
                    </div>
                </div>


                {/* Button */}
                <div className="space-y-1">
                    <div className="flex items-center font-bold">
                        <TbCurrencyTaka className="text-2xl"/>
                        <p className="text-xl">
                            {parseInt(vehi.perKMRate*distanceKm)}
                        </p>
                    </div>
                    <button onClick={()=> handleRideSubmitData(vehi.VehicleId, startLocation.value, endLocation.value, vehi.perKMRate*distanceKm, distanceKm, durationHours, durationMin)} className="font-semibold border border-[#178783] text-[#178783] py-2 px-4 rounded-md hover:bg-[#178783] hover:text-white">
                    Select
                    </button>
                </div>
            </div>
            </div>
        ))}
        </div>
        </div>
      </dialog>
    </div>
  );
};

export default ShareRide;
