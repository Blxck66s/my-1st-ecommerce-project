import { Navigate, Route, Routes } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";

import React, { useContext } from "react";
import Home from "../pages/Home";
import Payment from "../pages/Payment";
import Shopping from "../pages/Shopping";
import UserPage from "../pages/UserPage";
import { AuthContext } from "../contexts/AuthContext";
import Order from "../pages/Order";
import AdminLayout from "../layouts/AdminLayout";
import DashBoard from "../pages/Admins/DashBoard";
import AdminOrder from "../pages/Admins/AdminOrder";
import AdminProduct from "../pages/Admins/AdminProduct";

function Router() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      {user ? (
        user.admin ? (
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="/admin" element={<DashBoard />} />
            <Route path="/admin/order" element={<AdminOrder />} />
            <Route path="/admin/product" element={<AdminProduct />} />
          </Route>
        ) : (
          <Route path="/" element={<UserLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/Shopping" element={<Shopping />} />
            <Route path="/Payment" element={<Payment />} />
            <Route path="/Profile" element={<UserPage />} />
            <Route path="/Order/:id" element={<Order />} />
          </Route>
        )
      ) : (
        <Route path="/" element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/Shopping" element={<Shopping />} />
          <Route path="/Payment" element={<Payment />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      )}
    </Routes>
  );
}

export default Router;
