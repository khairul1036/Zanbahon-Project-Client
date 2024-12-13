import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { AuthContext } from "../provider/AuthProvider";
import Lottie from "lottie-react";
import ambulance from "../assets/lottie/bus.json";

const ViewAllParking = () => {
  const { UserId } = useContext(AuthContext);
  const [parkingData, setParkingData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `http://localhost/zanbahon-server/DriverParking/getByUser_Id.php?User_Id=${UserId}`
    )
      .then((response) => response.json())
      .then((data) => {
        setParkingData(data.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching parking data:", error);
        setLoading(false);
      });
  }, [UserId]);

  const handleDelete = (parkingId) => {
    if (window.confirm("Are you sure you want to delete this parking?")) {
      fetch(`http://localhost/zanbahon-server/DriverParking/delete.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ParkingId: parkingId }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setParkingData((prevData) =>
              prevData.filter((parking) => parking.ParkingId !== parkingId)
            );
          } else {
            alert("Failed to delete parking entry.");
          }
        })
        .catch((error) => {
          console.error("Error deleting parking:", error);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="hero bg-gradient-to-t from-[#FFEDD2] to-[#DEFFDF] md:pt-10 pb-44">
        <div className="hero-content flex-row-reverse">
          <div className="w-[40%]">
            <Lottie animationData={ambulance} />
          </div>
          <div className="w-[70%]">
            <h1 className="md:text-5xl text-base font-bold text-[#178783]">
              One Step Faster to Get Emergency Service
            </h1>
            <p className="md:py-6 text-[#178783] md:text-base text-xs my-3">
              Best Services & Hospitality in every time everywhere
            </p>
            <Link
              to={"/create-parking"}
              className="btn bg-transparent rounded-lg py-2 px-5 md:text-base text-xs text-[#178783] border border-solid border-[#178783] hover:bg-[#178783] hover:text-white"
            >
              Create Parking
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto p-4 -mt-44 bg-white rounded-lg shadow mb-20">
        <h1 className="text-2xl font-bold mb-4 text-center text-[#178783]">
          View Parking
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : parkingData.length === 0 ? (
          <p className="text-center text-gray-500">No parking available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {parkingData.map((parking) => (
              <div
                key={parking.ParkingId}
                className="border border-gray-300 text-xs rounded-lg shadow-md p-4 relative"
              >
                <h2 className="font-semibold">{parking.Location}</h2>
                <p className="text-gray-700 mt-4">
                  Slot Type: {parking.SlotType}
                </p>
                <p className="text-gray-700">
                  Total Slots: {parking.TotalSlots}
                </p>
                <p className="text-gray-700">
                  Vehicle Type: {parking.VehicleType}
                </p>
                <p className="text-gray-700">
                  Rate/Hour: {parking.RatePerHour} BDT
                </p>
                <p className="text-gray-700">
                  Overtime Rate/Hour: {parking.OvertimeRatePerHour} BDT
                </p>
                <p className="text-gray-700 font-bold">
                  Status: {parking.Status}
                </p>
                <p className="text-gray-500">
                  Created At: {parking.Created_At}
                </p>
                <button
                  onClick={() => handleDelete(parking.ParkingId)}
                  className="mt-5 top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewAllParking;
