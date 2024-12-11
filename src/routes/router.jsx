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
    path: "/payment",
    element: <PrivateRouter><Payment></Payment></PrivateRouter>,
  },
]);

export default router;
