import React, { useEffect, useState } from "react";
import logoLight from "../public/LogoLight.png";
import logoDark from "../public/LogoDark.png";
import h210Light from "../public/h210i.png";
import h210Dark from "../public/h210.png";
import timelinePC from "../public/timelinePC.png";
import { useSelector } from "react-redux";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import { ProductContext } from "../contexts/ProductContext";
import Loading from "../utils/Loading";
import noImage from "../public/no-image.svg";
import { Navigate, useNavigate } from "react-router-dom";

function Home() {
  const mode = useSelector((state) => state.header.mode);
  const [topProduct, setTopProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getTopProduct } = useContext(ProductContext);
  useEffect(() => {
    const fetch = async () => {
      await getTopProduct()
        .then((res) => setTopProduct(res))
        .then(() => setLoading(false));
    };
    fetch();
  }, []);
  const navigate = useNavigate();
  if (loading) return <Loading />;
  return (
    <div
      className={`h-fit dark:bg-slate-700 dark:text-white ${
        mode ? "dark" : ""
      }`}
    >
      <div className="flex justify-center">
        <div className="flex flex-col  justify-center w-[590px] mt-20 ">
          <img
            src={mode ? logoDark : logoLight}
            alt="logolight"
            className="h-[300px] w-auto"
          />
          <div className="text-2xl">
            ซื้อคอมพิวเตอร์ที่ถูกใจคุณแบบด่วนๆ ได้ที่นี่ !
          </div>
        </div>
        <div className="flex justify-start  mt-20">
          <img
            src={mode ? h210Light : h210Dark}
            alt="h210Light"
            className="h-[600px] w-auto"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <div className="text-4xl m-10">สินค้ายอดนิยม</div>
        <div className="text-xl text-slate-400 mb-10">
          สินค้ายอดนิยมของทางร้านที่คุณอาจสนใจ
        </div>
        <div className="flex justify-center gap-10">
          {topProduct.map((item, index) => {
            const formatter = new Intl.NumberFormat("en", {
              style: "currency",
              currency: "THB",
            });

            return (
              <div
                key={index}
                className="w-[300px] h-[550px] bg-white dark:bg-slate-800 drop-shadow-2xl rounded-md"
              >
                <div className="w-[300px] h-[300px] bg-white dark:bg-black rounded-t-md shadow-md overflow-hidden flex justify-center">
                  <img
                    src={item?.product_image || noImage}
                    className="max-w-full "
                  />
                </div>
                <div className="p-4">{item.product_name}</div>
                <div className="mb-3">
                  สั่งซื้อไปแล้วทั้งหมด {item.Product_ordered} เครื่อง !
                </div>
                <div className="">
                  CPU {item.cpu_name} GPU {item.gpu_name}
                </div>
                <div className="mb-1">
                  RAM {item.ram_name} Drive {item.drive_name}
                </div>
                <div className="text-red-400 p-1">
                  {formatter.format(item.product_price)}
                </div>
                <button
                  className="NavAuth BtnHover hover:bg-blue-600 hover:text-slate-100 text-blue-600"
                  id={item.id}
                  onClick={() => {
                    navigate(`/Order/${item.id}`);
                  }}
                >
                  สั่งซื้อเลย !
                </button>
              </div>
            );
          })}
        </div>
        <div className="mt-28">
          <button className="NavAuth BtnHover rounded-md  hover:bg-blue-600 hover:text-slate-100 text-blue-600 text-4xl">
            ช้อปเลย !
          </button>
        </div>
        <div className="flex justify-center ml-20">
          <div className="flex flex-col  justify-center w-[500px] mt-28 text-right gap-1 ">
            <div className="text-4xl flex flex-col gap-4  ">
              คอมพิวเตอร์ประกอบสำเร็จ
              <br />
              สำหรับทุกความต้องการ !
              <div className="text-xl text-blue-500 mb-4">
                ทุกเครื่องประกอบโดยมืออาชีพใส่ใจทุกขั้นตอน
              </div>
            </div>
            <div className="flex text-base text-left gap-2 ml-28">
              <CheckCircleIcon className="w-5 text-green-500" />
              รับประกัน 1 ปีเต็ม
            </div>
            <div className="flex text-base text-left gap-2 ml-28">
              <CheckCircleIcon className="w-5 text-green-500" />
              บริการจัดส่งด่วน 6 ชั่วโมง
            </div>
            <div className="flex text-base text-left gap-2 ml-28">
              <CheckCircleIcon className="w-5 text-green-500" />
              PC มือสองผ่านการทดสอบโดยทางบริษัทแล้วทุกเครื่อง !
            </div>
            <div className="flex text-base text-left gap-2 ml-28">
              <CheckCircleIcon className="w-5 text-green-500" />
              บริการ onsite-service ซ่อมให้ถึงบ้านท่านในระยะประกัน !
            </div>
          </div>
          <div className="flex justify-start  mt-20">
            <img
              src={timelinePC}
              alt="timelinePC"
              className="h-[500px] w-auto"
            />
          </div>
        </div>
        <div className="h-80 w-20"></div>
      </div>
    </div>
  );
}

export default Home;
