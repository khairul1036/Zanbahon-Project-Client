import React, { useContext, useEffect, useState } from "react";
import { FaCar, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { TbCurrencyTaka } from "react-icons/tb";
import { IoLocationSharp } from "react-icons/io5";
import Header from "../components/Header";
import { AuthContext } from "../provider/AuthProvider";

function DriverBookTrip() {
  const [rideRequests, setRideRequests] = useState([]);
  const { UserId } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("requests"); // State for active tab

  // get ride data
  const Requested = "Requested";
  const ServiceName = "Reservation";
  useEffect(() => {
    // Define a function to fetch ride requests
    const fetchRideRequests = () => {
      fetch(
        `http://localhost/zanbahon-server/Service/getByPaymentAndStatus.php?status=${Requested}&servicename=${ServiceName}`
      )
        .then((res) => res.json())
        .then((data) => {
          setRideRequests(data.data);
        })
        .catch((err) => console.log(err));
    };

    // Fetch ride requests immediately
    fetchRideRequests();

    // Set up an interval to refetch every 2 seconds
    const intervalId = setInterval(fetchRideRequests, 2000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const [rideHistory, setRideHistory] = useState([]);

  // get ride data
  const Accepted = "Accepted";
  useEffect(() => {
    // Define a function to fetch ride history
    const fetchRideHistory = () => {
      fetch(
        `http://localhost/zanbahon-server/Service/getByPaymentAndStatus.php?status=${Accepted}&servicename=${ServiceName}`
      )
        .then((res) => res.json())
        .then((data) => {
          setRideHistory(data.data);
        })
        .catch((err) => console.log(err));
    };

    // Fetch ride history immediately
    fetchRideHistory();

    // Set up an interval to refetch every 2 seconds
    const intervalId = setInterval(fetchRideHistory, 2000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleAccept = (rideId) => {
    const ride_id = rideId;
    const ride_status = "Accepted";

    const acceptRideShare = { ride_id, ride_status, UserId };
    if (acceptRideShare) {
      // update details in database
      fetch("http://localhost/zanbahon-server/Service/updateStatus.php", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(acceptRideShare),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.ServiceId) {
            alert("Accept Ride");
          }
        });
    } else {
      return;
    }
  };

  const handleReject = (rideId) => {
    // Update state to handle ride rejection
    alert(`Rejected ride ID: ${rideId}`);
    setRideRequests((prev) => prev.filter((ride) => ride.id !== rideId));
  };

  return (
    <>
      <div>
        <Header></Header>
      </div>
      <div className="container mx-auto p-4">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Reservation Driver Portal
          </h1>
        </header>

        {/* Tabs Navigation */}
        <div className="flex mb-6 border-b">
          <button
            onClick={() => setActiveTab("requests")}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "requests"
                ? "border-b-2 border-[#178783] text-[#178783]"
                : "text-gray-500"
            }`}
          >
            Ride Requests
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "history"
                ? "border-b-2 border-[#178783] text-[#178783]"
                : "text-gray-500"
            }`}
          >
            Ride History
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "requests" && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-700 mb-4">
              New Ride Requests
            </h2>
            <div className="space-y-4 md:grid grid-cols-4 gap-4">
              {rideRequests ? (
                <>
                  {rideRequests.map((ride) => (
                    <div
                      key={ride.RideId}
                      className="bg-white shadow-md p-4 rounded-md border border-gray-200"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold text-xs">
                            {ride.PickupLocation}
                          </h3>
                          <p className="text-xs text-gray-500 flex items-center">
                            <IoLocationSharp className="text-gray-700 mr-2" />
                            Destination: {ride.DropLocation}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="font-semibold text-xs flex items-center text-green-600">
                            <TbCurrencyTaka className="mr-1" /> {ride.TotalFareAmount}
                          </p>
                          <p className="text-xs text-gray-500">
                            Distance: {ride.TotalDistance} km
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-end mt-4 space-x-4">
                        <button
                          onClick={() => handleAccept(ride.RideId)}
                          className="bg-green-500 text-white py-2 px-4 rounded-md flex items-center"
                        >
                          <FaCheckCircle className="mr-2" /> Accept
                        </button>
                        <button
                          onClick={() => handleReject(ride.RideId)}
                          className="bg-red-500 text-white py-2 px-4 rounded-md flex items-center"
                        >
                          <FaTimesCircle className="mr-2" /> Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <p>Not Found</p>
              )}
            </div>
          </section>
        )}

        {activeTab === "history" && (
          <section className="mb-20">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Ride History</h2>
            <div className="space-y-4 md:grid grid-cols-4 gap-4">
              {rideHistory ? (
                <>
                  {rideHistory.map((ride) => (
                    <div
                      key={ride.RideId}
                      className="bg-gray-100 p-4 rounded-md border border-gray-200"
                    >
                      <div className="flex justify-between items-center text-xs">
                        <div>
                          <h3 className="font-semibold">
                            {ride.PickupLocation}
                          </h3>
                          <p className=" text-gray-500">
                            Destination: {ride.DropLocation}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold flex items-center text-green-600">
                            <TbCurrencyTaka className="mr-1" /> {ride.TotalFareAmount}
                          </p>
                          <p className=" text-gray-500">
                            Distance: {ride.TotalDistance} km
                          </p>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Status: {ride.RideStatus}
                      </p>
                    </div>
                  ))}
                </>
              ) : (
                <p>Not Found</p>
              )}
            </div>
          </section>
        )}
        </div>
      </>
    );
  }
  
  export default DriverBookTrip;