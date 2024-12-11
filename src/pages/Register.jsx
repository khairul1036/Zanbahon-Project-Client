import React, { useContext, useState } from "react";
import logo from "../assets/zanbahonlogo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaRegAddressCard } from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";

const Register = () => {
  const [error, setError] = useState();
  const { createNewUser, setUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    //get form data
    const form = new FormData(e.target);
    const name = form.get("Name");
    const email = form.get("Email");
    const nid = form.get("NID");
    const password = form.get("Password");
    const phone = form.get("Phone");
    const role_id = form.get("role");

    if (!name) {
      setError("Please enter your name.");
      return false;
    }
    if (!email) {
      setError("Please enter your email.");
      return false;
    }
    if (!password) {
      setError("Please enter your password.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    // if (!/[A-Z]/.test(password)) {
    //   setError("Password must contain at least one uppercase letter.");
    //   return false;
    // }
    // if (!/[a-z]/.test(password)) {
    //   setError("Password must contain at least one lowercase letter.");
    //   return false;
    // }
    setError("");

    const newUser = { name, email, nid, phone, password, role_id };
    console.log(newUser);

    if (newUser) {
      // create user firebase
      createNewUser(email, password)
        .then((result) => {
          const user = result.user;
          setUser(user);
          updateUserProfile({ displayName: name })
            .then(() => {
              navigate("/");
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              // console.log(errorCode, errorMessage);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });

      // store user details in database
      fetch("http://localhost/zanbahon-server/user1.php", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newUser),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          //   const newUser = [...users, data]
          //   setUsers(newUser)
          //   form.reset();
        });
      navigate("/");
    } else {
      return false;
    }
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
          <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
            <form onSubmit={handleSubmit} className="bg-white">
              <h1 className="text-gray-800 font-bold text-2xl mb-7">Sign Up</h1>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  />
                </svg>
                <input
                  className="pl-2 outline-none border-none bg-white"
                  type="text"
                  name="Name"
                  id="Name"
                  placeholder="Full name"
                />
              </div>
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
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <div>
                  <FaRegAddressCard className="text-gray-400 text-lg" />
                </div>
                <input
                  className="pl-2 outline-none border-none bg-white"
                  type="number"
                  name="NID"
                  id="NID"
                  placeholder="NID"
                />
              </div>

              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <div className="border-r-2 pr-1">
                  <h1 className="text-gray-400 text-lg">+880</h1>
                </div>
                <input
                  className="pl-2 outline-none border-none bg-white"
                  type="number"
                  name="Phone"
                  id="Phone"
                  placeholder="Phone"
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
              <div className="flex justify-between py-2 px-3 mt-2">
                <div className="flex space-x-2">
                  <input
                    type="radio"
                    name="role"
                    className="radio radio-accent"
                    checked="checked"
                    value="1"
                  />
                  <p>User</p>
                </div>
                <div className="flex space-x-2">
                  <input
                    type="radio"
                    name="role"
                    className="radio radio-accent"
                    value="2"
                  />
                  <p>Driver</p>
                </div>
              </div>

              {/* Display the error */}
              {error && (
                <div className="mb-3 p-2 bg-red-100 border border-red-400 rounded-md text-red-700 text-xs">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="block w-full bg-[#13B3AE] mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
              >
                Register
              </button>

              <Link to={"/auth/login"}>
                Don't have an account?
                <span className="text-sm ml-1 underline hover:text-[#13B3AE] cursor-pointer font-bold">
                  Login
                </span>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
