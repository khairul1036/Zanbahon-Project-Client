import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { AuthContext } from "../provider/AuthProvider";

const ParkingOwner = () => {
  const [parkingData, setParkingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { UserId } = useContext(AuthContext);
  console.log(UserId);
  useEffect(() => {
    fetch(
      `http://localhost/zanbahon-server/UserParking/getByParkingBookingByUser_Id.php?User_Id=${UserId}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setParkingData(data.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching parking data:", error);
        setLoading(false);
      });
  }, [UserId]);

  return (
    <div>
      <Header />
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Request Parking</h1>
        <Link to={"/view-parking"} className="text-blue-500 underline">
          View Parking
        </Link>

        {loading ? (
          <p className="text-center text-gray-500 mt-4">Loading...</p>
        ) : parkingData.length > 0 ? (
          <div className="space-y-4 mt-4">
            {parkingData.map((parking) => (
              <div
                key={parking.ParkingBookingId}
                className="border border-gray-300 rounded-lg shadow-md p-4"
              >
                <p className="text-lg font-semibold">
                  Booking ID: {parking.ParkingBookingId}
                </p>
                <p>Service Name: {parking.ServiceName}</p>
                <p>Vehicle ID: {parking.VehicleId}</p>
                <p>Parking ID: {parking.ParkingId}</p>
                <p>
                  Booking Time: {new Date(parking.BookingTime).toLocaleString()}
                </p>
                <p>Payment Status: {parking.PaymentStatus}</p>
                <p>Total Amount: {parking.TotalAmount} BDT</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-4">
            No parking requests found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ParkingOwner;
