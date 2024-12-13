import React, { useContext, useState } from "react";
import logo from "../assets/zanbahonlogo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import Lottie from "lottie-react";
import login from "../assets/lottie/login.json";

const Login = () => {
  const [error, setError] = useState();
  const { userLogin, setUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.Email.value;
    if (!email) {
      setError("Please enter your email.");
      return false;
    }
    const password = form.Password.value;
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
      if (!/[A-Z]/.test(password)) {
        setError("Password must contain at least one uppercase letter.");
        return false;
      }
      if (!/[a-z]/.test(password)) {
        setError("Password must contain at least one lowercase letter.");
        return false;
      }
    setError("");

    userLogin(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => {
        const errorCode = err.code;
        const errorMessage = err.message;
        // console.log(errorCode, errorMessage);
        setError("Invalid Credential");
      });
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    navigate("/auth/forgot-password");
  };

  return (
    <>
      <div>
        <div className="h-screen md:flex">
          <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-[#11817C] to-[#13B3AE] i justify-around items-center hidden">
            <div>
              <img className="w-96" src={logo} alt="logo" />
              <p className="text-white mt-1">
                The most popular all in one transport service
              </p>
            </div>
            <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
            <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
            <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
            <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          </div>
          <div className="md:hidden">
            <Lottie animationData={login}></Lottie>
          </div>
          <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
            <form onSubmit={handleSubmit} className="bg-white">
              <h1 className="text-gray-800 font-bold text-2xl mb-7">Login</h1>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
                <input
                  className="pl-2 outline-none border-none bg-white"
                  type="Email"
                  name="Email"
                  id="Email"
                  placeholder="Email Address"
                />
              </div>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <input
                  className="pl-2 outline-none border-none bg-white"
                  type="text"
                  name="Password"
                  id=""
                  placeholder="Password"
                />
              </div>
              {/* Forgot Password Link */}
              <div className="text-right">
                <button
                  onClick={handleForgotPassword}
                  className="text-sm hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Display the error */}
              {error && (
                <div className="mb-3 p-3 bg-red-100 border border-red-400 rounded-md text-red-700 text-xs">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="block w-full bg-[#13B3AE] mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
              >
                Login
              </button>
              <Link to={"/auth/register"}>
                Don't have an account?
                <span className="text-sm ml-1 underline hover:text-[#13B3AE] cursor-pointer font-bold">
                  Register
                </span>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
