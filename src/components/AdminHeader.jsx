import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../contexts/AuthContext";
import { modeSwitcher } from "../stores/headerSlice";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import logoLight from "../public/LogoLight.png";
import logoDark from "../public/LogoDark.png";
import { NavLink } from "react-router-dom";
import AdminLogout from "../pages/Admins/AdminLogout";

function AdminHeader() {
  const { user } = useContext(AuthContext);
  const mode = useSelector((state) => state.header.mode);
  const dispatch = useDispatch();
  const modeFn = () => dispatch(modeSwitcher(!mode));

  return (
    <div
      className={`${
        mode ? "dark" : ""
      } flex flex-col justify-between h-screen min-w-[280px]  dark:bg-slate-800  dark:text-slate-100 text-gray-400 font-medium`}
    >
      <div className="flex flex-col h-3/4 justify-around">
        <div className="flex  w-full justify-center">
          <i className="ml-4 mr-4">
            <img
              src={mode ? logoDark : logoLight}
              alt="logolight"
              width="150px"
            />
          </i>
        </div>
        <div className="flex  w-full justify-center">
          <button onClick={modeFn}>
            {mode ? (
              <MoonIcon className="BtnHover h-9 w-9 text-slate-100" />
            ) : (
              <SunIcon className="BtnHover h-9 w-9 text-slate-700" />
            )}
          </button>
        </div>
        <div className="flex  w-full justify-center">
          <div className="flex flex-col items-center justify-between text-md h-48">
            <NavLink
              end
              to="/admin"
              className={` p-4 BtnHover ${({ isActive }) =>
                isActive ? "active" : ""}`}
            >
              แดชบอร์ด
            </NavLink>
            <NavLink
              to="/admin/order"
              className={`p-4 BtnHover ${({ isActive }) =>
                isActive ? "active" : ""}`}
            >
              ออเดอร์
            </NavLink>
            <NavLink
              to="/admin/product"
              className={`p-4 BtnHover ${({ isActive }) =>
                isActive ? "active" : ""}`}
            >
              สินค้า
            </NavLink>
          </div>
        </div>
        {user ? <AdminLogout /> : <div></div>}
        <div></div>
      </div>
    </div>
  );
}

export default AdminHeader;
