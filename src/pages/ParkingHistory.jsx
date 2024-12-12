import React, { useState, useEffect } from "react";
import Header from "../components/Header";

const ParkingHistory = () => {
  const [parkingHistory, setParkingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = 1; // Replace with actual logged-in user ID

  useEffect(() => {
    fetch(
      `http://localhost/zanbahon-server/UserParking/getByParkingBookingByUser_Id.php?user_id=${userId}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.data) {
          setParkingHistory(data.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching parking history:", error);
        setLoading(false);
      });
  }, [userId]);

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
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 border">Booking ID</th>
                <th className="px-4 py-2 border">Service Name</th>
                <th className="px-4 py-2 border">Vehicle ID</th>
                <th className="px-4 py-2 border">Parking ID</th>
                <th className="px-4 py-2 border">Booking Time</th>
                <th className="px-4 py-2 border">Payment Status</th>
                <th className="px-4 py-2 border">Total Amount</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {parkingHistory.map((booking) => (
                <tr
                  key={booking.ParkingBookingId}
                  className="hover:bg-gray-100"
                >
                  <td className="px-4 py-2 border">
                    {booking.ParkingBookingId}
                  </td>
                  <td className="px-4 py-2 border">{booking.ServiceName}</td>
                  <td className="px-4 py-2 border">{booking.VehicleId}</td>
                  <td className="px-4 py-2 border">{booking.ParkingId}</td>
                  <td className="px-4 py-2 border">
                    {new Date(booking.BookingTime).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border">{booking.PaymentStatus}</td>
                  <td className="px-4 py-2 border">
                    {booking.TotalAmount} BDT
                  </td>
                  <td className="px-4 py-2 border">
                    {booking.PaymentStatus !== "Paid" && (
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                        onClick={() => handlePayment(booking.ParkingBookingId)}
                      >
                        Pay Now
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">No parking history found.</p>
        )}
      </div>
    </div>
  );
};

export default ParkingHistory;
