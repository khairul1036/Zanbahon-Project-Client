import React from "react";
import logo from "../assets/zanbahonlogo.png";
import { Link, NavLink } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";

const Header = () => {
  const links = (
    <>
      <li>
        <NavLink to={`/`}>Home</NavLink>
      </li>
      <li>Services</li>
      <li>History</li>
      <li>Offers</li>
      <li>Modes</li>
    </>
  );
  return (
    <>
      <nav>
        <div className="">
          <div className="navbar bg-[#178783]">
            <div className="navbar md:flex hidden max-w-screen-xl mx-auto">
              <div className="navbar-start">
                <div>
                  <img src={logo} alt="Zanbahon Logo" className="w-40" />
                </div>
              </div>

              {/* desktop navbar links */}
              {/* <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 space-x-10 font-bold text-white">
                  {links}
                </ul>
              </div> */}

              <div className="navbar-end space-x-5 ">
                <div className="dropdown dropdown-end">
                  <div
                    tabindex="0"
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      />
                    </div>
                  </div>
                  <ul
                    tabindex="0"
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                  >
                    <li>
                      <a className="justify-between">
                        {" "}
                        Profile <span className="badge">New</span>
                      </a>
                    </li>
                    <li>
                      <a>Settings</a>
                    </li>
                    <li>
                      <a>Logout</a>
                    </li>
                  </ul>
                </div>
                <a className="btn">Login</a>
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
          <Link to={"/auth/login"}>
            <div className="flex flex-col items-center space-y-1">
              <i className="fa-solid fa-th-large text-lg"></i>
              <p className="text-xs">Services</p>
            </div>
          </Link>
          <div className="flex flex-col items-center space-y-1">
            <i className="fa-solid fa-clock text-lg"></i>
            <p className="text-xs">History</p>
          </div>
          <Link to={"/"}>
            <div className="flex flex-col items-center space-y-1">
              <IoHomeOutline className="text-4xl" />
              <p className="text-xs">Home</p>
            </div>
          </Link>
          <div className="flex flex-col items-center space-y-1">
            <i className="fa-solid fa-percent text-lg"></i>
            <p className="text-xs">Offers</p>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <i className="fa-solid fa-layer-group text-lg"></i>
            <p className="text-xs">Modes</p>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
