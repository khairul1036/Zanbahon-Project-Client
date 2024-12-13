import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { AuthContext } from "../provider/AuthProvider";

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
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">View Parking</h1>
        <div className="flex gap-4 mb-4">
          <Link to="/create-parking" className="text-blue-500 underline">
            Create Parking
          </Link>
          <Link to="/edit-parking" className="text-blue-500 underline">
            Edit Parking
          </Link>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : parkingData.length === 0 ? (
          <p className="text-center text-gray-500">No parking available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {parkingData.map((parking) => (
              <div
                key={parking.ParkingId}
                className="border border-gray-300 rounded-lg shadow-md p-4 relative"
              >
                <h2 className="text-xl font-semibold">{parking.Location}</h2>
                <p className="text-gray-700">Slot Type: {parking.SlotType}</p>
                <p className="text-gray-700">Total Slots: {parking.TotalSlots}</p>
                <p className="text-gray-700">Vehicle Type: {parking.VehicleType}</p>
                <p className="text-gray-700">Rate/Hour: {parking.RatePerHour} BDT</p>
                <p className="text-gray-700">
                  Overtime Rate/Hour: {parking.OvertimeRatePerHour} BDT
                </p>
                <p className="text-gray-700 font-bold">Status: {parking.Status}</p>
                <p className="text-gray-500 text-sm">Created At: {parking.Created_At}</p>
                <button
                  onClick={() => handleDelete(parking.ParkingId)}
                  className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
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
