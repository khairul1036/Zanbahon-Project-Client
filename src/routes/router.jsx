import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import AuthLayout from "../layouts/AuthLayout";
import PrivateRouter from "./PrivateRouter";
import Login from "../pages/Login";
import Register from "../pages/Register";

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
]);

export default router;
