import { useState, useEffect } from "react";
import Header from "./Header";
import { FaCheckCircle } from "react-icons/fa";

const BloodCenter = () => {
  const [activeTab, setActiveTab] = useState("requests"); // State for active tab
  const [bloodRequests, setBloodRequests] = useState([]); // State for blood requests
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error
  const [creating, setCreating] = useState(false); // State for creating blood center
  const [formData, setFormData] = useState({
    CenterName: "",
    Location: "",
    ContactNumbers: "",
    Availability: "",
  }); // State for form data
  const [formMessage, setFormMessage] = useState(null); // State for form submission message

  // Fetch data from the API
  useEffect(() => {
    if (activeTab === "requests") {
      const fetchBloodRequests = async () => {
        try {
          setLoading(true); // Start loading
          const response = await fetch(
            "http://localhost/zanbahon-server/blood%20request/getByBloodRequestStatus.php"
          );

          if (!response.ok) {
            throw new Error("Failed to fetch blood requests");
          }

          const data = await response.json();
          setBloodRequests(data.data || []); // Update state with fetched data
          setError(null);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false); // Stop loading
        }
      };

      fetchBloodRequests();
    }
  }, [activeTab]); // Fetch data only when the active tab is "requests"

  // Handle the click of the "Donated" button
  const handleDonation = async (bloodRequestId) => {
    try {
      const response = await fetch(
        "http://localhost/zanbahon-server/blood%20request/UpdateBloodRequestStatus.php",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bloodRequestId: bloodRequestId,
            Status: "donated",
          }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        // Update the state to reflect the status change
        setBloodRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.bloodRequestId === bloodRequestId
              ? { ...request, Status: "donated" }
              : request
          )
        );
      } else {
        throw new Error(result.message || "Failed to update status");
      }
    } catch (err) {
      setError(err.message); // Show error if something goes wrong
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Create a new blood center
  const createBloodCenter = async (e) => {
    e.preventDefault();
    try {
      setCreating(true); // Indicate form submission in progress
      setFormMessage(null); // Reset form message
      const response = await fetch(
        "http://localhost/zanbahon-server/blood%20request/blood_bankCreate.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to create blood center");
      }

      setFormMessage({
        type: "success",
        text: result.message,
      }); // Show success message

      // Reset form
      setFormData({
        CenterName: "",
        Location: "",
        ContactNumbers: "",
        Availability: "",
      });
    } catch (err) {
      setFormMessage({
        type: "error",
        text: err.message,
      }); // Show error message
    } finally {
      setCreating(false); // Indicate form submission complete
    }
  };

  return (
    <div>
      <header className="z-20">
        <Header />
      </header>
      <div className="max-w-7xl mx-auto">
        {/* Tabs */}
        <div role="tablist" className="tabs tabs-lifted tabs-lg mb-8 ">
          <a
            role="tab"
            className={`tab ${activeTab === "requests" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("requests")}
          >
            Blood Requests
          </a>
          <a
            role="tab"
            className={`tab ${activeTab === "center" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("center")}
          >
            Blood Center
          </a>
        </div>

        {/* Blood Requests Tab */}
        {activeTab === "requests" && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-[#178783] mb-4 text-center">
              Blood Request List
            </h2>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && bloodRequests.length === 0 && (
              <p>No blood requests with status 'Waiting' found.</p>
            )}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {!loading &&
                !error &&
                bloodRequests.map((request) => (
                  <div
                    key={request.bloodRequestId}
                    className="bg-white shadow rounded-3xl p-6 hover:scale-105 transition-all duration-300"
                  >
                    <h4 className="text-gray-800 text-lg mb-3">
                      {request.blood_seeker_name}
                    </h4>
                    <h3 className="text-4xl font-semibold">
                      {request.blood_type}
                    </h3>

                    <hr className="my-6 border-gray-300" />

                    <div>
                      <ul className="space-y-4">
                        <li className="flex items-center text-sm text-gray-500">
                          <FaCheckCircle
                            className="mr-3 bg-purple-100 text-purple-600 rounded-full p-[3px]"
                            size={18}
                          />
                          Location: {request.blood_seeker_address}
                        </li>
                        <li className="flex items-center text-sm text-gray-500">
                          <FaCheckCircle
                            className="mr-3 bg-purple-100 text-purple-600 rounded-full p-[3px]"
                            size={18}
                          />
                          Mobile No: {request.phone}
                        </li>
                        <li className="flex items-center text-sm text-gray-500">
                          <FaCheckCircle
                            className="mr-3 bg-purple-100 text-purple-600 rounded-full p-[3px]"
                            size={18}
                          />
                          Status: {request.Status}
                        </li>
                      </ul>

                      <button
                        onClick={() => handleDonation(request.bloodRequestId)}
                        className="w-full mt-10 bg-[#188784] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#166c6e] transition"
                      >
                        Donated
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        )}

        {/* Blood Center Tab */}
        {activeTab === "center" && (
          <section className="mb-20">
            <h2 className="text-lg font-bold text-gray-700 mb-4 m-5">
              Create Blood Donation Center
            </h2>
            <form onSubmit={createBloodCenter} className="space-y-4 m-5">
              <div>
                <label className="block text-gray-700 font-medium">
                  Center Name
                </label>
                <input
                  type="text"
                  name="CenterName"
                  value={formData.CenterName}
                  onChange={handleInputChange}
                  className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-[#178783]"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">
                  Location
                </label>
                <input
                  type="text"
                  name="Location"
                  value={formData.Location}
                  onChange={handleInputChange}
                  className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-[#178783]"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">
                  Contact Numbers
                </label>
                <input
                  type="text"
                  name="ContactNumbers"
                  value={formData.ContactNumbers}
                  onChange={handleInputChange}
                  className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-[#178783]"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">
                  Availability
                </label>
                <input
                  type="text"
                  name="Availability"
                  value={formData.Availability}
                  onChange={handleInputChange}
                  className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-[#178783]"
                  required
                />
              </div>
              <button
                type="submit"
                className="mt-4 w-full text-[#178783] border border-solid border-[#178783] hover:bg-[#178783] hover:text-white py-2 px-4 rounded"
                disabled={creating}
              >
                {creating ? "Creating..." : "Create Blood Center"}
              </button>
              {formMessage && (
                <p
                  className={`mt-2 ${
                    formMessage.type === "success"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {formMessage.text}
                </p>
              )}
            </form>
          </section>
        )}
      </div>
    </div>
  );
};

export default BloodCenter;
