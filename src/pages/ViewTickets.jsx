import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { AuthContext } from "../provider/AuthProvider";
import { jsPDF } from "jspdf"; // Import jsPDF
import Lottie from "lottie-react";
import ambulance from "../assets/lottie/bus.json";
import { Link } from "react-router-dom";

const ViewTickets = () => {
  const [busTickets, setBusTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { UserId } = useContext(AuthContext);

  // Fetch data from API
  useEffect(() => {
    const fetchBusTickets = async () => {
      if (!UserId) {
        setError("User ID is not available.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost/zanbahon-server/BusTicket/BookBusTicket.php?userId=${UserId}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Ensure the data is an array
        if (Array.isArray(data.data)) {
          setBusTickets(data.data);
          setFilteredTickets(data.data);
        } else {
          setBusTickets([]);
          setFilteredTickets([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBusTickets();
  }, [UserId]); // Include UserId in dependency array

  // Handle search input change
  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    // Filter tickets by user name
    const filtered = busTickets.filter((ticket) =>
      ticket.user_name.toLowerCase().includes(value)
    );
    setFilteredTickets(filtered);
  };

  // Function to handle downloading a ticket as a PDF
  const handleDownload = (ticket) => {
    const doc = new jsPDF();

    // Title and service name
    doc.setFontSize(18);
    doc.text("Zanbahon Service - Bus Ticket", 20, 20);

    // Add ticket details
    doc.setFontSize(12);
    doc.text(`Booking ID: ${ticket.id}`, 20, 40);
    doc.text(`User Name: ${ticket.user_name}`, 20, 50);
    doc.text(`Seats: ${ticket.seats}`, 20, 60);
    doc.text(`Total Amount: ${ticket.total_amount} Taka`, 20, 70);
    doc.text(
      `Booking Date: ${new Date(ticket.booking_date).toLocaleString()}`,
      20,
      80
    );

    // Save the PDF
    doc.save(`BusTicket_${ticket.id}.pdf`);
  };

  // Display loading, error, or data
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <Header />
      {/* Hero Section */}
      <div className="hero bg-gradient-to-t from-[#FFEDD2] to-[#DEFFDF] md:pt-10 pb-44">
        <div className="hero-content flex-row-reverse">
          <div className="w-1/2">
            <div>
              <Lottie animationData={ambulance} />
            </div>
          </div>
          <div className="w-1/2">
            <h1 className="md:text-5xl text-base font-bold text-[#178783]">
              One Step Faster to Get Emergency Service
            </h1>
            <p className="md:py-6 text-[#178783] md:text-base text-xs my-3">
              Best Services & Hospitality in every time everywhere
            </p>
            <Link
              to={"/bus-ticket"}
              className="rounded-lg py-2 px-5 md:text-base text-xs text-[#178783] border border-solid border-[#178783] hover:bg-[#178783] hover:text-white"
            >
              Bus Ticket
            </Link>
          </div>
        </div>
      </div>
      <div className="p-4 max-w-7xl mx-auto bg-white -mt-44 shadow rounded-md mb-20">
        <h1 className="text-2xl font-bold mb-4">My Bus Tickets</h1>

        {/* Search Field */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by User Name"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-[#178783]"
          />
        </div>
        {filteredTickets.length === 0 ? (
          <p>No tickets available</p>
        ) : (
          <div className="md:grid grid-cols-3 gap-4">
            {filteredTickets.map((ticket) => (
              <div>
                {/* Starter Plan */}
                <div className="border hover:border-[#188784] rounded-md p-6">
                  <h3 className="text-gray-800 text-xs font-semibold mb-2">
                    Booking ID: {ticket.id}
                  </h3>
                  <p className="text-sm text-black">
                    <span>User Name:</span> {ticket.user_name}
                  </p>

                  <div className="">
                    <h3 className="text-gray-800 md:text-2xl font-semibold">
                      <strong>Seats:</strong> {ticket.seats}
                    </h3>
                  </div>

                  <div className="mt-3">
                    <h4 className="text-gray-800 md:text-xl font-semibold mb-2">
                      Other Info:
                    </h4>
                    <p className="text-xs text-gray-500">
                      <span className="font-semibold">
                        <strong>Total Amount:</strong>
                      </span>{" "}
                      {ticket.total_amount} ৳
                    </p>

                    <ul className=" space-y-4">
                      <li className="flex items-center text-xs text-gray-500">
                        <p>
                          <strong>Booking Date:</strong>{" "}
                          {new Date(ticket.booking_date).toLocaleString()}
                        </p>
                      </li>
                    </ul>

                    <button
                      className="mt-4 w-full text-[#178783] border border-solid border-[#178783] hover:bg-[#178783] hover:text-white py-2 px-4 rounded"
                      onClick={() => handleDownload(ticket)}
                    >
                      Download Ticket
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ViewTickets;
