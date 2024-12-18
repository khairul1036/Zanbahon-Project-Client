import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { AuthContext } from "../provider/AuthProvider";
import SentNotification from "./SentNotification";
import Lottie from "lottie-react";
import ambulance from "../assets/lottie/bus.json";

const BusTicketSeat = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatPrice] = useState(550);
  const [maxSeats] = useState(4);
  const { UserId, dbUserName } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const navigate = useNavigate(); // for navigation after booking

  const seatLayout = Array.from({ length: 10 }, (_, row) => {
    return ["1", "2", "3", "4"].map(
      (col) => `${String.fromCharCode(65 + row)}${col}`
    );
  }).flat();

  const handleSeatClick = (seatId) => {
    setSelectedSeats((prev) => {
      if (prev.includes(seatId)) {
        return prev.filter((seat) => seat !== seatId);
      } else if (prev.length < maxSeats) {
        return [...prev, seatId];
      } else {
        Swal.fire("Limit Reached", "You can select up to 4 seats.", "info");
        return prev;
      }
    });
  };

  const handleNext = () => {
    if (selectedSeats.length === 0) {
      Swal.fire(
        "No Seats Selected",
        "Please select at least one seat.",
        "warning"
      );
      return;
    }
    setShowModal(true); // Show the modal when "Next" is clicked
  };

  const handlePayNow = async () => {
    const bookingData = {
      userId: UserId,
      userName: dbUserName,
      seats: selectedSeats.join(", "),
      totalAmount: selectedSeats.length * seatPrice,
    };

    try {
      const response = await fetch(
        "http://localhost/zanbahon-server/BusTicket/BookBusTicket.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        }
      );

      const result = await response.json();

      if (result.success) {
        navigate("/payment", {
          state: {
            RideId: UserId,
            TotalFareAmount: selectedSeats.length * seatPrice,
          },
        });
        setShowModal(false); // Close the modal on successful booking
      } else {
        Swal.fire("Payment Failed", "Please try again.", "error");
      }
    } catch (error) {
      Swal.fire("Error", "An unexpected error occurred.", "error");
    }
  };

  return (
    <>
      <Header />
      {/* Hero Section */}
      <div className="hero bg-gradient-to-t from-[#FFEDD2] to-[#DEFFDF] md:pt-10 pb-44">
        <div className="hero-content flex-row-reverse">
          <div className="w-1/2">
            <Lottie animationData={ambulance} />
          </div>
          <div className="w-1/2">
            <h1 className="md:text-5xl text-base font-bold text-[#178783]">
              One Step Faster to Get Emergency Service
            </h1>
            <p className="md:py-6 text-[#178783] md:text-base text-xs my-3">
              Best Services & Hospitality in every time everywhere
            </p>
            <Link to={"/view-tickets"} className="rounded-lg py-2 px-5 md:text-base text-xs text-[#178783] border border-solid border-[#178783] hover:bg-[#178783] hover:text-white">View Tickets</Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto bg-white max-w-7xl -m-44 rounded-md md:p-10 shadow-xl mb-56">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Select Your Seat</h2>
            <div className="grid grid-cols-4 gap-3">
              {seatLayout.map((seat) => (
                <button
                  key={seat}
                  className={`seat border rounded-lg p-4 text-center ${
                    selectedSeats.includes(seat)
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 hover:bg-[#178783] hover:text-white"
                  }`}
                  onClick={() => handleSeatClick(seat)}
                >
                  {seat}
                </button>
              ))}
            </div>
          </div>
          <div className="ml-6 pb-10 md:block hidden">
            <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
            <div className="p-4">
              <div className="">
                <p>
                  Seats: <span>{selectedSeats.join(", ") || "None"}</span>
                </p>
                <p>
                  Total Price:{" "}
                  <span>{selectedSeats.length * seatPrice} ৳</span>
                </p>
              </div>
              <div>
                <button
                  className="mt-4 w-full text-[#178783] border border-solid border-[#178783] hover:bg-[#178783] hover:text-white py-2 px-4 rounded"
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
          <div className="md:hidden rounded-xl fixed bottom-3  w-screen bg-[#E5E7EB] border border-solid border-black">
            <h2 className="text-xl font-semibold text-center text-[#178783]">
              Booking Summary
            </h2>
            <div className="px-4 pb-20 flex justify-between">
              <div className="">
                <p>
                  Seats: <span>{selectedSeats.join(", ") || "None"}</span>
                </p>
                <p>
                  <span>৳ {selectedSeats.length * seatPrice}</span>
                </p>
              </div>
              <div>
                <button
                  className="mt-4 w-full text-[#178783] border border-solid border-[#178783] hover:bg-[#178783] hover:text-white py-2 px-4 rounded"
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div
          id="user-form-modal"
          className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center"
        >
          <div className="bg-white p-6 rounded">
            <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
            <p>User Name: {dbUserName}</p>
            <p>Seats: {selectedSeats.join(", ")}</p>
            <p>Total Amount: BDT {selectedSeats.length * seatPrice}</p>
            <button
              className="mt-4 w-full text-[#178783] border border-solid border-[#178783] hover:bg-[#178783] hover:text-white py-2 px-4 rounded"
              onClick={handlePayNow}
            >
              Pay Now{" "}
              <SentNotification serviceName="Bus Ticket"></SentNotification>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default BusTicketSeat;
