import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet-routing-machine";
import Header from "../components/Header";
import { AuthContext } from "../provider/AuthProvider";

const BookTrip = () => {
  const navigate = useNavigate();
  const mapRef = useRef(null);

  // States for form inputs and map data
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

  // Distance and Duration States
  const [distanceKm, setDistanceKm] = useState(null);
  const [durationHours, setDurationHours] = useState(null);
  const [durationMin, setDurationMin] = useState(null);

  // Modal visibility state
  const [isModalVisible, setIsModalVisible] = useState(false);

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
    const form = e.target;
    const pickup = form.pickup.value;
    const dropoff = form.dropoff.value;
    const date = form.date.value;
    const vehicleType = form.vehicleType.value;
    const tripType = form.tripType.value;
    const pickupTime = form.pickupTime.value;
    const paymentMethod = form.paymentMethod.value;

    if (!startLocation.lat || !endLocation.lat) {
      alert("Please select valid locations from the dropdown.");
      return;
    }

    // Mock calculation for distance and duration
    const distance = (Math.random() * (50 - 5) + 5).toFixed(1); // Random distance between 5km and 50km
    const totalTimeInMinutes = Math.random() * (120 - 30) + 30; // Random duration between 30min and 2 hours
    const hours = Math.floor(totalTimeInMinutes / 60);
    const minutes = Math.round(totalTimeInMinutes % 60);

    setDistanceKm(distance);
    setDurationHours(hours);
    setDurationMin(minutes);

    // Show modal with calculated data
    setIsModalVisible(true);
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen p-6 bg-gray-100">
        <div className="w-full bg-white rounded-xl shadow-lg p-6 max-w-7xl mx-auto">
          <h2 className="text-4xl font-semibold text-center text-[#188784] mb-6">
            Book Your Trip
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Pick up and Drop */}
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

            <div>
              <label className="block text-sm font-medium">
                Destination Location
              </label>
              <input
                type="text"
                placeholder="Type a location..."
                value={endLocation.value}
                onChange={(e) => {
                  setEndLocation({
                    ...endLocation,
                    value: e.target.value,
                  });
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

            <div className="grid md:grid-cols-2 gap-5">
              {/* Date */}
              <div className="mb-4">
                <label
                  htmlFor="date"
                  className="block text-base font-medium text-[#188784] mb-2"
                >
                  Date of Reservation:
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-700 outline-none focus:ring-2 focus:ring-[#188784] shadow-sm"
                />
              </div>

              {/* Vehicle Type */}
              <div className="mb-4">
                <label
                  htmlFor="vehicleType"
                  className="block text-base font-medium text-[#188784] mb-2"
                >
                  Vehicle Type:
                </label>
                <select
                  name="vehicleType"
                  id="vehicleType"
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-700 outline-none focus:ring-2 focus:ring-[#188784] shadow-sm"
                >
                  <option value="Car">Car</option>
                  <option value="Truck">Truck</option>
                  <option value="Van">Van</option>
                  <option value="Bus">Bus</option>
                  <option value="Pickup Van">Pickup Van</option>
                </select>
              </div>
            </div>

            {/* Trip Type */}
            <div className="mb-4">
              <label className="block text-base font-medium text-[#188784] mb-2">
                Select Trip Type:
              </label>
              <div className="flex items-center">
                <label className="flex items-center mr-4">
                  <input
                    type="radio"
                    name="tripType"
                    value="One Way"
                    className="mr-2"
                  />
                  One Way
                </label>
                <label className="flex items-center mr-4">
                  <input
                    type="radio"
                    name="tripType"
                    value="Round Trip"
                    className="mr-2"
                  />
                  Round Trip
                </label>
              </div>
            </div>

            {/* Pickup Time */}
            <div className="mb-4">
              <label
                htmlFor="pickupTime"
                className="block text-base font-medium text-[#188784] mb-2"
              >
                Pickup Time:
              </label>
              <input
                type="time"
                name="pickupTime"
                id="pickupTime"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-700 outline-none focus:ring-2 focus:ring-[#188784] shadow-sm"
              />
            </div>

            {/* Payment Method */}
            <div className="mb-4">
              <label className="block text-base font-medium text-[#188784] mb-2">
                Payment Method:
              </label>
              <select
                name="paymentMethod"
                id="paymentMethod"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-700 outline-none focus:ring-2 focus:ring-[#188784] shadow-sm"
              >
                <option value="Cash">Cash</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Mobile Banking">Mobile Banking</option>
              </select>
            </div>

            {/* Submit Button */}
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
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => setIsModalVisible(false)}
                    className="bg-[#188784] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#166c6e] transition"
                  >
                    Close
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
