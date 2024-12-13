import React, { useContext, useState } from "react";
import logo from "../assets/zanbahonlogo.png";
import { Link } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdAssignmentAdd } from "react-icons/md";
import { MdHistory } from "react-icons/md";
import { FaCarSide } from "react-icons/fa";
import Sidebar from "./driverSidebar";
import { AuthContext } from "../provider/AuthProvider";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);

  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible((prevState) => !prevState);
  };

  const links = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link>Services</Link>
      </li>
      <li>
        <Link>History</Link>
      </li>
      <li>
        <Link>Vehicle</Link>
      </li>
    </>
  );
  return (
    <>
      <nav>
        <div className="z-50">
          <div className="navbar bg-[#178783]">
            <div className="navbar md:flex hidden max-w-screen-xl mx-auto">
              <div className="navbar-start">
                <div>
                  <Link to="/">
                    <img src={logo} alt="Zanbahon Logo" className="w-40" />
                  </Link>
                </div>
              </div>

              {/* desktop navbar links */}
              <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 space-x-10 font-bold text-white">
                  {links}
                </ul>
              </div>

              <div className="navbar-end space-x-5">
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex="0"
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        alt="user"
                        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex="0"
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-20 mt-3 w-52 p-2 shadow"
                  >
                    <li>
                      <a className="justify-between">
                        Profile <span className="badge">New</span>
                      </a>
                    </li>
                    <li>
                      <a>Settings</a>
                    </li>
                    <li>
                      <button onClick={logOut}>Logout</button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="">
              <div className="flex justify-center items-center space-x-3 md:hidden ml-5">
                <img src={logo} alt="Zanbahon Logo" className="w-40" />
              </div>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 w-full rounded-ss-3xl rounded-se-3xl p-3 flex justify-around text-white md:hidden bg-[#178783] z-50">
          <Link>
            <div className="flex flex-col items-center space-y-1">
              <MdAssignmentAdd className="text-4xl" />
              <p className="text-xs">Services</p>
            </div>
          </Link>
          <Link
            to="/all-service"
            className="flex flex-col items-center space-y-1"
          >
            <MdHistory className="text-4xl" />
            <p className="text-xs">History</p>
          </Link>
          <Link to={"/"}>
            <div className="flex flex-col items-center space-y-1">
              <IoHomeOutline className="text-4xl" />
              <p className="text-xs">Home</p>
            </div>
          </Link>
          <div className="flex flex-col items-center space-y-1">
            <FaCarSide className="text-4xl" />
            <p className="text-xs">Vehicle</p>
          </div>
          <div
            className="flex flex-col items-center space-y-1"
            onClick={toggleSidebar}
          >
            <RxHamburgerMenu className="text-4xl" />
            <p className="text-xs">Others</p>
          </div>
        </div>

        {/* Sidebar */}
        {isSidebarVisible && (
          <div className="md:hidden">
            <Sidebar />
          </div>
        )}
      </nav>
    </>
  );
};

export default Header;
