import { Navigate, Route, Routes } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";

import React from "react";
import Home from "../pages/Home";
import Payment from "../pages/Payment";
import Shopping from "../pages/Shopping";
import UserPage from "../pages/UserPage";
import { useSelector } from "react-redux";

function Router() {
  const isLogged = useSelector((state) => state.auth.isLogged);
  return (
    <Routes>
      {isLogged ? (
        <Route path="/" element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/Shopping" element={<Shopping />} />
          <Route path="/Payment" element={<Payment />} />
          <Route path="/Profile" element={<UserPage />} />
        </Route>
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
