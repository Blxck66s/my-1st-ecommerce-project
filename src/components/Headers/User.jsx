import React from "react";
import { useSelector } from "react-redux";

function User() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="flex mr-20 items-center">
      {user.firstName} {user.lastName}
      <button
        className="NavAuth BtnHover  hover:bg-blue-600 hover:text-slate-100"
        value="ออกจากระบบ"
      >
        ออกจากระบบ
      </button>
    </div>
  );
}

export default User;
