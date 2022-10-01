import { Route, Routes } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";

import React from "react";
import Home from "../pages/Home";
import Payment from "../pages/Payment";
import Shopping from "../pages/Shopping";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/Shopping" element={<Shopping />} />
        <Route path="/Payment" element={<Payment />} />
      </Route>
    </Routes>
  );
}

export default Router;
