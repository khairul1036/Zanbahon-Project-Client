import React from 'react';
import { FaUserCircle } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { FaCar } from "react-icons/fa";
import { MdHistory } from "react-icons/md";
import { MdAssignmentAdd } from "react-icons/md";


const Sidebar = () => {
  return (
    <nav className="bg-[#178783] h-screen fixed top-0 right-0 min-w-[260px] py-6 px-4 flex flex-col overflow-auto">
      {/* Profile Section */}
      <div className="flex flex-wrap flex-col justify-center items-center cursor-pointer">
        <p className="bg-gray-300 w-12 h-12 rounded-full flex items-center justify-center font-bold text-black text-xl">
          S
        </p>

        <div className="text-center mt-2">
          <p className="text-base text-white">John Doe</p>
          <p className="text-xs text-gray-300 mt-0.5">johndoe23@gmail.com</p>
        </div>
      </div>

      <hr className="my-6 border-gray-400" />

      {/* Navigation Items */}
      <ul className="space-y-3 flex-1">
        <li>
          <a
            href="#"
            className="text-gray-300 text-sm flex items-center hover:bg-white hover:text-[#178783] rounded px-4 py-3 transition-all"
          >
            <MdAssignmentAdd className="w-[18px] h-[18px] mr-4" />
            <span>User Request</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="text-gray-300  text-sm flex items-center hover:bg-white hover:text-[#178783] rounded px-4 py-3 transition-all"
          >
            <MdHistory className="w-[18px] h-[18px] mr-4" />
            <span>History</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="text-gray-300  text-sm flex items-center hover:bg-white hover:text-[#178783] rounded px-4 py-3 transition-all"
          >
            <FaCar className="w-[18px] h-[18px] mr-4" />
            <span>Vehicle</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="text-gray-300  text-sm flex items-center hover:bg-white hover:text-[#178783] rounded px-4 py-3 transition-all"
          >
            <FaUserCircle className="w-[18px] h-[18px] mr-4" />
            <span>Profile</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="text-gray-300  text-sm flex items-center hover:bg-white hover:text-[#178783] rounded px-4 py-3 transition-all"
          >
            <IoMdLogOut className="w-[18px] h-[18px] mr-4" />
            <span>Logout</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
