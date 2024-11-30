import React, { useContext } from "react";
import Header from "../components/Header";
import busTicket from "../assets/ticket 1.png";
import reserve from "../assets/researve.png";
import Parking from "../assets/parking 1.png";
import carRental from "../assets/car-rent 1.png";
import emergency from "../assets/emergency.png";
import more from "../assets/application 1.png";
import { AuthContext } from "../provider/AuthProvider";

const HomeLayout = () => {

    const {user} = useContext(AuthContext)

  return (
    <>
      <header>
        <Header></Header>
      </header>
      <main>
        <div className="md:hidden flex px-8 items-center bg-[#118480]">
          <div className="flex items-center gap-3 py-5">
            <div className="avatar">
              <div className="mask h-12 w-12">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="Avatar Tailwind CSS Component"
                />
              </div>
            </div>
            <div>
              <div className="font-bold text-white">MD ADNAN MAHMUD</div>
              <div className="text-base opacity-50 text-white">User</div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="grid md:grid-cols-6 grid-cols-3 gap-6 p-6 max-w-screen-xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 mb-2">
                <img
                  src={busTicket}
                  alt="Bus Ticket"
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="text-xs font-semibold text-gray-700">Bus Ticket</div>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-14 h-14 mb-2">
                <img
                  src={reserve}
                  alt="Reserve"
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="text-xs font-semibold text-gray-700">Reserve</div>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-14 h-14 mb-2">
                <img
                  src={Parking}
                  alt="Parking"
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="text-xs font-semibold text-gray-700">Parking</div>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-14 h-14 mb-2">
                <img
                  src={carRental}
                  alt="Car Rental"
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="text-xs font-semibold text-gray-700">Car Rental</div>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-14 h-14 mb-2">
                <img
                  src={emergency}
                  alt="Emergency"
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="text-xs font-semibold text-gray-700">Emergency</div>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-14 h-14 mb-2">
                <img
                  src={more}
                  alt="More"
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="text-xs font-semibold text-gray-700">More</div>
            </div>
          </div>
        </div>
      </main>
      <footer></footer>
    </>
  );
};

export default HomeLayout;
