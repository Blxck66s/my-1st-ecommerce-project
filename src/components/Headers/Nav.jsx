import React from "react";
import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <div className="flex items-center text-lg">
      <NavLink
        end
        to="/"
        className={` p-7 BtnHover ${({ isActive }) =>
          isActive ? "active" : ""}`}
      >
        หน้าหลัก
      </NavLink>
      <NavLink
        to="/shopping"
        className={`p-7 BtnHover ${({ isActive }) =>
          isActive ? "active" : ""}`}
      >
        สินค้า
      </NavLink>
      <NavLink
        to="/payment"
        className={`p-7 BtnHover ${({ isActive }) =>
          isActive ? "active" : ""}`}
      >
        แจ้งชำระเงิน
      </NavLink>
      <button></button>
    </div>
  );
}

export default Nav;
