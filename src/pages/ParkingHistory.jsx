import React, { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import { AuthContext } from "../provider/AuthProvider";
import Lottie from "lottie-react";
import ambulance from "../assets/lottie/parking.json";
import { Link, useNavigate } from "react-router-dom";

const ParkingHistory = () => {
  const [parkingHistory, setParkingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { UserId } = useContext(AuthContext);
  const navigate = useNavigate();

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

  const handlePayment = (bookingId, TotalAmount) => {
    // alert(`Proceeding to payment for Booking ID: ${bookingId}`);
    navigate("/payment", {
      state: {
        RideId: bookingId,
        TotalFareAmount: TotalAmount,
      },
    });
  };

  return (
    <div>
      <Header />
      <div className="hero bg-gradient-to-t from-[#FFEDD2] to-[#DEFFDF] md:pt-10 pb-44">
        <div className="hero-content flex-row-reverse">
          <div className="w-[40%]">
            <Lottie animationData={ambulance} />
          </div>
          <div className="w-[60]%">
            <h1 className="md:text-5xl text-base font-bold text-[#178783]">
              One Step Faster to Get Emergency Service
            </h1>
            <p className="md:py-6 text-[#178783] md:text-base text-xs my-3">
              Best Services & Hospitality in every time everywhere
            </p>
            <Link
              to={"/parking"}
              className="rounded-lg py-2 px-5 md:text-base text-xs text-[#178783] border border-solid border-[#178783] hover:bg-[#178783] hover:text-white"
            >
              Parking
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto p-4 -m-44 bg-white rounded-xl shadow mb-20">
        <h1 className="text-2xl font-bold mb-4 text-[#178783] text-center">
          Parking History
        </h1>
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : parkingHistory.length > 0 ? (
          <div className="space-y-4 md:grid grid-cols-4 gap-4">
            {parkingHistory.map((booking) => (
              <div
                key={booking.ParkingBookingId}
                className="border border-gray-300 rounded-lg shadow-md p-4"
              >
                <p className="text-xs font-semibold">
                  Booking ID: {booking.ParkingBookingId}
                </p>
                <p className="text-xs">Service Name: {booking.ServiceName}</p>
                <p className="text-xs">Vehicle ID: {booking.VehicleId}</p>
                <p className="text-xs">Parking ID: {booking.ParkingId}</p>
                <p className="text-xs">
                  Booking Time: {new Date(booking.BookingTime).toLocaleString()}
                </p>
                <p className="text-xs">
                  Payment Status: {booking.PaymentStatus}
                </p>
                <p className="text-xs mb-5">
                  Total Amount: {booking.TotalAmount} ৳
                </p>
                {booking.PaymentStatus !== "Paid" && (
                  <button
                    className="mt-4 w-full text-[#178783] border border-solid border-[#178783] hover:bg-[#178783] hover:text-white py-2 px-4 rounded"
                    onClick={() =>
                      handlePayment(
                        booking.ParkingBookingId,
                        booking.TotalAmount
                      )
                    }
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
