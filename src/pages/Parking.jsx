import React, { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import Lottie from "lottie-react";
import ambulance from "../assets/lottie/parking.json";

const Parking = () => {
  const [parkingData, setParkingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedParking, setSelectedParking] = useState(null);
  const navigate = useNavigate();
  const { UserId } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = () => {
      fetch(
        "http://localhost/zanbahon-server/DriverParking/getByParkingStatus.php?status=Available"
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data.data);
          setParkingData(data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching parking data:", error);
          setLoading(false);
        });
    };

    fetchData();
    const interval = setInterval(fetchData, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleBookNow = (parking) => {
    setSelectedParking(parking);
    setShowModal(true);
  };

  const confirmBooking = () => {
    if (!selectedParking) return;

    const bookingData = {
      user_id: UserId, // Replace with actual UserId from context
      vehicle_id: 2, // Replace with actual VehicleId (to be fetched or managed by user selection)
      parking_id: selectedParking.ParkingId,
      ServiceProviderId: selectedParking.User_Id,
      parking_start_time: new Date().toISOString(),
      parking_end_time: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour later as an example
    };

    fetch("http://localhost/zanbahon-server/UserParking/create.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data) {
          setShowModal(false);
          navigate("/history-parking");
        } else {
          alert("Booking failed: " + data.message);
        }
      })
      .catch((error) => {
        console.error("Error booking parking:", error);
        alert("Booking failed. Please try again.");
      });
  };

  const filteredData = Array.isArray(parkingData)
    ? parkingData.filter((parking) =>
        parking.Location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

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
              to={"/history-parking"}
              className="rounded-lg py-2 px-5 md:text-base text-xs text-[#178783] border border-solid border-[#178783] hover:bg-[#178783] hover:text-white"
            >
              Parking History
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto p-4 bg-white rounded-xl -mt-44">
        <h1 className="text-2xl font-bold mb-4 text-[#178783] text-center">Parking</h1>

        <div className="mb-4 flex gap-4 items-center">
          <input
            type="text"
            placeholder="Search by Location"
            value={searchQuery}
            onChange={handleSearch}
            className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-[#178783]"
          />
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : filteredData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 mb-20">
            {filteredData.map((parking) => (
              <div
                key={parking.ParkingId}
                className="border border-gray-300 rounded-lg shadow-md p-4 relative"
              >
                <h2 className="text-xs font-semibold mb-3">
                  {parking.Location}
                </h2>
                <p className="text-gray-700 text-xs">
                  Slot Type: {parking.SlotType}
                </p>
                <p className="text-gray-700 text-xs">
                  Total Slots: {parking.TotalSlots}
                </p>
                <p className="text-gray-700 text-xs">
                  Vehicle Type: {parking.VehicleType}
                </p>
                <p className="text-gray-700 text-xs">
                  Rate/Hour: {parking.RatePerHour} ৳
                </p>
                <p className="text-gray-700 text-xs">
                  Overtime Rate/Hour: {parking.OvertimeRatePerHour} ৳
                </p>
                <p className="text-gray-700 font-bold">
                  Status: {parking.Status}
                </p>
                <button
                  className="w-full mt-4 text-[#178783] border border-solid border-[#178783] hover:bg-[#178783] hover:text-white py-2 px-4 rounded"
                  onClick={() => handleBookNow(parking)}
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No parking found.</p>
        )}

        {showModal && selectedParking && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Confirm Booking</h2>
              <p>Are you sure you want to book this parking slot?</p>
              <div className="flex gap-4 mt-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={confirmBooking}
                >
                  Confirm
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Parking;
