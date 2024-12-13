import React, { useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { AuthContext } from "../provider/AuthProvider";
import Lottie from "lottie-react";
import Trip from "../assets/lottie/trip.json";
import SentNotification from "./SentNotification";
import Swal from "sweetalert2";

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
            console.log("create success");
          }
          //    form.reset();
        });
    } else {
      return;
    }
  };

  const handleConfirmModal = () => {
    setIsModalVisible(false);
    Swal.fire({
      title: "Success!",
      text: "Your reservation has been success.",
      icon: "success",
    });
    navigate("/all-service");
  };

  return (
    <>
      <Header />
      <Link to={'/all-service'}><h1>View All</h1></Link>
      <div className="hero bg-gradient-to-t from-[#FFEDD2] to-[#DEFFDF] md:pt-10 pb-44">
        <div className="hero-content flex-row-reverse">
          <div className="w-1/2">
            <Lottie animationData={Trip} />
          </div>
          <div className="w-1/2">
            <h1 className="md:text-5xl text-base font-bold text-[#178783]">
              One Step Faster to <br /> Book Your Trip
            </h1>
            <p className="md:py-6 text-[#178783] md:text-base text-xs">
              Best Services & Hospitality in every time everywhere
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center p-6 mb-20 -mt-48">
        <div className="w-full bg-white rounded-xl shadow-lg p-6 max-w-7xl mx-auto">
          <div className="flex flex-col items-center mt-5">
            <div className="w-[150px]">
              <Lottie animationData={Trip} />
            </div>
            <h2 className="text-lg font-semibold text-center text-[#188784] mb-6">
              Book Your Trip
            </h2>
          </div>
          <form onSubmit={handleSubmit}>
            {/* Pickup Location */}
            <div className="mb-4">
              <label className="text-gray-800 text-[15px] mb-2 block">
                Add Location
              </label>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Pickup Location"
                    value={startLocation.value}
                    onChange={(e) => {
                      setStartLocation({
                        ...startLocation,
                        value: e.target.value,
                      });
                      fetchAutocomplete(e.target.value, "start");
                    }}
                    className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-[#178783]"
                  />
                  {autocompleteResults.start.length > 0 && (
                    <div className="bg-white border border-gray-300 rounded-md shadow-lg absolute z-10 w-60 autocomplete-box">
                      {autocompleteResults.start.map((location, index) => (
                        <div
                          key={index}
                          className="p-2 cursor-pointer hover:bg-gray-100 autocomplete-item"
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
                <div>
                  {/* Destination Location */}
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Destination Location"
                      value={endLocation.value}
                      onChange={(e) => {
                        setEndLocation({
                          ...endLocation,
                          value: e.target.value,
                        });
                        fetchAutocomplete(e.target.value, "end");
                      }}
                      className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-[#178783]"
                    />
                    {autocompleteResults.end.length > 0 && (
                      <div className="bg-white border border-gray-300 rounded-md shadow-lg absolute z-10 w-60 autocomplete-box">
                        {autocompleteResults.end.map((location, index) => (
                          <div
                            key={index}
                            className="p-2 cursor-pointer hover:bg-gray-100 autocomplete-item"
                            onClick={() =>
                              handleAutocompleteSelect("end", location)
                            }
                          >
                            {location.display_name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Inputs */}
            <div className="grid md:grid-cols-2 gap-5">
              <div className="mb-4">
                <label
                  htmlFor="date"
                  className="text-gray-800 text-[15px] mb-2 block"
                >
                  Date of Reservation:
                </label>
                <input
                  type="date"
                  name="date"
                  className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-[#178783]"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="vehicleType"
                  className="text-gray-800 text-[15px] mb-2 block"
                >
                  Vehicle Type:
                </label>
                <select
                  name="vehicleType"
                  className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-[#178783]"
                >
                  <option value="1">Motorcycle</option>
                  <option value="3">Car</option>
                  <option value="4">Truck</option>
                  <option value="5">Other</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="text-gray-800 text-[15px] mb-2 block">
                Trip Type:
              </label>
              <div className="flex items-center">
                <label className="flex items-center mr-3">
                  <input
                    type="radio"
                    name="tripType"
                    value="One Way"
                    className="radio radio-accent mr-3"
                  />{" "}
                  One Way
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="tripType"
                    value="Round Trip"
                    className="radio radio-accent ml-10 mr-4"
                  />{" "}
                  Round Trip
                </label>
              </div>
            </div>

            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
              <div className="mb-4">
                <label
                  htmlFor="pickupTime"
                  className="text-gray-800 text-[15px] mb-2 block"
                >
                  Pickup Time:
                </label>
                <input
                  type="time"
                  name="pickupTime"
                  className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-[#178783]"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="paymentMethod"
                  className="text-gray-800 text-[15px] mb-2 block"
                >
                  Payment Method:
                </label>
                <select
                  name="paymentMethod"
                  className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-[#178783]"
                >
                  <option value="Cash">Cash</option>
                  <option value="Mobile Banking">Mobile Banking</option>
                </select>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full bg-[#188784] text-white px-6 py-3 mt-5 rounded-lg border border-solid border-[#178783] hover:bg-white hover:text-[#178783] transition "
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
                  <strong>Amount:</strong> {amount.toFixed(1)} TK
                </p>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={handleConfirmModal}
                    // onClick={handlePayNow}
                    className="bg-[#188784] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#166c6e] transition"
                  >
                    Confirm{" "}
                    <SentNotification serviceName="Reservation"></SentNotification>
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
