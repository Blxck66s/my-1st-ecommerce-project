import React, { useContext } from "react";

import { NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

function User() {
  const { logout } = useContext(AuthContext);

  return (
    <div className="flex mr-20 items-center">
      <NavLink to="/Profile">
        <button
          className="NavAuth BtnHover  hover:bg-blue-600 hover:text-slate-100"
          value="ข้อมูลของฉัน"
        >
          ข้อมูลของฉัน
        </button>
      </NavLink>
      <button
        className="NavAuth BtnHover  hover:bg-blue-600 hover:text-slate-100"
        value="ออกจากระบบ"
        onClick={() => logout()}
      >
        ออกจากระบบ
      </button>
    </div>
  );
}

export default User;
