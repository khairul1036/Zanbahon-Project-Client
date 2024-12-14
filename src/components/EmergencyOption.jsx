import React, { useContext, useEffect, useState } from "react";
import { MdBloodtype } from "react-icons/md";
import { FaAmbulance } from "react-icons/fa";
import Ambulance from "../assets/rb_765.png";
import { IoIosArrowBack } from "react-icons/io";
import Header from "./Header";
import Lottie from "lottie-react";
import ambulance from "../assets/lottie/ambulance.json";
import { AuthContext } from "../provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const EmergencyServices = () => {
  const { dbUserRole } = useContext(AuthContext);
  // State to manage visibility of the lists and emergency service section
  const [showAmbulanceList, setShowAmbulanceList] = useState(false);
  const [showBloodList, setShowBloodList] = useState(false);
  const [showEmergencyService, setShowEmergencyService] = useState(true); // Initially show the emergency service section
  const [bloodRequest, setBloodRequest] = useState(false);
  const [ambulanceDetels, setAmbulanceDetels] = useState(false);
  const [bloodCenters, setBloodCenters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBloodCenterId, setSelectedBloodCenterId] = useState(null);
  const navigate = useNavigate()

  // Fetch Blood Donation Centers
  useEffect(() => {
    if (showBloodList) {
      setLoading(true);
      fetch(
        "http://localhost/zanbahon-server/blood%20request/getAllBloodDonationCenters.php"
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.data) {
            setBloodCenters(data.data);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching blood centers:", error);
          setLoading(false);
        });
    }
  }, [showBloodList]);

  const handleBloodRequestSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedBloodCenterId);

    const bloodRequestData = {
      blood_type: e.target.blood_type.value,
      blood_seeker_name: e.target.name.value,
      blood_seeker_address: e.target.location.value,
      phone: e.target.phone.value,
      blood_bank_id: selectedBloodCenterId, // Pass the selected center's ID
    };

    try {
      const response = await fetch(
        "http://localhost/zanbahon-server/blood%20request/bloodRequestCreate.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bloodRequestData),
        }
      );

      const data = await response.json();

      if (data.message === "Blood request created successfully") {
        // Handle success (e.g., show success message, clear form, etc.)
        Swal.fire({
          title: "Request pending",
          text: "You clicked the button!",
          icon: "success"
        });
        navigate('/');
        setBloodRequest(false); // Close the blood request form
      } else {
        // Handle error
        alert("Error: " + data.message);
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
    }
  };

  // Function to handle showing ambulance list
  const handleAmbulanceList = () => {
    setAmbulanceDetels(false);
    setBloodRequest(false);
    setShowAmbulanceList(true);
    setShowBloodList(false); // Hide blood list if showing ambulance list
    setShowEmergencyService(false); // Hide emergency service section
  };

  // Function to handle showing blood list
  const handleBloodList = () => {
    setAmbulanceDetels(false);
    setBloodRequest(false);
    setShowBloodList(true);
    setShowAmbulanceList(false); // Hide ambulance list if showing blood list
    setShowEmergencyService(false); // Hide emergency service section
  };

  const handelback = () => {
    setAmbulanceDetels(false);
    setBloodRequest(false);
    setShowAmbulanceList(false);
    setShowBloodList(false); // Hide blood list if showing ambulance list
    setShowEmergencyService(true);
  };

  const getblood = (centerId) => {
    setSelectedBloodCenterId(centerId); // Save the center ID
    setAmbulanceDetels(false);
    setBloodRequest(true);
    setShowAmbulanceList(false);
    setShowBloodList(false); // Hide blood list if showing ambulance list
    setShowEmergencyService(false);
  };

  const onClose = () => {
    setAmbulanceDetels(false);
    setBloodRequest(false);
    setShowAmbulanceList(false);
    setShowBloodList(true); // Hide blood list if showing ambulance list
    setShowEmergencyService(false);
  };

  const ambulsnceDetels = () => {
    setAmbulanceDetels(true);
    setBloodRequest(false);
    setShowAmbulanceList(false);
    setShowBloodList(false); // Hide blood list if showing ambulance list
    setShowEmergencyService(false);
  };

  const onClose2 = () => {
    setAmbulanceDetels(false);
    setBloodRequest(false);
    setShowAmbulanceList(true);
    setShowBloodList(false); // Hide blood list if showing ambulance list
    setShowEmergencyService(false);
  };

  return (
    <div className="mb-20">
      <header>
        <Header></Header>
      </header>
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
            <p className="md:py-6 text-[#178783] md:text-base text-xs">
              Best Services & Hospitality in every time everywhere
            </p>
          </div>
        </div>
      </div>

      {/* Emergency Service Options */}
      {showEmergencyService && (
        <div
          id="emergencyService"
          className="md:flex justify-center max-w-screen-xl mx-auto -mt-44 bg-[#D9D9D9] rounded-3xl md:p-10 p-5 md:space-x-11 md:space-y-0 space-y-6"
        >
          <div className="md:w-1/2">
            <div
              className="hero rounded-2xl"
              style={{
                backgroundImage:
                  "url(https://24ambulance.com/wp-content/uploads/2021/12/Gopgalganj-ambulance-service.jpg)",
              }}
            >
              <div className="hero-overlay bg-opacity-80 rounded-2xl"></div>
              <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md md:p-20">
                  <div className="flex justify-center items-center">
                    <FaAmbulance className="text-9xl text-white" />
                  </div>
                  <p className="mb-5 text-white text-2xl font-bold">
                    Use our service to get ambulance
                  </p>
                  {dbUserRole === 1 ? (
                    <button
                      onClick={handleAmbulanceList}
                      className="btn bg-[#178783] border-[#178783] text-white hover:text-black"
                    >
                      Get Ambulance
                    </button>
                  ) : (
                    <button
                      onClick={handleAmbulanceList}
                      className="btn bg-[#178783] border-[#178783] text-white hover:text-black"
                    >
                      Get Ambulance
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-1/2">
            <div
              className="hero rounded-2xl"
              style={{
                backgroundImage:
                  "url(https://sanguina.com/cdn/shop/articles/230614_BloodDonation_Blog_cover.jpg)",
              }}
            >
              <div className="hero-overlay bg-opacity-80 rounded-2xl"></div>
              <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md md:p-20">
                  <div className="flex justify-center items-center">
                    <MdBloodtype className="text-9xl text-white" />
                  </div>
                  <p className="mb-5 text-white text-2xl font-bold">
                    Use our service to get blood
                  </p>
                  {dbUserRole === 1 ? (
                    <button
                      onClick={handleBloodList}
                      className="btn bg-red-700 border-red-700 text-white hover:text-black"
                    >
                      Get Blood
                    </button>
                  ) : (
                    <Link
                      to="/bloodCenter"
                      className="btn bg-red-700 border-red-700 text-white hover:text-black"
                    >
                      Blood Center
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Display Ambulance List */}
      {showAmbulanceList && (
        <div className="max-w-screen-xl mx-auto -mt-44 bg-[#D9D9D9] rounded-3xl md:p-10 p-5">
          <div onClick={handelback} className="mb-5">
            <button className="btn">
              <IoIosArrowBack />
              Back
            </button>
          </div>
          <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
            {/* Sample Center Card */}
            <div className="bg-white border border-gray-200 rounded-lg shadow p-6">
              <div className="md:flex-col items-center space-y-5">
                {/* Icon */}
                <div className="w-full h-36 bg-red-100 flex items-center justify-center rounded-md">
                  <FaAmbulance size="100px" />
                </div>
                {/* Content */}
                <div className="md:ml-0 ml-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Center Name
                  </h2>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-sm text-gray-700 mt-1">
                    <span className="font-semibold">Contact Number:</span>
                    <ul className="list-disc ml-10">
                      <li>123-456-789</li>
                      <li>987-654-321</li>
                    </ul>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    <span className="font-semibold">Availability:</span>{" "}
                    Available
                  </p>
                </div>
                <div>
                  <button
                    onClick={ambulsnceDetels}
                    className="btn bg-[#FEE2E2]"
                  >
                    Get Ambulance
                  </button>
                </div>
              </div>
            </div>

            {/* Repeat the above card for more centers */}
          </div>
        </div>
      )}

      {/* Display Blood List */}
      {showBloodList && (
        <div className="max-w-screen-xl mx-auto -mt-44 bg-[#D9D9D9] rounded-3xl md:p-10 p-5">
          <div onClick={handelback} className="mb-5">
            <button className="btn">
              <IoIosArrowBack /> Back
            </button>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : bloodCenters.length > 0 ? (
            <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
              {bloodCenters.map((center) => (
                <div
                  key={center.blood_bank_id}
                  className="bg-white border border-gray-200 rounded-lg shadow p-6"
                >
                  <div className="space-y-5">
                    <div className="w-full h-36 bg-red-100 flex items-center justify-center rounded-md">
                      <MdBloodtype size="100px" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">
                        {center.CenterName}
                      </h2>
                      <p className="text-sm text-gray-500">{center.Location}</p>
                      <p className="text-sm text-gray-700 mt-1">
                        <span className="font-semibold">Contact Numbers:</span>
                        <ul className="list-disc ml-10">
                          {center.ContactNumbers.split(",").map(
                            (num, index) => (
                              <li key={index}>{num}</li>
                            )
                          )}
                        </ul>
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        <span className="font-semibold">Availability:</span>{" "}
                        {center.Availability}
                      </p>
                    </div>
                    <div>
                      <button
                        onClick={() => getblood(center.blood_bank_id)}
                        className="btn bg-[#FEE2E2]"
                      >
                        Get Blood
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No blood donation centers found.</p>
          )}
        </div>
      )}

      {/* blood imformation */}
      {bloodRequest && (
        <>
          <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="bg-white px-20 py-20 rounded-lg shadow-lg text-center">
              <div className="font-bold text-2xl pb-3">Give Information</div>
              <form className="space-y-5" onSubmit={handleBloodRequestSubmit}>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    className="grow"
                    name="name"
                    placeholder="Name"
                    required
                  />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    className="grow"
                    name="phone"
                    placeholder="Mobile No"
                    required
                  />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    className="grow"
                    name="blood_type"
                    placeholder="Blood Type"
                    required
                  />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    className="grow"
                    name="location"
                    placeholder="Location"
                    required
                  />
                </label>
                <div className="mt-5 flex justify-between">
                  <button type="button" className="btn" onClick={onClose}>
                    Go back
                  </button>
                  <button type="submit" className="btn">
                    Confirm
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {/* ambulance information */}
      {ambulanceDetels && (
        <>
          <div
            id="success-popup"
            className="fixed inset-0 flex items-center justify-center bg-black/50"
          >
            <div className="bg-gray-100 flex justify-center items-center rounded-xl">
              <div className="bg-white rounded-lg w-96 p-6">
                <h2 className="text-xl font-bold mb-4 text-center text-gray-800">
                  Ambulance Service Details
                </h2>
                <div className="text-gray-700">
                  <p>
                    <strong>Service Name:</strong> Service Name Here
                  </p>
                  <p>
                    <strong>Location:</strong> Location Here
                  </p>
                  <p>
                    <strong>Availability:</strong> Availability Here
                  </p>
                  <p>
                    <strong>Vehicle Types:</strong> Vehicle Types Here
                  </p>
                  <p>
                    <strong>Coverage Area:</strong> Coverage Area Here
                  </p>
                  <p>
                    <strong>Contact Numbers:</strong> Contact Numbers Here
                  </p>
                </div>
                <div className="mt-6 flex justify-between space-x-4">
                  <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                    Get Now
                  </button>
                  <button
                    onClick={onClose2}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EmergencyServices;
