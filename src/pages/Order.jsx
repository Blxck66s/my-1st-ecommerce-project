import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import noImage from "../public/no-image.svg";

import { ProductContext } from "../contexts/ProductContext";
import Loading from "../utils/Loading";
import OrderValidation from "../utils/OrderValidation";
import { orderContext } from "../contexts/orderContext";

function Order() {
  const mode = useSelector((state) => state.header.mode);
  const { id } = useParams();
  const { getProductById } = useContext(ProductContext);
  const { createOrder } = useContext(orderContext);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [stock, setStock] = useState(0);
  const [order, setOrder] = useState({
    receiverName: "",
    receiverPhone: "",
    detailedAddress: "",
    subDistrict: "",
    district: "",
    province: "",
    postalCode: "",
    sendBy: "",
    item: id,
    itemAmount: 1,
  });
  const initialValuePH = {
    receiverName: "",
    receiverPhone: "",
    detailedAddress: "",
    subDistrict: "",
    district: "",
    province: "",
    postalCode: "",
    sendBy: "",
  };
  const [orderPH, setOrderPH] = useState({
    receiverName: "",
    receiverPhone: "",
    detailedAddress: "",
    subDistrict: "",
    district: "",
    province: "",
    postalCode: "",
    sendBy: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      await getProductById(id)
        .then((res) => {
          setProduct(res);
          return res;
        })
        .then((res) => {
          setStock([...Array(res.stock ? +res.stock : 0).keys()]);
        })
        .then(() => setLoading(false));
    };
    fetch();
  }, []);

  const formatter = new Intl.NumberFormat("en", {
    style: "currency",
    currency: "THB",
  });

  const handleSubmit = async () => {
    try {
      setOrderPH({ initialValuePH });
      let errors = OrderValidation(order);
      if (Object.keys(errors).length !== 0) {
        const merged = Object.assign(initialValuePH, errors);
        setOrderPH({ ...merged });
        errors = null;

        return;
      }
      setLoading(true);
      await createOrder(order);

      alert("สั่งซื้อสำเร็จแล้ว ! โปรแจ้งการชำระเงินภายใน 2 วันทำการ");
      navigate("/Payment");
    } catch (err) {
      console.log(err);
      console.log(err.response?.data.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  return (
    <div
      className={`h-screen dark:bg-slate-700 dark:text-white   ${
        mode ? "dark" : ""
      }`}
    >
      <div className="flex  justify-center w-full">
        <div className="flex flex-col justify-center w-[1400px]  mt-14">
          <div className="flex gap-10 mb-10">
            <div className=" h-[650px] w-[700px] flex flex-col items-center justify-center gap-10">
              <div className="text-3xl">1. ที่อยู่ในการจัดส่ง</div>
              <div className="flex flex-col gap-2 w-[500px]">
                <div className="flex gap-2">
                  <input
                    placeholder="ชื่อผู้รับ"
                    type="text"
                    className="w-1/2 h-10 border rounded-lg placeholder:pl-4 dark:bg-slate-800"
                    value={order.receiverName}
                    onChange={(e) =>
                      setOrder({ ...order, receiverName: e.target.value })
                    }
                  />

                  <input
                    placeholder="เบอร์ติดต่อผู้รับ"
                    type="text"
                    className="w-1/2 h-10 border rounded-lg  placeholder:pl-4 dark:bg-slate-800"
                    value={order.receiverPhone}
                    onChange={(e) =>
                      setOrder({ ...order, receiverPhone: e.target.value })
                    }
                  />
                </div>
                <div className="flex gap-2">
                  <span className="w-1/2 text-red-500 text-xs">
                    {orderPH.receiverName !== "" ? orderPH.receiverName : ""}
                  </span>
                  <span className="w-1/2 text-red-500 text-xs">
                    {orderPH.receiverPhone !== "" ? orderPH.receiverPhone : ""}
                  </span>
                </div>
                <div className="flex gap-2">
                  <input
                    placeholder="บ้านเลขที่/ถนน/ซอย ฯ"
                    type="text"
                    className="w-2/3 h-10 border rounded-lg placeholder:pl-4 dark:bg-slate-800"
                    value={order.detailedAddress}
                    onChange={(e) =>
                      setOrder({ ...order, detailedAddress: e.target.value })
                    }
                  />
                  <input
                    placeholder="แขวง/ตำบล"
                    type="text"
                    className="w-1/3 h-10 border rounded-lg placeholder:pl-4 dark:bg-slate-800"
                    value={order.subDistrict}
                    onChange={(e) =>
                      setOrder({ ...order, subDistrict: e.target.value })
                    }
                  />
                </div>
                <div className="flex gap-2">
                  <span className="w-2/3 text-red-500 text-xs">
                    {orderPH.detailedAddress !== ""
                      ? orderPH.detailedAddress
                      : ""}
                  </span>
                  <span className="w-1/3 text-red-500 text-xs">
                    {orderPH.subDistrict !== "" ? orderPH.subDistrict : ""}
                  </span>
                </div>

                <div className="flex gap-2">
                  <input
                    placeholder="เขต/อำเภอ"
                    type="text"
                    className="w-1/3 h-10 border rounded-lg placeholder:pl-4 dark:bg-slate-800"
                    value={order.district}
                    onChange={(e) =>
                      setOrder({ ...order, district: e.target.value })
                    }
                  />
                  <input
                    placeholder="เลขไปรษณีย์"
                    type="text"
                    className="w-1/3 h-10 border rounded-lg placeholder:pl-4 dark:bg-slate-800"
                    value={order.postalCode}
                    onChange={(e) =>
                      setOrder({ ...order, postalCode: e.target.value })
                    }
                  />
                  <input
                    placeholder="จังหวัด"
                    type="text"
                    className="w-1/3 h-10 border rounded-lg placeholder:pl-4 dark:bg-slate-800"
                    value={order.province}
                    onChange={(e) =>
                      setOrder({ ...order, province: e.target.value })
                    }
                  />
                </div>
                <div className="flex gap-2">
                  <span className="w-1/3 text-red-500 text-xs">
                    {orderPH.district !== "" ? orderPH.district : ""}
                  </span>
                  <span className="w-1/3 text-red-500 text-xs">
                    {orderPH.postalCode !== "" ? orderPH.postalCode : ""}
                  </span>
                  <span className="w-1/3 text-red-500 text-xs">
                    {orderPH.province !== "" ? orderPH.province : ""}
                  </span>
                </div>
              </div>
              <div className="text-3xl">2 เลือกวิธีในการจัดส่งสินค้า</div>
              <div className="flex flex-col gap-2 ">
                <div className="border rounded-lg w-[500px] h-12 flex items-center justify-around gap-4">
                  <input
                    type="radio"
                    name="sendby"
                    value="EMS"
                    onChange={(e) =>
                      setOrder({ ...order, sendBy: e.target.value })
                    }
                  />
                  <div>จัดส่งด่วน EMS รับสินค้าภายใน 3 วันทำการ</div>
                  <div>{formatter.format(1000)}</div>
                </div>
                <div className="border rounded-lg w-[500px] h-12 flex items-center justify-around gap-4">
                  <input
                    type="radio"
                    name="sendby"
                    value="Normal"
                    onChange={(e) =>
                      setOrder({ ...order, sendBy: e.target.value })
                    }
                  />
                  <div>จัดส่งแบบปกติ รับสินค้าภายใน 7 วันทำการ</div>
                  <div>{formatter.format(300)}</div>
                </div>
                <span className=" text-red-500 text-xs">
                  {orderPH.sendBy !== "" ? orderPH.sendBy : ""}
                </span>
              </div>
            </div>
            <div className="  h-[650px] w-[700px] flex flex-col items-center justify-start gap-10">
              <div className="flex gap-10 mt-16">
                <div className="w-60 h-60 mb-4">
                  <img
                    src={product.productImage || noImage}
                    alt="productImage"
                  />
                  <div className="flex text-xl w-[400px] my-4">
                    {product.productName}
                    <select
                      name="Sort"
                      className=" border w-40 border-slate-300 rounded-md ml-2 dark:bg-slate-600 pl-2 pr-1"
                      value={order.itemAmount}
                      onChange={(e) =>
                        setOrder({ ...order, itemAmount: +e.target.value })
                      }
                    >
                      <option value="">จำนวนสินค้า</option>
                      {stock.map((item, index) => {
                        return (
                          <option value={index + 1} key={index + 1}>
                            {index + 1}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex justify-start w-[350px] mt-6">
                <div className="text-xl">ยอดคำสั่งซื้อสินค้า</div>
              </div>
              <div className="flex  border-b">
                <div className="flex justify-start w-[200px]">
                  <div>ราคาสินค้าต่อชิ้น</div>
                </div>
                <div className="flex justify-end w-[200px]">
                  <div>{formatter.format(product.productPrice)}</div>
                </div>
              </div>
              <div className="flex border-b">
                <div className="flex justify-start w-[200px]">
                  <div>ค่าจัดส่ง</div>
                </div>
                <div className="flex justify-end w-[200px]">
                  <div>
                    {order.sendBy === "EMS"
                      ? formatter.format(1000)
                      : order.sendBy === "Normal"
                      ? formatter.format(300)
                      : "กรุณาเลือกวิธีการจัดส่งสินค้า"}
                  </div>
                </div>
              </div>
              <div className="flex  border-b">
                <div className="flex justify-start w-[200px]">
                  <div>ยอดสุทธิ</div>
                </div>
                <div className="flex justify-end w-[200px]">
                  <div>
                    {order.sendBy
                      ? formatter.format(
                          +product.productPrice * order.itemAmount +
                            (order.sendBy === "EMS"
                              ? 1000
                              : order.sendBy === "Normal"
                              ? 300
                              : 0)
                        )
                      : "กรุณาเลือกวิธีการจัดส่งสินค้า"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="dark:bg-slate-700 h-40 w-full">
        <div>
          <button
            className="NavAuth BtnHover hover:bg-blue-600 hover:text-slate-100 text-blue-600 text-2xl"
            onClick={handleSubmit}
          >
            ยืนยันการสั่งซื้อ
          </button>
        </div>
      </div>
    </div>
  );
}

export default Order;
