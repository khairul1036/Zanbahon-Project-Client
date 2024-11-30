import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const AuthLayout = () => {
  return (
    <>
      {/* <header>
        <Header></Header>
      </header> */}
      <main>
        <Outlet></Outlet>
      </main>
      <footer></footer>
    </>
  );
};

export default AuthLayout;
