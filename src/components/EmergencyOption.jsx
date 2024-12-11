import React, { useState } from "react";
import { MdBloodtype } from "react-icons/md";
import { FaAmbulance } from "react-icons/fa";
import Ambulance from "../assets/rb_765.png";
import { IoIosArrowBack } from "react-icons/io";
import Header from "./Header";

const EmergencyServices = () => {
    // State to manage visibility of the lists and emergency service section
    const [showAmbulanceList, setShowAmbulanceList] = useState(false);
    const [showBloodList, setShowBloodList] = useState(false);
    const [showEmergencyService, setShowEmergencyService] = useState(true); // Initially show the emergency service section
    const [bloodRequest, setBloodRequest] = useState(false);
    const [ambulanceDetels, setAmbulanceDetels] = useState(false);

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
    }

    const getblood = () => {
        setAmbulanceDetels(false);
        setBloodRequest(true)
        setShowAmbulanceList(false);
        setShowBloodList(false); // Hide blood list if showing ambulance list
        setShowEmergencyService(false);
    }

    const onClose = () => {
        setAmbulanceDetels(false);
        setBloodRequest(false)
        setShowAmbulanceList(false);
        setShowBloodList(true); // Hide blood list if showing ambulance list
        setShowEmergencyService(false);
    }

    const ambulsnceDetels = () => {
        setAmbulanceDetels(true);
        setBloodRequest(false)
        setShowAmbulanceList(false);
        setShowBloodList(false); // Hide blood list if showing ambulance list
        setShowEmergencyService(false);
    }

    const onClose2 = () => {
        setAmbulanceDetels(false);
        setBloodRequest(false)
        setShowAmbulanceList(true);
        setShowBloodList(false); // Hide blood list if showing ambulance list
        setShowEmergencyService(false);
    }
    

    return (
        <>
        <header>
            <Header></Header>
        </header>
            {/* Hero Section */}
            <div className="hero bg-gradient-to-t from-[#FFEDD2] to-[#DEFFDF] md:pt-10 pb-44">
                <div className="hero-content flex-row-reverse">
                    <div className="w-1/2">
                        <img src={Ambulance} alt="Emergency Service" />
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
                                    <button
                                        onClick={handleAmbulanceList}
                                        className="btn bg-[#178783] border-[#178783] text-white hover:text-black"
                                    >
                                        Get Ambulance
                                    </button>
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
                                    <button
                                        onClick={handleBloodList}
                                        className="btn bg-red-700 border-red-700 text-white hover:text-black"
                                    >
                                        Get Blood
                                    </button>
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
                            <IoIosArrowBack />Back
                        </button>
                    </div>
                    <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
                        {/* Sample Center Card */}
                        <div className="bg-white border border-gray-200 rounded-lg shadow p-6">
                            <div className="md:flex-col items-center space-y-5">
                                {/* Icon */}
                                <div className="w-full h-36 bg-red-100 flex items-center justify-center rounded-md">
                                    <FaAmbulance size='100px' />
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
                                        <span className="font-semibold">Availability:</span> Available
                                    </p>
                                </div>
                                <div>
                                    <button onClick={ambulsnceDetels} className="btn bg-[#FEE2E2]">Get Ambulance</button>
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
                            <IoIosArrowBack />Back
                        </button>
                    </div>
                    <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
                        {/* Sample Center Card */}
                        <div className="bg-white border border-gray-200 rounded-lg shadow p-6">
                            <div className="md:flex-col items-center space-y-5">
                                {/* Icon */}
                                <div className="w-full h-36 bg-red-100 flex items-center justify-center rounded-md">
                                    <MdBloodtype size='100px' />
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
                                        <span className="font-semibold">Availability:</span> Available
                                    </p>
                                </div>
                                <div>
                                    <button onClick={getblood} className="btn bg-[#FEE2E2]">Get Blood</button>
                                </div>
                            </div>
                        </div>

                        {/* Repeat the above card for more centers */}

                    </div>
                </div>
            )}

            {/* blood imformation */}
            {bloodRequest && (
                <>
                    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                        <div className="bg-white px-20 py-20 rounded-lg shadow-lg text-center">
                            <div className="font-bold text-2xl pb-3">Give Information</div>
                            <form className="space-y-5">
                                <label className="input input-bordered flex items-center gap-2">
                                    <input type="text" className="grow" placeholder="Name" />
                                </label>
                                <label className="input input-bordered flex items-center gap-2">
                                    <input type="text" className="grow" placeholder="Mobile No" />
                                </label>
                                <label className="input input-bordered flex items-center gap-2">
                                    <input type="text" className="grow" placeholder="Blood Type" />
                                </label>
                                <label className="input input-bordered flex items-center gap-2">
                                    <input type="password" className="grow" value="Location" />
                                </label>
                                <div className="mt-5 flex justify-between">
                                    <button type="button" className="btn" onClick={onClose}>Go back</button>
                                    <button type="submit" className="btn">Confirm</button>
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
                                    <button onClick={onClose2} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </>
            )}

        </>
    );
};

export default EmergencyServices;
