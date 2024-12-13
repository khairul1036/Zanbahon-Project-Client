import React, { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import { AuthContext } from "../provider/AuthProvider";

const ParkingHistory = () => {
  const [parkingHistory, setParkingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const {UserId} = useContext(AuthContext)

  useEffect(() => {
    fetch(
      `http://localhost/zanbahon-server/UserParking/getByParkingBookingByUser_Id.php?user_id=${UserId}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.data) {
            console.log(data.data);
          setParkingHistory(data.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching parking history:", error);
        setLoading(false);
      });
  }, [UserId]);

  const handlePayment = (bookingId) => {
    alert(`Proceeding to payment for Booking ID: ${bookingId}`);
    // Implement payment logic here
  };

  return (
    <div>
      <Header />
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Parking History</h1>
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : parkingHistory.length > 0 ? (
          <div className="space-y-4">
            {parkingHistory.map((booking) => (
              <div
                key={booking.ParkingBookingId}
                className="border border-gray-300 rounded-lg shadow-md p-4"
              >
                <p className="text-lg font-semibold">
                  Booking ID: {booking.ParkingBookingId}
                </p>
                <p>Service Name: {booking.ServiceName}</p>
                <p>Vehicle ID: {booking.VehicleId}</p>
                <p>Parking ID: {booking.ParkingId}</p>
                <p>Booking Time: {new Date(booking.BookingTime).toLocaleString()}</p>
                <p>Payment Status: {booking.PaymentStatus}</p>
                <p>Total Amount: {booking.TotalAmount} BDT</p>
                {booking.PaymentStatus !== "Paid" && (
                  <button
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={() => handlePayment(booking.ParkingBookingId)}
                  >
                    Pay Now
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No parking history found.</p>
        )}
      </div>
    </div>
  );
};

export default ParkingHistory;
