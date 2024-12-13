import React, { useState, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import ambulance from "../assets/lottie/bus.json";

const CreateParking = () => {
  const navigate = useNavigate()
  const { UserId, dbUserName } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    user_id: UserId, // Replace with the actual user ID if available
    location: "",
    slot_type: "Regular",
    total_slots: "",
    vehicle_type: "Car",
    rate_per_hour: "",
    overtime_rate_per_hour: "",
    status: "Available",
  });

  const [autocompleteResults, setAutocompleteResults] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === "location") fetchAutocomplete(value);
  };

  const fetchAutocomplete = async (query) => {
    if (!query) {
      setAutocompleteResults([]);
      return;
    }
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}&countrycodes=BD`
      );
      const locations = await response.json();
      setAutocompleteResults(locations);
    } catch (error) {
      console.error("Error fetching autocomplete results:", error);
    }
  };

  const handleAutocompleteSelect = (location) => {
    setFormData({
      ...formData,
      location: location.display_name,
    });
    setAutocompleteResults([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost/zanbahon-server/DriverParking/create.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      alert(result.message || "Parking created successfully!");
      navigate('/view-parking')
      setFormData({
        user_id: UserId || "",
        location: "",
        slot_type: "Regular",
        total_slots: "",
        vehicle_type: "Car",
        rate_per_hour: "",
        overtime_rate_per_hour: "",
        status: "Available",
      });
    } catch (error) {
      alert("An error occurred while creating the parking.");
    }
  };

  return (
    <>
      <Header></Header>
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
              to={"/view-parking"}
              className="btn bg-transparent rounded-lg py-2 px-5 md:text-base text-xs text-[#178783] border border-solid border-[#178783] hover:bg-[#178783] hover:text-white"
            >
              View Parking
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto p-6 bg-white shadow-md rounded-lg mb-20 -mt-44">
        <h2 className="text-2xl font-bold mb-4 text-[#178783] text-center">Create Parking</h2>
        <form onSubmit={handleSubmit} className="space-y-4 md:grid grid-cols-2  gap-4">
          <div className="col-span-2">
            <label className="block font-medium mb-1">User ID:</label>
            <input
              type="text"
              name="user_id"
              value={dbUserName}
              onChange={handleChange}
              readOnly
              className=" w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-[#178783]"
            />
          </div>

          <div className="col-span-2">
            <label className="block font-medium mb-4">Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-[#178783]"
            />
            {autocompleteResults.length > 0 && (
              <ul className="border rounded-md mt-2 bg-white shadow">
                {autocompleteResults.map((location, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleAutocompleteSelect(location)}
                  >
                    {location.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">Slot Type:</label>
            <select
              name="slot_type"
              value={formData.slot_type}
              onChange={handleChange}
              className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-[#178783]"
            >
              <option value="Regular">Regular</option>
              <option value="VIP">VIP</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Total Slots:</label>
            <input
              type="number"
              name="total_slots"
              value={formData.total_slots}
              onChange={handleChange}
              className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-[#178783]"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Vehicle Type:</label>
            <select
              name="vehicle_type"
              value={formData.vehicle_type}
              onChange={handleChange}
              className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-[#178783]"
            >
              <option value="Car">Car</option>
              <option value="Bike">Bike</option>
              <option value="Truck">Truck</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Rate Per Hour:</label>
            <input
              type="number"
              name="rate_per_hour"
              value={formData.rate_per_hour}
              onChange={handleChange}
              className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-[#178783]"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Overtime Rate Per Hour:</label>
            <input
              type="number"
              name="overtime_rate_per_hour"
              value={formData.overtime_rate_per_hour}
              onChange={handleChange}
              required
              className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-[#178783]"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Status:</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-[#178783]"
            >
              <option value="Available">Available</option>
              <option value="Occupied">Occupied</option>
            </select>
          </div>

          <button
            type="submit"
            className="col-span-2 mt-4 w-full text-[#178783] border border-solid border-[#178783] hover:bg-[#178783] hover:text-white py-2 px-4 rounded"
          >
            Create Parking
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateParking;
