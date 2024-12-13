import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { jsPDF } from "jspdf";

const BusTicketDriver = () => {
  const [busTickets, setBusTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTickets, setFilteredTickets] = useState([]); // For storing filtered tickets

  // Fetch data from API
  useEffect(() => {
    const fetchBusTickets = async () => {
      try {
        const response = await fetch(
          "http://localhost/zanbahon-server/BusTicket/BookBusTicket.php"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Ensure the data is an array
        if (Array.isArray(data.data)) {
          setBusTickets(data.data);
          setFilteredTickets(data.data); // Initialize with all tickets
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
  }, []);

  // Function to handle printing a ticket
  const handlePrint = (ticket) => {
    const printContent = `
      <div>
        <h1>Bus Ticket</h1>
        <p><strong>Booking ID:</strong> ${ticket.id}</p>
        <p><strong>User Name:</strong> ${ticket.user_name}</p>
        <p><strong>Seats:</strong> ${ticket.seats}</p>
        <p><strong>Total Amount:</strong> ${ticket.total_amount} Taka</p>
        <p><strong>Booking Date:</strong> ${new Date(
          ticket.booking_date
        ).toLocaleString()}</p>
      </div>
    `;
    const newWindow = window.open("", "_blank");
    newWindow.document.write(printContent);
    newWindow.document.close();
    newWindow.print();
    newWindow.close();
  };

  // Function to handle downloading a ticket as a PDF
  const handleDownload = (ticket) => {
    const doc = new jsPDF();

    // Set up the PDF content
    doc.setFontSize(16);
    doc.text("Bus Ticket", 20, 20);
    doc.setFontSize(12);
    doc.text(`Booking ID: ${ticket.id}`, 20, 30);
    doc.text(`User Name: ${ticket.user_name}`, 20, 40);
    doc.text(`Seats: ${ticket.seats}`, 20, 50);
    doc.text(`Total Amount: ${ticket.total_amount} Taka`, 20, 60);
    doc.text(
      `Booking Date: ${new Date(ticket.booking_date).toLocaleString()}`,
      20,
      70
    );

    // Download the PDF
    doc.save(`BusTicket_${ticket.id}.pdf`);
  };

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
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Bus Tickets</h1>
        {/* Search Field */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by User Name"
            value={searchTerm}
            onChange={handleSearchChange}
            className="border p-2 rounded w-full"
          />
        </div>
        {filteredTickets.length === 0 ? (
          <p>No data available</p>
        ) : (
          <>
            {" "}
            <div className="grid grid-cols-1 gap-4">
              {filteredTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="p-4 border rounded shadow-sm flex justify-between items-center"
                >
                  <div>
                    <h2 className="text-lg font-semibold">
                      Booking ID: {ticket.id}
                    </h2>
                    <p>
                      <strong>User Name:</strong> {ticket.user_name}
                    </p>
                    <p>
                      <strong>Seats:</strong> {ticket.seats}
                    </p>
                    <p>
                      <strong>Total Amount:</strong> {ticket.total_amount} Taka
                    </p>
                    <p>
                      <strong>Booking Date:</strong>{" "}
                      {new Date(ticket.booking_date).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                      onClick={() => handlePrint(ticket)}
                    >
                      Print
                    </button>
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded"
                      onClick={() => handleDownload(ticket)}
                    >
                      Download PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default BusTicketDriver;
