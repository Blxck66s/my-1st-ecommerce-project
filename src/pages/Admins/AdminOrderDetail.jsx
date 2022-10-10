import React, { useContext, useEffect, useState } from "react";
import DateAgo from "../../utils/DateAgo";
import moment from "moment";
import noImage from "../../public/no-image.svg";
import { orderContext } from "../../contexts/orderContext";
import { useDispatch, useSelector } from "react-redux";
import { modalSwitcher } from "../../stores/modalSlice";
import BtnLoading from "../../utils/BtnLoading";

function AdminOrderDetail({
  order,
  orderPC,
  orderStatus,
  paymentStatus,
  orderTrackingNumber,
}) {
  const { deleteOrderById, updateOrderById } = useContext(orderContext);
  const modal = useSelector((state) => state.modal.modalActive);
  const [SorderStatus, setOrderStatus] = useState(orderStatus);
  const [SpaymentStatus, setPaymentStatus] = useState(paymentStatus);
  const [SorderTrackingNumber, setOrderTrackingNumber] =
    useState(orderTrackingNumber);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const purchaseDate = order.createdAt
    .slice(0, 10)
    .split("-")
    .reverse()
    .join("/");
  const timeSplit =
    +order.createdAt.slice(11, 13) + 7 + "" + order.createdAt.slice(13, 16);
  const date = new Date(order.createdAt);
  date.setDate(date.getDate() + 2);
  const deadline = DateAgo(date);
  const now = Date.now();

  const formatter = new Intl.NumberFormat("en", {
    style: "currency",
    currency: "THB",
  });

  useEffect(() => {
    setOrderStatus(orderStatus);
    setPaymentStatus(paymentStatus);
    setOrderTrackingNumber(orderTrackingNumber);
  }, [orderStatus, paymentStatus, orderTrackingNumber]);

  const handleUpdate = async () => {
    try {
      setLoading(true);

      await updateOrderById(order.id, {
        orderStatus: SorderStatus,
        paymentStatus: SpaymentStatus,
        orderTrackingNumber: SorderTrackingNumber,
      }).then(() => dispatch(modalSwitcher(false)));
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handlDelete = async () => {
    try {
      setLoading(true);

      await deleteOrderById(order.id).then(() =>
        dispatch(modalSwitcher(false))
      );
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-fit w-[1000px] m-8">
      <div className="flex flex-col justify-center">
        <div className="grid grid-cols-8 gap-2 border-b-2 mb-3">
          <div>ผู้สั่งซื้อ</div>
          <div>เบอร์ผู้สั่งซื้อ</div>
          <div>วันที่สั่งซื้อ</div>
          <div>
            วันที่สิ้นสุด
            <br />
            การชำระเงิน
          </div>
          <div>เวลาการสั่งซื้อ</div>
          <div>ยอดทั้งหมด</div>
          <div>สถานะการชำระ</div>
          <div>สถานะออเดอร์</div>
        </div>
        <div className="grid grid-cols-8 gap-2 border-b-2">
          <div>{order.User.firstName}</div>
          <div>{order.User.mobile}</div>
          <div>{purchaseDate}</div>
          <div
            className={
              moment(date).isAfter(now) ? "text-green-400" : "text-red-400"
            }
          >
            {deadline}
          </div>
          <div>{timeSplit}</div>
          <div>{formatter.format(order.orderTotal)}</div>

          <div
            className={
              order.PaymentConfirmation?.paymentStatus === "PENDING"
                ? "text-yellow-400"
                : order.PaymentConfirmation?.paymentStatus === "APPROVED"
                ? "text-green-400"
                : order.PaymentConfirmation?.paymentStatus === "DENIED"
                ? "text-red-400"
                : ""
            }
          >
            {order.PaymentConfirmation?.paymentStatus || "รอแจ้งชำระ"}
          </div>
          <div
            className={
              order.orderStatus === "PENDING"
                ? "text-yellow-400"
                : order.orderStatus === "SUCCESS"
                ? "text-green-400"
                : order.orderStatus === "CANCELED"
                ? "text-red-400"
                : ""
            }
          >
            {order.orderStatus}
          </div>
        </div>
        <br />
        <div className="flex text-2xl">รายละเอียดที่อยู่ในการจัดส่ง</div>
        <br />

        <div className="grid grid-cols-8 gap-2 border-b-2 mb-3">
          <div>ชื่อ-นามสกุลผู้รับ</div>
          <div>เบอร์ติดต่อ</div>
          <div>บ้านเลขที่/ถนน/ซอย ฯ</div>
          <div>แขวง/ตำบล</div>
          <div>เขต/อำเภอ</div>
          <div>เลขไปรษณีย์</div>
          <div>จังหวัด</div>
          <div>วิธีการจัดส่ง</div>
        </div>
        <div className="grid grid-cols-8 gap-2 border-b-2">
          <div>{order.receiverName}</div>
          <div>{order.receiverPhone}</div>
          <div>{order.detailedAddress}</div>
          <div>{order.subDistrict}</div>
          <div>{order.district}</div>
          <div>{order.postalCode}</div>
          <div> {order.province}</div>
          <div>{order.trackingNumber || "-"}</div>
        </div>

        <div className="flex justify-around gap-20">
          <div>
            <br />
            <div className="flex text-2xl">รายละเอียดการแจ้งชำระเงิน</div>
            <br />
            <div className="flex  gap-10">
              <div className="h-[400px] w-[250px] overflow-auto">
                <img src={orderPC?.slipImage || noImage} alt="slipimage" />
              </div>

              <div className="grid grid-rows-8 gap-2 ">
                <div>ชื่อ-นามสกุลผู้โอน</div>
                <div>
                  {orderPC?.payeeFirstName || "-"}{" "}
                  {orderPC?.payeeLastName || "-"}
                </div>
                <div>ยอดที่โอน</div>
                <div>{orderPC?.payAmount || "-"}</div>
                <div>วันที่โอน</div>
                <div>{orderPC?.PayDate || "-"}</div>
                <div>เวลาที่โอน</div>
                <div>{orderPC?.PayTime || "-"}</div>
              </div>
            </div>
          </div>
          <div>
            <br />
            <div className="flex text-2xl justify-center">
              สินค้าที่สั่งซื้อ
            </div>
            <br />
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div>ชื่อสินค้า</div>
              <div>จำนวน</div>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {order.OrderItems.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="grid grid-cols-2 gap-2 border-b-2"
                  >
                    <div>{item.Product.productName}</div>
                    <div>{item.amount}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-2 ">
            <div className="flex justify-center text-2xl mt-6">
              อัพเดทออเดอร์
            </div>
            <div className="flex justify-center text-lg mt-4">สถานะการชำระ</div>
            <div className="flex justify-center text-base w-full">
              <select
                name=""
                id=""
                className="w-36 h-10 px-2 rounded-lg border dark:bg-slate-800"
                value={SpaymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
              >
                <option value="WAITING">WAITING</option>
                <option value="PENDING">PENDING</option>
                <option value="APPROVED">APPROVED</option>
                <option value="DENIED">DENIED</option>
              </select>
            </div>
            <div className="flex justify-center text-lg mt-4">สถานะออเดอร์</div>
            <div className="flex justify-center text-base w-full">
              <select
                name=""
                id=""
                className="w-36 h-10 px-2 rounded-lg border dark:bg-slate-800"
                value={SorderStatus}
                onChange={(e) => setOrderStatus(e.target.value)}
              >
                <option value="PENDING">PENDING</option>
                <option value="SUCCESS">SUCCESS</option>
              </select>
            </div>
            <div className="flex justify-center text-lg mt-4">เลข Tracking</div>
            <div className="flex justify-center text-base w-full">
              <input
                className="w-36 h-10 px-2 rounded-lg border dark:bg-slate-800"
                value={SorderTrackingNumber}
                onChange={(e) => setOrderTrackingNumber(e.target.value)}
              />
            </div>

            <button
              className="text-base NavAuth BtnHover w-22 h-10 hover:bg-blue-600 hover:text-slate-100 text-blue-600"
              onClick={handleUpdate}
            >
              {loading ? <BtnLoading /> : "อัพเดทออเดอร์"}
            </button>
            <button
              className="text-base NavAuth BtnHover w-22 h-10 mt-4 hover:bg-red-600 hover:text-slate-100 text-red-600"
              onClick={handlDelete}
            >
              {loading ? <BtnLoading /> : "ลบออเดอร์"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminOrderDetail;
