import React, { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const AllServices = () => {
  const { UserId } = useContext(AuthContext);
  const [serviceRequests, setServiceRequests] = useState([]);
  const navigate = useNavigate();

  // Fetch service requests from the server
  useEffect(() => {
    fetch(
      `http://localhost/zanbahon-server/Service/getRideByRiderID.php?riderid=${UserId}`
    )
      .then((res) => res.json())
      .then((data) => setServiceRequests(data.rides))
      .catch((err) => console.error("Error fetching services:", err));
  }, []);

  // Handle payment button click
  const handlePayment = (RideId, TotalFareAmount) => {
     navigate("/payment", {
      state: {
        RideId: RideId,
        TotalFareAmount: TotalFareAmount,
      },
    });
  };
  console.log(serviceRequests);
  return (
    <>
      <div>
        <Header></Header>
      </div>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Service Requests
        </h1>
        {serviceRequests.length === 0 ? (
          <p className="text-gray-600 text-lg">No service requests found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceRequests.map((service) => (
              <div
                key={service.RideId}
                className="relative bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
              >
                {/* Header */}
                <h2 className="text-lg font-bold text-blue-600 mb-3">
                  {service.ServiceName}
                </h2>

                {/* Details */}
                <div className="text-gray-700 space-y-2 mb-8">
                  <p>
                    <span className="font-semibold">Ride ID:</span>{" "}
                    {service.RideId}
                  </p>
                  <p>
                    <span className="font-semibold">Pickup:</span>{" "}
                    {service.PickupLocation}
                  </p>
                  <p>
                    <span className="font-semibold">Drop-off:</span>{" "}
                    {service.DropLocation}
                  </p>
                  <p>
                    <span className="font-semibold">Total Distance:</span>{" "}
                    {service.TotalDistance} km
                  </p>
                  <p>
                    <span className="font-semibold">Total Fare:</span>{" "}
                    {service.TotalFareAmount} BDT
                  </p>
                  <p>
                    <span className="font-semibold">Status:</span>{" "}
                    {service.RideStatus}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Created At:</span>{" "}
                    {service.RideCreated_At}
                  </p>
                </div>

                {/* Pay Button */}
                <button
                  onClick={() => handlePayment(service.RideId, service.TotalFareAmount)}
                  className="absolute bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md shadow-md transition-transform transform hover:scale-105"
                >
                  Pay
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AllServices;
