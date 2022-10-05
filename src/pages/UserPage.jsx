import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../contexts/AuthContext";
import { orderContext } from "../contexts/orderContext";

import moment from "moment";

import DateAgo from "../utils/DateAgo";
import OrderDetail from "../Features/user/OrderDetail";
import { modalSwitcher } from "../stores/modalSlice";
import Modal from "../components/ui/Modal";

function UserPage() {
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const { getOrderById, getOrders, getOrderPaymentConfirmByOrderId } =
    useContext(orderContext);
  const [orders, setOrders] = useState(null);
  const [order, setOrder] = useState(null);
  const [orderPC, setorderPC] = useState(null);
  const modal = useSelector((state) => state.modal.modalActive);
  const mode = useSelector((state) => state.header.mode);
  const [clickedOrder, setClickedOrder] = useState(null);

  const dispatch = useDispatch();
  const openModalFn = async (e) => {
    setClickedOrder(e.target.id);
    await getOrderPaymentConfirmByOrderId(e.target.id).then((res) =>
      setorderPC(res)
    );
    await getOrderById(e.target.id)
      .then((res) => setOrder(res))
      .then(() => dispatch(modalSwitcher(true)));
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getOrders();
        setOrders(res);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) return <div>waiting</div>;
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
            <div className="grid grid-cols-8 gap-2">
              <div>รหัสออเดอร์</div>
              <div>วันที่สั่งซื้อ</div>
              <div>
                วันที่สิ้นสุด
                <br />
                การชำระเงิน
              </div>
              <div>เวลาการสั่งซื้อ</div>
              <div>การจัดส่งสินค้า</div>
              <div>สถานะการชำระ</div>
              <div>สถานะออเดอร์</div>
              <div>
                รายละเอียด
                <br />
                ออเดอร์
              </div>
            </div>
            {orders?.map((item, index) => {
              const purchaseDate = item.createdAt
                .slice(0, 10)
                .split("-")
                .reverse()
                .join("/");

              const timeSplit = item.createdAt.slice(12, 16);

              const date = new Date(item.createdAt);
              date.setDate(date.getDate() + 2);
              const deadline = DateAgo(date);
              const now = Date.now();

              return (
                <div className="grid grid-cols-8 gap-2 border-b" key={index}>
                  <div>{item.id}</div>
                  <div>{purchaseDate}</div>
                  <div
                    className={
                      moment(date).isAfter(now)
                        ? "text-green-400"
                        : "text-red-400"
                    }
                  >
                    {deadline}
                  </div>
                  <div>{timeSplit}</div>
                  <div>{item.sendBy}</div>
                  <div
                    className={
                      item.PaymentConfirmation?.paymentStatus === "PENDING"
                        ? "text-yellow-400"
                        : item.PaymentConfirmation?.paymentStatus === "APPROVED"
                        ? "text-green-400"
                        : item.PaymentConfirmation?.paymentStatus === "DENIED"
                        ? "text-red-400"
                        : ""
                    }
                  >
                    {item.PaymentConfirmation?.paymentStatus || "รอแจ้งชำระ"}
                  </div>
                  <div
                    className={
                      item.orderStatus === "PENDING"
                        ? "text-yellow-400"
                        : item.orderStatus === "SUCCESS"
                        ? "text-green-400"
                        : item.orderStatus === "CANCELED"
                        ? "text-red-400"
                        : ""
                    }
                  >
                    {item.orderStatus}
                  </div>
                  <div
                    onClick={(e) => {
                      openModalFn(e);
                    }}
                    id={item.id}
                    className="cursor-pointer hover:text-blue-500"
                  >
                    ดูเพิ่มเติม
                  </div>
                </div>
              );
            })}
            {modal && (
              <Modal title={`ข้อมูลออเดอร์รหัสเลขที่ ${clickedOrder}`}>
                {order && <OrderDetail order={order} orderPC={orderPC} />}
              </Modal>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
