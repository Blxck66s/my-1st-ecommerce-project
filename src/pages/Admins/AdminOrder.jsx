import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../components/ui/Modal";
import { orderContext } from "../../contexts/orderContext";
import DateAgo from "../../utils/DateAgo";
import moment from "moment";
import AdminOrderDetail from "./AdminOrderDetail";
import { modalSwitcher } from "../../stores/modalSlice";
import Loading from "../../utils/Loading";

function AdminOrder() {
  const mode = useSelector((state) => state.header.mode);
  const modal = useSelector((state) => state.modal.modalActive);
  const [loading, setLoading] = useState(true);
  const { getorderss, getOrderPaymentConfirmByOrderId, getOrderById } =
    useContext(orderContext);
  const [orders, setOrders] = useState(null);
  const [order, setOrder] = useState(null);
  const [orderPC, setOrderPC] = useState(null);
  const [clickedOrder, setClickedOrder] = useState(null);

  const [orderStatus, setOrderStatus] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [orderTrackingNumber, setOrderTrackingNumber] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getorderss();
        setOrders(res);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [modal]);

  const dispatch = useDispatch();
  const openModalFn = async (e) => {
    setClickedOrder(e.target.id);
    await getOrderPaymentConfirmByOrderId(e.target.id).then((res) => {
      setOrderPC(res);
      setPaymentStatus(res?.paymentStatus || "WAITING");
    });
    await getOrderById(e.target.id)
      .then((res) => {
        setOrder(res);
        setOrderStatus(res.orderStatus);
        setOrderTrackingNumber(res.orderTrackingNumber || "");
      })
      .then(() => dispatch(modalSwitcher(true)));
  };

  if (loading) return <Loading />;
  return (
    <div
      className={` ${
        mode ? "dark" : ""
      } h-screen w-screen dark:bg-slate-800 dark:text-slate-100`}
    >
      <div className="flex flex-col justify-center gap-10 mx-auto mt-32  w-[1400px]">
        <div className="flex h-[900px] shadow-2xl rounded-2xl ">
          <div className="w-full flex flex-col gap-2  overflow-auto  ">
            <div className="grid grid-cols-8 gap-2 mt-4">
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
                {order && (
                  <AdminOrderDetail
                    order={order}
                    orderPC={orderPC}
                    orderStatus={orderStatus}
                    paymentStatus={paymentStatus}
                    orderTrackingNumber={orderTrackingNumber}
                  />
                )}
              </Modal>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminOrder;
