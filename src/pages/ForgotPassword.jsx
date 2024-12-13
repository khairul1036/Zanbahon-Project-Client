import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { FaEnvelope } from "react-icons/fa"; // Importing email icon
import Lottie from "lottie-react";
import forgotpass from "../assets/lottie/forgetpass.json";

const ForgotPassword = () => {
  const [error, setError] = useState();
  const { forgotPassword } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  // Get email from the state and set it to input
  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    forgotPassword(email)
      .then(() => {
        // Redirect user to Gmail for password reset
        window.location.href = "https://mail.google.com";
      })
      .catch((error) => {
        setError("Error: " + error.message);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center max-w-7xl mx-auto my-20">
      <div className="w-[200px]">
        <Lottie animationData={forgotpass}></Lottie>
      </div>
      <div className="bg-white p-8 rounded-lg w-full sm:w-96">
        <h2 className="text-3xl font-bold text-center text-[#178783] mb-6">
          Forgot Password
        </h2>

        <form onSubmit={handleResetPassword}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              <FaEnvelope className="inline-block mr-2 text-[#178783]" />
              <span className="text-gray-800">Email Address</span>
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#178783]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          {/* Display the error */}
          {error && (
            <div className="mb-3 p-3 bg-red-100 border border-red-400 rounded-md text-red-700 text-xs">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#178783] text-white py-2 px-4 rounded-lg hover:bg-[#166c6c] focus:outline-none focus:ring-2 focus:ring-[#178783] transition"
          >
            Reset Password
          </button>
        </form>

        <button
          onClick={() => navigate("/auth/login")}
          className="mt-4 text-center text-sm text-[#178783] hover:underline block w-full"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
