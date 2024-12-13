import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { AuthContext } from "../provider/AuthProvider";
import Lottie from "lottie-react";
import Bus from "../assets/lottie/bus.json";
import { Link } from "react-router-dom";

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
      perKMRate,
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
      {/* Hero Section */}
      <div className="hero bg-gradient-to-t from-[#FFEDD2] to-[#DEFFDF] md:pt-10 pb-44">
        <div className="hero-content flex-row-reverse">
          <div className="w-1/2">
            <Lottie animationData={Bus} />
          </div>
          <div className="w-1/2">
            <h1 className="md:text-5xl text-base font-bold text-[#178783]">
              One Step Faster to Get Emergency Service
            </h1>
            <p className="md:py-6 text-[#178783] md:text-base text-xs my-3">
              Best Services & Hospitality in every time everywhere
            </p>
          </div>
        </div>
      </div>
      <main className="-mt-44">
        <div className="max-w-7xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
          <div className="flex flex-col items-center">
            <div className="w-[200px]">
              <Lottie animationData={Bus}></Lottie>
            </div>
            <h2 className="text-xl font-semibold text-[#178783] text-center mb-6">
              Add Vehicle
            </h2>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 md:grid md:grid-cols-2 gap-4"
          >
            {/* User ID */}
            <div className="col-span-2">
              <label
                htmlFor="userId"
                className="text-gray-800 text-[15px] mb-2 block"
              >
                User Name
              </label>
              <input
                type="text"
                value={dbUserName}
                disabled
                className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-[#178783]"
              />
            </div>

            {/* Vehicle Number */}
            <div className="">
              <label
                htmlFor="vehicleNumber"
                className="text-gray-800 text-[15px] mb-2 block"
              >
                Licence Number
              </label>
              <input
                type="text"
                id="vehicleNumber"
                name="vehicleNumber"
                required
                className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-[#178783]"
              />
            </div>

            {/* Vehicle Type */}
            <div>
              <label
                htmlFor="vehicleType"
                className="text-gray-800 text-[15px] mb-2 block"
              >
                Vehicle Type
              </label>
              <select
                id="vehicleType"
                name="vehicleType"
                className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-[#178783]"
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
                className="text-gray-800 text-[15px] mb-2 block"
              >
                Capacity
              </label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-[#178783]"
              />
            </div>

            {/* Owner Name */}
            <div>
              <label
                htmlFor="ownerName"
                className="text-gray-800 text-[15px] mb-2 block"
              >
                Owner Name
              </label>
              <input
                type="text"
                id="ownerName"
                name="ownerName"
                className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-[#178783]"
              />
            </div>

            {/* Owner Contact */}
            <div>
              <label
                htmlFor="ownerContact"
                className="text-gray-800 text-[15px] mb-2 block"
              >
                Owner Contact
              </label>
              <input
                type="tel"
                id="ownerContact"
                name="ownerContact"
                className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-[#178783]"
              />
            </div>

            {/* per km price */}
            <div>
              <label
                htmlFor="perKMRate"
                className="text-gray-800 text-[15px] mb-2 block"
              >
                Per KM Rate
              </label>
              <input
                type="tel"
                id="perKMRate"
                name="perKMRate"
                className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-[#178783]"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center col-span-2">
              <button
                type="submit"
                className="mt-4 w-full text-[#178783] border border-solid border-[#178783] hover:bg-[#178783] hover:text-white py-2 px-4 rounded"
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
