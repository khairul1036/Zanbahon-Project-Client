import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { AuthContext } from "../provider/AuthProvider";

const addVehicle = () => {
  const { dbUserName, UserId, dbUserEmail } = useContext(AuthContext);
  console.log(UserId);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const VehicleNumber = form.vehicleNumber.value;
    const VehicleType = form.vehicleType.value;
    const Capacity = form.capacity.value;
    const OwnerName = form.ownerName.value;
    const OwnerContact = form.ownerContact.value;
    const perKMRate = form.perKMRate.value;

    const addNewVehicle = {
      UserId,
      VehicleNumber,
      VehicleType,
      Capacity,
      OwnerName,
      OwnerContact,
      perKMRate
    };
    console.log(addNewVehicle);

    if (addNewVehicle) {
      // store user details in database
      fetch("http://localhost/zanbahon-server/vehicle.php", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(addNewVehicle),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          form.reset();
        });
    } else {
      return;
    }
  };

  return (
    <>
      <header>
        <Header></Header>
      </header>
      <main>
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            Add Vehicle
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User ID */}
            <div>
              <label
                htmlFor="userId"
                className="block text-sm font-medium text-gray-700"
              >
                User Name
              </label>
              <input
                type="text"
                value={dbUserName}
                disabled
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Vehicle Number */}
            <div>
              <label
                htmlFor="vehicleNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Licence Number
              </label>
              <input
                type="text"
                id="vehicleNumber"
                name="vehicleNumber"
                required
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Vehicle Type */}
            <div>
              <label
                htmlFor="vehicleType"
                className="block text-sm font-medium text-gray-700"
              >
                Vehicle Type
              </label>
              <select
                id="vehicleType"
                name="vehicleType"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="Car">Car</option>
                <option value="Motorcycle">Motorcycle</option>
                <option value="Truck">Truck</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Capacity */}
            <div>
              <label
                htmlFor="capacity"
                className="block text-sm font-medium text-gray-700"
              >
                Capacity
              </label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Owner Name */}
            <div>
              <label
                htmlFor="ownerName"
                className="block text-sm font-medium text-gray-700"
              >
                Owner Name
              </label>
              <input
                type="text"
                id="ownerName"
                name="ownerName"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Owner Contact */}
            <div>
              <label
                htmlFor="ownerContact"
                className="block text-sm font-medium text-gray-700"
              >
                Owner Contact
              </label>
              <input
                type="tel"
                id="ownerContact"
                name="ownerContact"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* per km price */}
            <div>
              <label
                htmlFor="perKMRate"
                className="block text-sm font-medium text-gray-700"
              >
                Per KM Rate
              </label>
              <input
                type="tel"
                id="perKMRate"
                name="perKMRate"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default addVehicle;
