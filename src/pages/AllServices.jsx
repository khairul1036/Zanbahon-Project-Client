import React, { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import { AuthContext } from "../provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { MdCheck } from "react-icons/md";
import Lottie from "lottie-react";
import Trip from "../assets/lottie/trip.json";

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
        <div className="hero bg-gradient-to-t from-[#FFEDD2] to-[#DEFFDF] md:pt-10 pb-44">
          <div className="hero-content flex-row-reverse">
            <div className="w-[30%]">
              <Lottie animationData={Trip} />
            </div>
            <div className="w-[70%]">
              <h1 className="md:text-5xl text-base font-bold text-[#178783]">
                One Step Faster to <br /> Book Your Trip
              </h1>
              <p className="md:py-6 text-[#178783] md:text-base text-xs mb-4">
                Best Services & Hospitality in every time everywhere
              </p>
              <Link
                to={"/reserve-trip"}
                className="rounded-lg py-2 px-5 md:text-base text-xs text-[#178783] border border-solid border-[#178783] hover:bg-[#178783] hover:text-white"
              >
                Get Trip
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto p-4 -mt-44 bg-white rounded-md">
        <h1 className="text-3xl font-bold text-[#188784] mb-6 text-center my-10">
          Service Requests
        </h1>
        {serviceRequests.length === 0 ? (
          <p className="text-gray-600 text-lg">No service requests found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceRequests.map((service) => (
              <div key={service.RideId} className="">
                {/* Starter Plan */}
                <div className="border hover:border-[#188784] rounded-md p-6">
                  <h3 className="text-gray-800 text-xl font-semibold mb-2">
                    {service.ServiceName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Status:</span>{" "}
                    {service.RideStatus}
                  </p>

                  <div className="mt-2">
                    <h3 className="text-gray-800 md:text-2xl  font-semibold">
                      {service.TotalFareAmount}৳{" "}
                      <sub className="text-gray-500 md:text-sm font-medium">
                        Total Distance: {service.TotalDistance}km
                      </sub>
                    </h3>
                  </div>

                  <div className="mt-6 mb-16">
                    <h4 className="text-gray-800 md:text-xl font-semibold mb-2">
                      Other Info
                    </h4>


                    <ul className="space-y-4">
                      <li className="flex items-center text-sm text-gray-500">
                        <p className="text-xs">
                          <span className="font-semibold text-sm">Pickup:</span>{" "}
                          {service.PickupLocation}
                        </p>
                      </li>
                      <li className="flex items-center text-sm text-gray-500">
                        <p className="text-xs">
                          <span className="font-semibold">Drop-off:</span>{" "}
                          {service.DropLocation}
                        </p>
                      </li>
                      <li className="flex items-center text-sm text-gray-500">
                        <p className="text-sm text-gray-500">
                          <span className="font-semibold">Created At:</span>{" "}
                          {service.RideCreated_At}
                        </p>
                      </li>
                    </ul>

                    <button
                      onClick={() =>
                        handlePayment(service.RideId, service.TotalFareAmount)
                      }
                      type="button"
                      className=" w-full mt-4 bg-[#188784] text-white px-6 py-3 rounded-lg border border-solid border-[#178783] hover:bg-white hover:text-[#178783] transition "
                    >
                      Pay now
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

export default AllServices;
