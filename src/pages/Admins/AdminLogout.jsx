import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

function AdminLogout() {
  const { logout } = useContext(AuthContext);
  return (
    <div className="flex flex-col ">
      <div>
        <button
          className=" BtnHover  hover:text-blue-600 "
          value="ออกจากระบบ"
          onClick={() => logout()}
        >
          ออกจากระบบ
        </button>
      </div>
    </div>
  );
}

export default AdminLogout;
