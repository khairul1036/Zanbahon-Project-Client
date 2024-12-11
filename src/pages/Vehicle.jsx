import React, { useState } from 'react';
import Header from '../components/Header';

const addVehicle = (e) => {
    e.preventDefault();
    const vehicleNumber = e.target.vehicleNumber.value;
    const vehicleType = e.target.vehicleType.value;
    const capacity = e.target.capacity.value;
    const ownerName = e.target.ownerName.value;
    const ownerContact = e.target.ownerContact.value;
    const perKMRate = e.target.perKMRate.value;

    console.log(vehicleNumber, vehicleType, capacity, ownerName, ownerContact, perKMRate);
};

const Vehicle = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [vehicleData, setVehicleData] = useState({
        vehicleNumber: 'AB-1234',
        vehicleType: 'Car',
        capacity: '4',
        ownerName: 'John Doe',
        ownerContact: '1234567890',
        perKMRate: '15',
    });

    const handleEdit = () => setIsEditing(true);
    const handleCancel = () => setIsEditing(false);

    return (
        <>
        <div>
            <Header></Header>
        </div>
            {isEditing ? (
                <div id="enterVehicleInfo" className="max-w-4xl mx-auto font-sans p-6">
                    <div className="text-center mb-16">
                        <h4 className="text-[#178782] text-4xl font-semibold mt-6">Edit Vehicle Information</h4>
                    </div>
                    {/* Form Section Start */}
                    <form
                        onSubmit={(e) => {
                            addVehicle(e);
                            setIsEditing(false);
                        }}
                    >
                        <div className="grid sm:grid-cols-2 gap-8">
                            <div>
                                <label htmlFor="vehicleNumber" className="text-gray-800 text-sm mb-2 block">Vehicle Number</label>
                                <input
                                    id="vehicleNumber"
                                    name="vehicleNumber"
                                    type="text"
                                    className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:outline-none focus:ring-2 focus:ring-[#178782]"
                                    defaultValue={vehicleData.vehicleNumber}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="vehicleType" className="text-gray-800 text-sm mb-2 block">Vehicle Type</label>
                                <select
                                    id="vehicleType"
                                    name="vehicleType"
                                    className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:outline-none focus:ring-2 focus:ring-[#178782]"
                                    defaultValue={vehicleData.vehicleType}
                                    required
                                >
                                    <option value="Car">Car</option>
                                    <option value="Truck">Truck</option>
                                    <option value="Van">Van</option>
                                    <option value="Bus">Bus</option>
                                    <option value="Pickup Van">Pickup Van</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="capacity" className="text-gray-800 text-sm mb-2 block">Capacity</label>
                                <input
                                    id="capacity"
                                    name="capacity"
                                    type="text"
                                    className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:outline-none focus:ring-2 focus:ring-[#178782]"
                                    defaultValue={vehicleData.capacity}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="ownerName" className="text-gray-800 text-sm mb-2 block">Owner Name</label>
                                <input
                                    id="ownerName"
                                    name="ownerName"
                                    type="text"
                                    className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:outline-none focus:ring-2 focus:ring-[#178782]"
                                    defaultValue={vehicleData.ownerName}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="ownerContact" className="text-gray-800 text-sm mb-2 block">Owner Contact</label>
                                <input
                                    id="ownerContact"
                                    name="ownerContact"
                                    type="text"
                                    className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:outline-none focus:ring-2 focus:ring-[#178782]"
                                    defaultValue={vehicleData.ownerContact}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="perKMRate" className="text-gray-800 text-sm mb-2 block">Per KM Rate</label>
                                <input
                                    id="perKMRate"
                                    name="perKMRate"
                                    type="number"
                                    className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:outline-none focus:ring-2 focus:ring-[#178782]"
                                    defaultValue={vehicleData.perKMRate}
                                    required
                                />
                            </div>
                        </div>
                        <div className="mt-12 flex justify-between">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="py-3 px-6 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="py-3 px-6 bg-[#178782] text-white rounded-md hover:bg-[#15a183]"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div id="showVehicleInfo" className="max-w-4xl mx-auto font-sans p-6">
                    <div className="text-center mb-16">
                        <h4 className="text-[#178782] text-4xl font-semibold mt-6">Vehicle Information</h4>
                    </div>
                    <div className="bg-white p-8 rounded-md shadow-md">
                        <div className="grid sm:grid-cols-2 gap-8">
                            <div>
                                <h5 className="text-gray-800 text-sm mb-2">Vehicle Number</h5>
                                <p className="text-gray-600 text-lg">{vehicleData.vehicleNumber}</p>
                            </div>
                            <div>
                                <h5 className="text-gray-800 text-sm mb-2">Vehicle Type</h5>
                                <p className="text-gray-600 text-lg">{vehicleData.vehicleType}</p>
                            </div>
                            <div>
                                <h5 className="text-gray-800 text-sm mb-2">Capacity</h5>
                                <p className="text-gray-600 text-lg">{vehicleData.capacity}</p>
                            </div>
                            <div>
                                <h5 className="text-gray-800 text-sm mb-2">Owner Name</h5>
                                <p className="text-gray-600 text-lg">{vehicleData.ownerName}</p>
                            </div>
                            <div>
                                <h5 className="text-gray-800 text-sm mb-2">Owner Contact</h5>
                                <p className="text-gray-600 text-lg">{vehicleData.ownerContact}</p>
                            </div>
                            <div>
                                <h5 className="text-gray-800 text-sm mb-2">Per KM Rate</h5>
                                <p className="text-gray-600 text-lg">{vehicleData.perKMRate}</p>
                            </div>
                        </div>
                        <div className="mt-12 text-center">
                            <button
                                onClick={handleEdit}
                                className="py-3 px-6 bg-[#178782] text-white rounded-md hover:bg-[#15a183]"
                            >
                                Edit Vehicle Info
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Vehicle;
