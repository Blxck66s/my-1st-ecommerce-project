import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminHeader from "../components/AdminHeader";

function AdminLayout() {
  const mode = useSelector((state) => state.header.mode);

  return (
    <div className={mode ? "dark" : ""}>
      <div className="flex w-screen h-screen">
        <AdminHeader />
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
