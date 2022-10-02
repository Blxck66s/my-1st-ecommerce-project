import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../stores/authSlice";

function User() {
  const dispatch = useDispatch();

  return (
    <div className="flex mr-20 items-center">
      <button
        className="NavAuth BtnHover  hover:bg-blue-600 hover:text-slate-100"
        value="ข้อมูลของฉัน"
      >
        ข้อมูลของฉัน
      </button>
      <button
        className="NavAuth BtnHover  hover:bg-blue-600 hover:text-slate-100"
        value="ออกจากระบบ"
        onClick={() => dispatch(logout())}
      >
        ออกจากระบบ
      </button>
    </div>
  );
}

export default User;
