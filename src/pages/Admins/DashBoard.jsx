import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import OrderGraph from "./OrderGraph";

import Loading from "../../utils/Loading";
import { orderContext } from "../../contexts/orderContext";

function DashBoard() {
  const mode = useSelector((state) => state.header.mode);

  const { getTotalOrders, getorderitems, getorderss } =
    useContext(orderContext);
  const [countOrder, setCountOrder] = useState(null);
  const [orderItems, setOrderItems] = useState(null);
  const [orders, setOrders] = useState(null);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetch = async () => {
      try {
        await getTotalOrders().then((res) => setCountOrder(res));
        await getorderss().then((res) => setOrders(res));
        await getorderitems().then((res) => setOrderItems(res));
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);
  console.log(countOrder);

  const profit =
    orderItems.reduce((sum, item) => (sum = sum + +item.productPrice || 0), 0) -
    orderItems.reduce((sum, item) => (sum = sum + +item.productCost || 0), 0);

  if (loading) return <Loading />;
  return (
    <div
      className={` ${
        mode ? "dark" : ""
      } h-screen w-screen dark:bg-slate-800 dark:text-slate-100 `}
    >
      <div className="flex flex-col justify-center gap-10 mx-auto mt-32 w-[1400px]">
        <div className="flex h-[180px]  rounded-2xl justify-between ">
          <div className="flex flex-col justify-center items-center shadow-2xl rounded-2xl h-[180px] w-[400px]">
            ยอดขาย
            <div className="text-5xl mt-4">
              {new Intl.NumberFormat().format(
                orders.reduce(
                  (sum, item) => (sum = sum + +item.orderTotal || 0),
                  0
                )
              )}{" "}
              <span className="text-lg">บาท</span>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center shadow-2xl rounded-2xl h-[180px] w-[400px]">
            กำไร/ขาดทุน
            <div
              className={`text-5xl mt-4 ${
                +profit > 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {new Intl.NumberFormat().format(profit)}{" "}
              <span className="text-lg">บาท</span>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center shadow-2xl rounded-2xl h-[180px] w-[400px]">
            ยอดสัั่งซื้อ
            <div className="text-5xl mt-4">
              {countOrder.reduce(
                (sum, item) => (sum = sum + +item.totalOrdered),
                0
              )}{" "}
              <span className="text-lg">ออเดอร์</span>
            </div>
          </div>
        </div>
        <div className="flex h-[600px] justify-center shadow-2xl rounded-2xl  ">
          {loading ? <Loading /> : <OrderGraph order={countOrder} />}
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
