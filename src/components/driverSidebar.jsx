import React, { useContext } from "react";
import { FaAmbulance, FaUserCircle } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { FaCar } from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";
import { Link } from "react-router-dom";
import { IoBookmarksOutline, IoTicketOutline } from "react-icons/io5";
import { RiMotorbikeFill } from "react-icons/ri";

const Sidebar = () => {
  const { dbUserEmail, dbUserName, logOut, dbUserRole } =
    useContext(AuthContext);
  return (
    <nav className="bg-[#178783] h-screen fixed top-0 right-0 min-w-[260px] py-6 px-4 flex flex-col overflow-auto z-40">
      {/* Profile Section */}
      <div className="flex flex-wrap flex-col justify-center items-center cursor-pointer">
        <p className="bg-gray-300 w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-xl">
          <FaUserCircle className="w-28 h-28" />
        </p>

        <div className="text-center mt-2">
          <p className="text-base text-white">{dbUserName}</p>
          <p className="text-xs text-gray-300 mt-0.5">{dbUserEmail}</p>
        </div>
      </div>

      <hr className="my-6 border-gray-400" />

      {/* Navigation Items */}
      <ul className="space-y-3 flex-1">
        <li>
          <Link
            Link
            to={dbUserRole === 1 ? "/bus-ticket" : "/bus-ticket-driver"}
            className="text-gray-300 text-sm flex items-center hover:bg-white hover:text-[#178783] rounded px-4 py-3 transition-all"
          >
            <IoTicketOutline className="w-[18px] h-[18px] mr-4" />
            <span>Bus Ticket</span>
          </Link>
        </li>
        <li>
          <Link
            to={dbUserRole === 1 ? "/reserve-trip" : "/driver-reserve"}
            className="text-gray-300  text-sm flex items-center hover:bg-white hover:text-[#178783] rounded px-4 py-3 transition-all"
          >
            <IoBookmarksOutline className="w-[18px] h-[18px] mr-4" />
            <span>Reserve</span>
          </Link>
        </li>
        <li>
          <Link
            to={dbUserRole === 1 ? "/parking" : "/view-parking"}
            className="text-gray-300  text-sm flex items-center hover:bg-white hover:text-[#178783] rounded px-4 py-3 transition-all"
          >
            <FaCar className="w-[18px] h-[18px] mr-4" />
            <span>Parking</span>
          </Link>
        </li>
        <li>
          <Link
            to={dbUserRole === 1 ? "/share-ride" : "/driver-portal"}
            className="text-gray-300  text-sm flex items-center hover:bg-white hover:text-[#178783] rounded px-4 py-3 transition-all"
          >
            <RiMotorbikeFill className="w-[18px] h-[18px] mr-4" />
            <span>Ride Share</span>
          </Link>
        </li>
        <li>
          <Link
            to={'/emergency-services'}
            className="text-gray-300  text-sm flex items-center hover:bg-white hover:text-[#178783] rounded px-4 py-3 transition-all"
          >
            <FaAmbulance className="w-[18px] h-[18px] mr-4" />
            <span>Emergency</span>
          </Link>
        </li>
        <li>
          <div
            onClick={logOut}
            className="text-gray-300  text-sm flex items-center hover:bg-white hover:text-[#178783] rounded px-4 py-3 transition-all"
          >
            <IoMdLogOut className="w-[18px] h-[18px] mr-4" />
            <span>Logout</span>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
