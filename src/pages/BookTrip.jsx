import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { AuthContext } from "../provider/AuthProvider";

const BookTrip = () => {
  const { UserId } = useContext(AuthContext);
  const navigate = useNavigate();
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
  const [distanceKm, setDistanceKm] = useState(null);
  const [durationHours, setDurationHours] = useState(null);
  const [durationMin, setDurationMin] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [amount, setAmount] = useState(0);

  const fetchAutocomplete = async (query, type) => {
    if (!query) {
      setAutocompleteResults((prev) => ({ ...prev, [type]: [] }));
      return;
    }
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}&countrycodes=BD`
      );
      const locations = await response.json();
      setAutocompleteResults((prev) => ({ ...prev, [type]: locations }));
    } catch (error) {
      console.error("Error fetching autocomplete results:", error);
    }
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
    const {
      pickup,
      dropoff,
      date,
      vehicleType,
      tripType,
      pickupTime,
      paymentMethod,
    } = e.target;

    // Ensure start and end locations are valid
    if (
      !startLocation ||
      !startLocation.lat ||
      !endLocation ||
      !endLocation.lat
    ) {
      alert("Please select valid locations from the dropdown.");
      return;
    }

    // Mock calculation for distance and duration
    const distance = (Math.random() * (50 - 5) + 5).toFixed(1); // Random distance between 5 and 50 km
    const totalTimeInMinutes = Math.random() * (120 - 30) + 30; // Random time between 30 and 120 minutes
    const hours = Math.floor(totalTimeInMinutes / 60);
    const minutes = Math.round(totalTimeInMinutes % 60);

    // Set the calculated values
    setDistanceKm(distance);
    setDurationHours(hours);
    setDurationMin(minutes);
    const totalAmount = distance * 7;
    setAmount(totalAmount);
    // Create the reserveTrip object with form data and calculated values
    const reserveTrip = {
      pickup_location: startLocation.value,
      drop_location: endLocation.value,
      RideStartTime: date.value + " " + pickupTime.value,
      vehicle_id: vehicleType.value,
      total_distance: distance,
      approximate_time: `${hours} hours ${minutes} minutes`,
      total_fare_amount: totalAmount.toFixed(1),
      service_name: "Reservation",
      rider_id: UserId,
    };

    console.log(reserveTrip);

    // Display the modal with trip details
    setIsModalVisible(true);

    if (reserveTrip) {
      // store user details in database
      fetch("http://localhost/zanbahon-server/ride.php", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(reserveTrip),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.ServiceId) {
            alert('go go go....')
          }
          //    form.reset();
        });
    } else {
      return;
    }
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen p-6 bg-gray-100 mb-20">
        <div className="w-full bg-white rounded-xl shadow-lg p-6 max-w-7xl mx-auto">
          <h2 className="text-4xl font-semibold text-center text-[#188784] mb-6">
            Book Your Trip
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Pickup Location */}
            <div className="mb-4">
              <label className="block text-sm font-medium">
                Pickup Location
              </label>
              <input
                type="text"
                placeholder="Type a location..."
                value={startLocation.value}
                onChange={(e) => {
                  setStartLocation({ ...startLocation, value: e.target.value });
                  fetchAutocomplete(e.target.value, "start");
                }}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {autocompleteResults.start.length > 0 && (
                <div className="w-full bg-white border border-gray-300 rounded-md shadow-lg absolute z-10">
                  {autocompleteResults.start.map((location, index) => (
                    <div
                      key={index}
                      className="p-2 cursor-pointer hover:bg-gray-100"
                      onClick={() =>
                        handleAutocompleteSelect("start", location)
                      }
                    >
                      {location.display_name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Destination Location */}
            <div className="mb-4">
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
              {autocompleteResults.end.length > 0 && (
                <div className="w-full bg-white border border-gray-300 rounded-md shadow-lg absolute z-10">
                  {autocompleteResults.end.map((location, index) => (
                    <div
                      key={index}
                      className="p-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleAutocompleteSelect("end", location)}
                    >
                      {location.display_name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Additional Inputs */}
            <div className="grid md:grid-cols-2 gap-5">
              <div className="mb-4">
                <label htmlFor="date" className="block text-sm font-medium">
                  Date of Reservation:
                </label>
                <input
                  type="date"
                  name="date"
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="vehicleType"
                  className="block text-sm font-medium"
                >
                  Vehicle Type:
                </label>
                <select
                  name="vehicleType"
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="1">Motorcycle</option>
                  <option value="3">Car</option>
                  <option value="4">Truck</option>
                  <option value="5">Other</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Trip Type:</label>
              <div className="flex items-center">
                <label className="flex items-center mr-4">
                  <input
                    type="radio"
                    name="tripType"
                    value="One Way"
                    className="mr-2"
                  />{" "}
                  One Way
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="tripType"
                    value="Round Trip"
                    className="mr-2"
                  />{" "}
                  Round Trip
                </label>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="pickupTime" className="block text-sm font-medium">
                Pickup Time:
              </label>
              <input
                type="time"
                name="pickupTime"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="paymentMethod"
                className="block text-sm font-medium"
              >
                Payment Method:
              </label>
              <select
                name="paymentMethod"
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="Cash">Cash</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Mobile Banking">Mobile Banking</option>
              </select>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[#188784] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#166c6e] transition"
              >
                Calculate Trip
              </button>
            </div>
          </form>

          {/* Modal for Distance and Duration */}
          {isModalVisible && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                <h3 className="text-lg font-semibold text-[#188784] mb-4">
                  Trip Details
                </h3>
                <p className="mb-2">
                  <strong>Pickup:</strong> {startLocation.value}
                </p>
                <p className="mb-2">
                  <strong>Dropoff:</strong> {endLocation.value}
                </p>
                <p className="mb-2">
                  <strong>Distance:</strong> {distanceKm} km
                </p>
                <p className="mb-2">
                  <strong>Duration:</strong> {durationHours} hours {durationMin}{" "}
                  minutes
                </p>
                <p className="mb-2">
                  <strong>Amount:</strong> {amount} TK
                </p>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => setIsModalVisible(false)}
                    className="bg-[#188784] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#166c6e] transition"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BookTrip;
