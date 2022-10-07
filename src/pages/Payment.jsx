import React from "react";
import { useSelector } from "react-redux";
import PaymentForm from "../Features/user/PaymentForm";

function Payment() {
  const mode = useSelector((state) => state.header.mode);
  return (
    <div
      className={`h-screen dark:bg-slate-700 dark:text-white  ${
        mode ? "dark" : ""
      }`}
    >
      <div className="flex  justify-center">
        <div className="flex flex-col justify-center w-[1200px]  mt-14">
          <div className="text-5xl mb-10">แจ้งชำระสินค้า</div>
          <PaymentForm />
        </div>
      </div>
      <div className=" "></div>
    </div>
  );
}

export default Payment;
