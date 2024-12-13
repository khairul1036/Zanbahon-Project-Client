import React, { useContext } from "react";
import Header from "../components/Header";
import busTicket from "../assets/ticket 1.png";
import reserve from "../assets/researve.png";
import Parking from "../assets/parking 1.png";
import carRental from "../assets/car-rent 1.png";
import emergency from "../assets/emergency.png";
import addCar from "../assets/addcar.png";
import more from "../assets/application 1.png";
import { AuthContext } from "../provider/AuthProvider";
import { Link } from "react-router-dom";
import logo from "../assets/transport.jpg";

const HomeLayout = () => {
  const { dbUserRole } = useContext(AuthContext);

  return (
    <>
      <header>
        <Header />
      </header>
      <div className="font-sans max-w-6xl max-md:max-w-md mx-auto">
        <div className="grid md:grid-cols-2 items-center md:gap-8 gap-6">
          <div className="max-md:order-1 max-md:text-center relative">
            <h2 className="text-gray-800 lg:text-6xl md:text-5xl text-3xl font-extrabold mb-4 md:!leading-[56px]">
              <span className="text-[#178783]">Smart</span> Transport with{" "}
              <span className="text-[#178783]">Smart</span> People
            </h2>
            <p className="text-gray-600 mt-6 text-base leading-relaxed px-5">
              Zanbahon is a dynamic web project for efficient event management,
              featuring user-friendly interfaces, real-time updates, and
              seamless functionality.
            </p>
          </div>
          <div className="lg:h-[550px] md:h-[550px] flex flex-col justify-center relative max-md:before:hidden before:absolute before:h-[120%] before:w-[120%] before:right-0 before:z-0">
            <img
              src={logo}
              className="rounded-md lg:w-4/5"
              alt="Dining Experience"
            />
          </div>
        </div>
      </div>
      <main className="mb-20">
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="grid lg:grid-cols-3 grid-cols-2 gap-6">
              {/* Bus Ticket (Role-based) */}
              {dbUserRole === 1 ? (
                <>
                  <Link to={`/bus-ticket`}>
                    <div className="flex flex-col items-center p-6  rounded-lg border-gray-100 border-[2px] hover:border-[#178783] transition-all">
                      <div className="flex flex-col items-center">
                        <div className="w-14 h-16 mb-2">
                          <img
                            src={busTicket}
                            alt="Bus Ticket"
                            className="object-contain w-full h-full"
                          />
                        </div>
                        <div className="text-xs font-semibold text-gray-700">
                          Bus Ticket
                        </div>
                      </div>
                    </div>
                  </Link>
                </>
              ) : (
                <>
                  <Link to={`/bus-ticket-driver`}>
                    <div className="flex flex-col items-center p-6  rounded-lg border-gray-100 border-[2px] hover:border-[#178783] transition-all">
                      <div className="flex flex-col items-center">
                        <div className="w-14 h-14 mb-2">
                          <img
                            src={busTicket}
                            alt="Bus Ticket"
                            className="object-contain w-full h-full"
                          />
                        </div>
                        <div className="text-xs font-semibold text-gray-700">
                          Bus Ticket
                        </div>
                      </div>
                    </div>
                  </Link>
                </>
              )}

              {/* Reserve (Role-based) */}
              <Link to={dbUserRole === 1 ? "/reserve-trip" : "/driver-reserve"}>
                <div className="flex flex-col items-center p-6  rounded-lg border-gray-100 border-[2px] hover:border-[#178783] transition-all">
                  <div className="w-14 h-14 mb-2">
                    <img
                      src={reserve}
                      alt="Reserve"
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <h3 className="text-base mb-2 text-gray-700">Reserve</h3>
                </div>
              </Link>

              {/* Parking (Role-based) */}
              <Link to={dbUserRole === 1 ? "/parking" : "/view-parking"}>
                <div className="flex flex-col items-center p-6  rounded-lg border-gray-100 border-[2px] hover:border-[#178783] transition-all">
                  <div className="w-14 h-14 mb-2">
                    <img
                      src={Parking}
                      alt="Parking"
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <h3 className="text-base mb-2 text-gray-700">Parking</h3>
                </div>
              </Link>

              {/* Share Ride (Role-based) */}
              <Link to={dbUserRole === 1 ? "/share-ride" : "/driver-portal"}>
                <div className="flex flex-col items-center p-6  rounded-lg border-gray-100 border-[2px] hover:border-[#178783] transition-all">
                  <div className="w-14 h-14 mb-2">
                    <img
                      src={carRental}
                      alt="Share Ride"
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <h3 className="text-base mb-2 text-gray-700">Share Ride</h3>
                </div>
              </Link>

              {/* Emergency Services */}
              <Link to="/emergency-services">
                <div className="flex flex-col items-center p-6  rounded-lg border-gray-100 border-[2px] hover:border-[#178783] transition-all">
                  <div className="w-14 h-14 mb-2">
                    <img
                      src={emergency}
                      alt="Emergency"
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <h3 className="text-base mb-2 text-gray-700">Emergency</h3>
                </div>
              </Link>

              {/* Add Vehicle */}
              <Link to="/add-vehicle">
                <div className="flex flex-col items-center p-6  rounded-lg border-gray-100 border-[2px] hover:border-[#178783] transition-all">
                  <div className="w-14 h-14 mb-2">
                    <img
                      src={addCar}
                      alt="Add Vehicle"
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <h3 className="text-base mb-2 text-gray-700">Add Vehicle</h3>
                </div>
              </Link>

              {/* More */}
              <div className="flex flex-col items-center p-6  rounded-lg border-gray-100 border-[2px] hover:border-[#178783] transition-all">
                <div className="w-14 h-14 mb-2">
                  <img
                    src={more}
                    alt="More"
                    className="object-contain w-full h-full"
                  />
                </div>
                <h3 className="text-base mb-2 text-gray-700">More</h3>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer></footer>
    </>
  );
};

export default HomeLayout;
