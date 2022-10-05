import DateAgo from "../../utils/DateAgo";
import moment from "moment";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";

function OrderDetail({ order, orderPC }) {
  const { user } = useContext(AuthContext);

  const purchaseDate = order.createdAt
    .slice(0, 10)
    .split("-")
    .reverse()
    .join("/");
  const timeSplit = order.createdAt.slice(12, 16);
  const date = new Date(order.createdAt);
  date.setDate(date.getDate() + 2);
  const deadline = DateAgo(date);
  const now = Date.now();

  const sumProductPrice = order.OrderItems.reduce((sum, item) => {
    return (sum += +item.productPrice);
  }, 0);

  const formatter = new Intl.NumberFormat("en", {
    style: "currency",
    currency: "THB",
  });

  return (
    <div className="h-fit w-[1000px] m-8">
      <div className="flex flex-col justify-center">
        <div className="grid grid-cols-8 gap-2 border-b-2 mb-3">
          <div>ผู้สั่งซื้อ</div>
          <div>วันที่สั่งซื้อ</div>
          <div>
            วันที่สิ้นสุด
            <br />
            การชำระเงิน
          </div>
          <div>เวลาการสั่งซื้อ</div>
          <div>ยอดทั้งหมด</div>
          <div>วิธีการจัดส่ง</div>
          <div>สถานะการชำระ</div>
          <div>สถานะออเดอร์</div>
        </div>
        <div className="grid grid-cols-8 gap-2 border-b-2">
          <div>
            {user.firstName} {user.lastName}
          </div>
          <div>{purchaseDate}</div>
          <div
            className={
              moment(date).isAfter(now) ? "text-green-400" : "text-red-400"
            }
          >
            {deadline}
          </div>
          <div>{timeSplit}</div>
          <div>{formatter.format(sumProductPrice)}</div>
          <div>{order.sendBy}</div>
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
          <div>เลข Tracking</div>
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

        <div className="flex justify-start gap-20">
          <div>
            <br />
            <div className="flex text-2xl">รายละเอียดการแจ้งชำระเงิน</div>
            <br />
            <div className="flex  gap-10">
              <div className="h-[400px] w-[250px] bg-black"></div>

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
                    <div>{item.Product.ProductName}</div>
                    <div>{item.amount}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
