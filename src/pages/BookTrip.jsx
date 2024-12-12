import React, { useState } from "react";
import Header from "../components/Header";

const BookTrip = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    const pickup = e.target.pickup.value;
    const dropoff = e.target.dropoff.value;
    const date = e.target.date.value;
    const vehicleType = e.target.vehicleType.value;
    const tripType = e.target.tripType.value;
    const pickupTime = e.target.pickupTime.value;
    const paymentMethod = e.target.paymentMethod.value;
    console.log(pickup, dropoff, date, vehicleType, tripType, pickupTime, paymentMethod);
  };

  return (
    <>
      <div>
        <Header></Header>
      </div>
      <div className="flex items-center justify-center min-h-screen p-6 bg-gray-100">
        <div className="w-full bg-white rounded-xl shadow-lg p-6 max-w-7xl mx-auto">
          <h2 className="text-4xl font-semibold text-center text-[#188784] mb-6">
            Book Your Trip
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Pick up and Drop */}
            <div className="mb-4 grid md:grid-cols-2  gap-5">
              <label
                htmlFor="pickup"
                className="block md:col-span-2 text-base font-medium text-[#188784]"
              >
                Pick up & Drop:
              </label>
              <input
                type="text"
                name="pickup"
                id="pickup"
                placeholder="Pick up"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-700 outline-none focus:ring-2 focus:ring-[#188784] shadow-sm"
              />
              <input
                type="text"
                name="dropoff"
                id="dropoff"
                placeholder="Drop off"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-700 outline-none focus:ring-2 focus:ring-[#188784] shadow-sm"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {/* Date */}
              <div className="mb-4">
                <label
                  htmlFor="date"
                  className="block text-base font-medium text-[#188784] mb-2"
                >
                  Date of reservation:
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
              <label
                className="block text-base font-medium text-[#188784] mb-2"
              >
                Select Trip Type:
              </label>
              <div className="flex items-center">
                <label className="flex items-center mr-4">
                  <input
                    type="radio"
                    name="tripType"
                    value="One Way Trip"
                    className="mr-2"
                  />
                  One Way Trip
                </label>
                <label className="flex items-center">
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

            <div className="grid md:grid-cols-2 gap-5">
              {/* Pickup Time */}
              <div className="mb-4">
                <label
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
              <div className="mb-6">
                <label
                  className="block text-base font-medium text-[#188784] mb-2"
                >
                  Payment Method:
                </label>
                <select
                  name="paymentMethod"
                  id="paymentMethod"
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-700 outline-none focus:ring-2 focus:ring-[#188784] shadow-sm"
                >
                  <option value="BKash">Online</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full rounded-lg bg-[#188784] p-3 text-lg font-semibold text-white shadow-lg hover:bg-[#166b6a] hover:shadow-xl transition duration-300"
              >
                Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default BookTrip;
