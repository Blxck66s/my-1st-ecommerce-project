import { Navigate, Route, Routes } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";

import React, { useContext } from "react";
import Home from "../pages/Home";
import Payment from "../pages/Payment";
import Shopping from "../pages/Shopping";
import UserPage from "../pages/UserPage";
import { AuthContext } from "../contexts/AuthContext";

function Router() {
  const { user } = useContext(AuthContext);
  return (
    <Routes>
      {user ? (
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
