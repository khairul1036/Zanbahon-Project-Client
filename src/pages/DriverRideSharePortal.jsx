import React, { useContext, useEffect, useState } from "react";
import { FaCar, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { TbCurrencyTaka } from "react-icons/tb";
import { IoLocationSharp } from "react-icons/io5";
import Header from "../components/Header";
import { AuthContext } from "../provider/AuthProvider";

function DriverRideSharePortal() {
  const [rideRequests, setRideRequests] = useState([]);
  const { UserId } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState("requests"); // State for active tab

  // get ride data
  const Requested = "Requested";
  const ServiceName = "Ride%20Share";
  useEffect(() => {
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

    fetchRideRequests();
    const intervalId = setInterval(fetchRideRequests, 2000);
    return () => clearInterval(intervalId);
  }, []);

  const [rideHistory, setRideHistory] = useState([]);
  const Accepted = "Accepted";
  useEffect(() => {
    const fetchRideHistory = () => {
      fetch(
        `http://localhost/zanbahon-server/Service/getByPaymentAndStatus.php?status=${Accepted}&servicename=${ServiceName}`
      )
        .then((res) => res.json())
        .then((data) => setRideHistory(data.data))
        .catch((err) => console.log(err));
    };

    fetchRideHistory();
    const intervalId = setInterval(fetchRideHistory, 2000);
    return () => clearInterval(intervalId);
  }, []);

  const handleAccept = (rideId) => {
    const ride_id = rideId;
    const ride_status = "Accepted";

    const acceptRideShare = { ride_id, ride_status, UserId };
    if (acceptRideShare) {
      fetch("http://localhost/zanbahon-server/Service/updateStatus.php", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(acceptRideShare),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.ServiceId) {
            alert("Accept Ride");
          }
        });
    }
  };

  const handleReject = (rideId) => {
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
          <h1 className="text-2xl font-semibold text-[#178783] text-center">
            Driver Portal
          </h1>
        </header>

        {/* Tabs */}
        <div role="tablist" className="tabs tabs-lifted tabs-lg mb-8">
          <a
            role="tab"
            className={`tab ${activeTab === "requests" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("requests")}
          >
            Ride Requests
          </a>
          <a
            role="tab"
            className={`tab ${activeTab === "history" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("history")}
          >
            Ride History
          </a>
        </div>

        {/* Conditional Rendering Based on Active Tab */}
        {activeTab === "requests" && (
          <section className="mb-8">
            {/* <h2 className="text-xl font-bold text-[#178783] text-center mb-4">
              New Ride Requests
            </h2> */}
            <div className="space-y-4 md:grid grid-cols-4 gap-4">
              {rideRequests ? (
                rideRequests.map((ride) => (
                  <div
                    key={ride.RideId}
                    className="bg-white shadow-md p-4 rounded-md border border-gray-200 "
                  >
                    <div className="flex justify-between items-center">
                      <div className="text-xs">
                        <h3 className="font-semibold mb-4">
                          {ride.PickupLocation}
                        </h3>
                        <p className=" text-gray-500 flex items-center">
                          <IoLocationSharp className="text-gray-700 mr-2" />
                          Destination: {ride.DropLocation}
                        </p>
                        <p className=" text-gray-500">
                          Payment Status: {ride.PaymentStatus}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="font-semibold flex items-center text-green-600">
                          <TbCurrencyTaka className="mr-1" /> {ride.TotalFareAmount}
                        </p>
                        <p className="text-sm text-gray-500">
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
                ))
              ) : (
                <p>Not Found</p>
              )}
            </div>
          </section>
        )}

        {activeTab === "history" && (
          <section className="mb-20">
            {/* <h2 className="text-xl font-bold text-[#178783] text-center mb-4">Ride History</h2> */}
            <div className="space-y-4 md:grid grid-cols-4 gap-4">
              {rideHistory ? (
                rideHistory.map((ride) => (
                  <div
                    key={ride.RideId}
                    className="bg-gray-100 p-4 rounded-md border border-gray-200"
                  >
                    <div className="flex justify-between items-center">
                      <div className="text-xs">
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
                        <p className="text-sm text-gray-500">
                          Distance: {ride.TotalDistance} km
                        </p>
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      Status: {ride.RideStatus}
                    </p>
                    <p className="text-xs text-gray-500">
                      Payment Status: {ride.PaymentStatus}
                    </p>
                  </div>
                ))
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

export default DriverRideSharePortal;