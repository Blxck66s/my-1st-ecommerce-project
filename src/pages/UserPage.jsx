import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { AuthContext } from "../contexts/AuthContext";

function UserPage() {
  // const user = useSelector((state) => state.auth.user);
  const { user } = useContext(AuthContext);
  const mode = useSelector((state) => state.header.mode);
  // const orders = useSelector((state) => state.order.orders);
  console.log(user);
  return (
    <div
      className={` h-[800px] w-full bg-slate-100 dark:bg-slate-600 flex justify-center gap-4 dark:text-white ${
        mode ? "dark" : ""
      }`}
    >
      <div className="flex flex-col justify-center gap-6 my-4 w-full items-center ">
        <div className="shadow-2xl h-[110px] w-[800px] min-w-[250px] rounded-2xl">
          <br />
          <div className="mb-2">ข้อมูลส่วนตัว</div>
          <div className="flex  justify-around m-auto w-[80%]">
            <div className="flex gap-4">
              <span>ชื่อ</span>
              <span>
                {user.firstName} {user.lastName}
              </span>
            </div>
            <div className="flex gap-4">
              <span>อีเมล</span>
              <span>{user.email}</span>
            </div>
            <div className="flex gap-4">
              <span>เบอร์</span>
              <span>{user.mobile}</span>
            </div>
          </div>
        </div>
        <div className="shadow-2xl h-[600px] w-[1100px] rounded-2xl">
          <br />
          <div className="mb-3">ออเดอร์ของฉัน</div>
          <div className="w-full flex flex-col gap-2 ">
            <div className="flex justify-around">
              <span>รหัสออเดอร์</span>
              <span>วันที่สั่งซื้อ</span>
              <span>วันที่สิ้นสุดการชำระเงิน</span>
              <span>เวลาการสั่งซื้อ</span>
              <span>การจัดส่งสินค้า</span>
              <span>สถานะการชำระ</span>
              <span>สถานะออเดอร์</span>
              <span>รายละเอียดออเดอร์</span>
            </div>
            <div className="flex justify-around">
              <span>4</span>
              <span>4/1/2023</span>
              <span>6/1/2023</span>
              <span>0:01</span>
              <span>EMS</span>
              <span>ยืนยันแล้ว</span>
              <span>จัดส่งแล้ว</span>
              <span>ดูเพิ่มเติม</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
