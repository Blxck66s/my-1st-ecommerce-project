import React from "react";
import { useSelector } from "react-redux";

function AdminOrder() {
  const mode = useSelector((state) => state.header.mode);
  return (
    <div
      className={` ${
        mode ? "dark" : ""
      } h-screen w-screen dark:bg-slate-800 dark:text-slate-100`}
    >
      <div className="flex flex-col justify-center gap-10 mx-auto mt-16 w-[1400px]">
        <div className="flex h-20  shadow-2xl rounded-2xl"></div>
        <div className="flex h-[200px] shadow-2xl rounded-2xl "></div>
        <div className="flex h-[600px] shadow-2xl rounded-2xl "></div>
      </div>
    </div>
  );
}

export default AdminOrder;
