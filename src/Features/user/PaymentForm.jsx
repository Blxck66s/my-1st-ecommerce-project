import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import Loading from "../../utils/Loading";
import { useContext } from "react";
import { PayConContext } from "../../contexts/PayConContext";
import BtnLoading from "../../utils/BtnLoading";
import { useNavigate } from "react-router-dom";
function PaymentForm() {
  const mode = useSelector((state) => state.header.mode);
  const [loading, setLoading] = useState(false);
  const { createPayConfirm } = useContext(PayConContext);

  const [orderId, setOrderId] = useState("");
  const [payeeFirstName, setPayeeFirstName] = useState("");
  const [payeeLastName, setPayeeLastName] = useState("");
  const [payDate, setPayDate] = useState("");
  const [payTime, setPayTime] = useState("");
  const [payAmount, setPayAmount] = useState("");

  const [status, setStatus] = useState("");

  const [image, setImage] = useState(null);
  const [orderIdPH, setorderIdPH] = useState("xx");
  const fileEl = useRef();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setStatus("");
      const formData = new FormData();
      if (!orderId.trim()) {
        return setorderIdPH("ต้องระบุรหัสออเดอร์ !");
      }

      orderId && formData.append("orderId", orderId);
      payeeFirstName && formData.append("payeeFirstName", payeeFirstName);
      payeeLastName && formData.append("payeeLastName", payeeLastName);
      payDate && formData.append("payDate", payDate);
      payTime && formData.append("payTime", payTime);
      payAmount && formData.append("payAmount", payAmount);

      if (image) {
        formData.append("slipImage", image);
      }

      setLoading(true);
      await createPayConfirm(formData);

      setImage(null);
      setOrderId("");
      setPayeeFirstName("");
      setPayeeLastName("");
      setPayDate("");
      setPayTime("");
      setPayAmount("");
      setorderIdPH("xx");
      alert("แจ้งชำระสินค้าเรียบร้อยแล้ว ! ตรวจสอบได้ที่รายละเอียดออเดอร์ครับ");
      navigate("/Profile");
    } catch (err) {
      console.log(err);
      console.log(err.response.data.message);
      if (err.response.data.message === "Already Confirmed") {
        setStatus("ออเดอร์นี้ได้รับการยืนยันแล้ว !");
      }
      console.log(err.response.data.message);
      if (
        err.response.data.message ===
        "Cannot add or update a child row: a foreign key constraint fails (`pcforyou`.`payment_confirmations`, CONSTRAINT `payment_confirmations_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT)"
      ) {
        setStatus("รหัสออเดอร์นี้ไม่มีอยู่ในระบบ !");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form>
        <div className={`flex gap-10 ${mode ? "dark" : ""}`}>
          <div className=" h-[500px] w-[600px] flex flex-col items-center justify-around">
            <div className="  text-3xl ">หลักฐานการชำระเงิน</div>
            <div className="flex flex-row ">
              <div className="grid grid-rows-5 gap-[34px] text-xl">
                <div className="flex justify-end">รหัสออเดอร์สินค้า : </div>
                <div className="flex justify-end">ชื่อ-นามสกุลผู้โอน : </div>
                <div className="flex justify-end">วันที่ชำระเงิน : </div>
                <div className="flex justify-end">เวลาที่ชำระเงิน : </div>
                <div className="flex justify-end">จำนวนเงินที่โอน : </div>
              </div>
              <div className="grid grid-rows-5 gap-[34px] ml-2">
                <div className="flex justify-start">
                  <input
                    type="text"
                    placeholder={orderIdPH}
                    className={`border rounded-lg dark:bg-slate-600 dark:placeholder:text-slate-50 ${
                      orderIdPH !== "xx" &&
                      "border-red-500 placeholder:text-red-400 text-center"
                    }`}
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                  />
                </div>
                <div className="flex justify-start gap-[7px]">
                  <input
                    type="text"
                    placeholder=" ชื่อ"
                    className="w-24 border rounded-lg  dark:bg-slate-600 dark:placeholder:text-slate-50 "
                    value={payeeFirstName}
                    onChange={(e) => setPayeeFirstName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder=" นามสกุล"
                    className=" w-24 border rounded-lg dark:bg-slate-600 dark:placeholder:text-slate-50 "
                    value={payeeLastName}
                    onChange={(e) => setPayeeLastName(e.target.value)}
                  />
                </div>
                <div className="flex justify-start">
                  <input
                    type="date"
                    className="border rounded-lg dark:bg-slate-600 dark:placeholder:text-slate-50 "
                    value={payDate}
                    onChange={(e) => setPayDate(e.target.value)}
                  />
                </div>
                <div className="flex justify-start">
                  <input
                    type="time"
                    className="border rounded-lg dark:bg-slate-600 dark:placeholder:text-slate-50 "
                    value={payTime}
                    onChange={(e) => setPayTime(e.target.value)}
                  />
                </div>
                <div className="flex justify-start">
                  <input
                    type="number"
                    placeholder=" xxxx"
                    className="border rounded-lg dark:bg-slate-600 dark:placeholder:text-slate-50 "
                    value={payAmount}
                    onChange={(e) => setPayAmount(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="">
              หมายเหตุ : กรุณาโอนเงินภายใน 2 วัน
              หลังจากกดปุ่มยืนยันการสั่งซื้อสินค้า หากไม่มีการแจ้งการชำระเงิน
              รายการจะถูกยกเลิกโดยแอดมิน
              ลูกค้าจะต้องทำรายการสั่งซื้อใหม่อีกครั้ง
            </div>
          </div>
          <div className=" h-[500px] w-[600px] overflow-auto flex flex-col justify-center gap-4 ">
            <div className="text-3xl ">รูปสลิปโอน</div>
            <div className="flex justify-center   relative ">
              {image ? (
                <>
                  <button
                    type="button"
                    className="h-10 w-10 absolute top-1 right-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      setImage(null);
                      fileEl.current.value = "";
                    }}
                  >
                    <XMarkIcon className="" />
                  </button>

                  <img
                    src={URL.createObjectURL(image)}
                    className="h-full"
                    alt="slipImage"
                  />
                </>
              ) : (
                <div
                  className="flex justify-center place-items-center rounded-xl border p-2 h-40 w-40 hover:bg-gray-100"
                  role="button"
                  onClick={() => fileEl.current.click()}
                >
                  <ArrowUpTrayIcon className="h-10 w-10" />
                </div>
              )}
            </div>
          </div>
          <input
            type="file"
            className="hidden"
            ref={fileEl}
            onChange={(e) => {
              if (e.target.files[0]) {
                setImage(e.target.files[0]);
              }
            }}
          />
        </div>

        <div className="flex flex-col justify-center items-center mt-10">
          {status ? <span className="text-red-400">{status}</span> : ""}
          <button
            className="text-base ml-10 NavAuth BtnHover w-32 h-10 hover:bg-blue-600 hover:text-slate-100 text-blue-600"
            onClick={handleSubmit}
          >
            {loading ? <BtnLoading /> : "ยืนยัน"}
          </button>
        </div>
      </form>
    </>
  );
}

export default PaymentForm;
