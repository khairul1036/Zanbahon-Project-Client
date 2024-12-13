import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import AuthLayout from "../layouts/AuthLayout";
import PrivateRouter from "./PrivateRouter";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddVehicle from "../pages/AddVehicle";
import ShareRide from "../pages/ShareRide";
import NotificationUser from "../components/NotificationUser";
import NotificationComponent from "../components/NotificationComponent";
import EmergencyServices from "../components/EmergencyOption";
import Vehicle from "../pages/Vehicle";
import AllServices from "../pages/AllServices";
import DriverRideSharePortal from "../pages/DriverRideSharePortal";
import Payment from "../pages/Payment";
import BookTrip from "../pages/BookTrip";
import DriverBookTrip from "../pages/DriverBookTrip";
import Parking from "../pages/Parking";
import CreateParking from "../pages/CreateParking";
import ParkingOwner from "../pages/ParkingOwner";
import ViewAllParking from "../pages/ViewAllParking";
import ParkingHistory from "../pages/ParkingHistory";
import BusTicketSeat from "../pages/BusTicketSeat";
import BusTicketDriver from "../pages/BusTicketDriver";
import ViewTickets from "../pages/ViewTickets";
import BloodCenter from "../components/bloodCenter";
import ForgotPassword from "../pages/ForgotPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRouter>
        <HomeLayout></HomeLayout>
      </PrivateRouter>
    ),
    loader:() => ``
  },
  {
    path: "/auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "/auth/login",
        element: <Login></Login>,
      },
      {
        path: "/auth/register",
        element: <Register></Register>,
      },
      {
        path: "/auth/forgot-password",
        element: <ForgotPassword></ForgotPassword>,
      },
    ],
  },
  {
    path: "/emergency-services",
    element: <PrivateRouter><EmergencyServices></EmergencyServices></PrivateRouter>,
  },
  {
    path: "/add-vehicle",
    element: <PrivateRouter><AddVehicle></AddVehicle></PrivateRouter>,
  },
  {
    path: "/share-ride",
    element: <PrivateRouter><ShareRide></ShareRide></PrivateRouter>,
  },
  {
    path: "/not-user",
    element: <NotificationUser></NotificationUser>,
  },
  {
    path: "/not-driver",
    element: <NotificationComponent></NotificationComponent>,
  },
  {
    path: "/vehicle",
    element: <Vehicle></Vehicle>,
  },
  {
    path: "/all-service",
    element: <PrivateRouter><AllServices></AllServices></PrivateRouter>,
  },
  {
    path: "/driver-portal",
    element: <PrivateRouter><DriverRideSharePortal></DriverRideSharePortal></PrivateRouter>,
  },
  {
    path: "/driver-reserve",
    element: <PrivateRouter><DriverBookTrip></DriverBookTrip></PrivateRouter>,
  },
  {
    path: "/payment",
    element: <PrivateRouter><Payment></Payment></PrivateRouter>,
  },
  {
    path: "/reserve-trip",
    element: <PrivateRouter><BookTrip></BookTrip></PrivateRouter>,
  },
  {
    path: "/parking",
    element: <PrivateRouter><Parking></Parking></PrivateRouter>,
  },
  {
    path: "/create-parking",
    element: <PrivateRouter><CreateParking></CreateParking></PrivateRouter>,
  },
  {
    path: "/parking-owner",
    element: <PrivateRouter><ParkingOwner></ParkingOwner></PrivateRouter>,
  },
  {
    path: "/view-parking",
    element: <PrivateRouter><ViewAllParking></ViewAllParking></PrivateRouter>,
  },
  {
    path: "/history-parking",
    element: <PrivateRouter><ParkingHistory></ParkingHistory></PrivateRouter>,
  },
  {
    path: "/bus-ticket",
    element: <PrivateRouter><BusTicketSeat></BusTicketSeat></PrivateRouter>,
  },
  {
    path: "/bus-ticket-driver",
    element: <PrivateRouter><BusTicketDriver></BusTicketDriver></PrivateRouter>,
  },
  {
    path: "/view-tickets",
    element: <PrivateRouter><ViewTickets></ViewTickets></PrivateRouter>,
  },
  {
    path: "/bloodCenter",
    element: <PrivateRouter><BloodCenter></BloodCenter></PrivateRouter>
  },
]);

export default router;
