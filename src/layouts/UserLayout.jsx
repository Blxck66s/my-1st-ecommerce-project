import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";

function UserLayout() {
  const mode = useSelector((state) => state.header.mode);

  return (
    <div className={mode ? "dark" : ""}>
      <Header />

      <Outlet />

      <Footer />
    </div>
  );
}

export default UserLayout;
