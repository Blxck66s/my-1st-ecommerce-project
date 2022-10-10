import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ProductContext } from "../contexts/ProductContext";
import Loading from "../utils/Loading";
import noImage from "../public/no-image.svg";
import { Link, Navigate, useNavigate } from "react-router-dom";

function ProductContainer({
  page,
  limit,
  sort,
  updown,
  cpu,
  mainboard,
  ram,
  gpu,
  drive,
  caseN,
  psu,
}) {
  const navigate = useNavigate();
  const mode = useSelector((state) => state.header.mode);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  const { getProduct } = useContext(ProductContext);
  useEffect(() => {
    const fetch = async () => {
      await getProduct(
        page,
        limit,
        sort,
        updown,
        cpu,
        mainboard,
        ram,
        gpu,
        drive,
        caseN,
        psu
      )
        .then((res) => setProduct(res))
        .then(() => setLoading(false));
    };
    fetch();
  }, [page, limit, sort, updown, cpu, mainboard, ram, gpu, drive, caseN, psu]);

  if (loading) return <Loading />;
  return (
    <>
      {product.map((item, index) => {
        const formatter = new Intl.NumberFormat("en", {
          style: "currency",
          currency: "THB",
        });

        const disabled = item.stock ? false : true;

        return (
          <div
            key={index}
            className={`w-[850px] h-[400px] bg-slate-200 drop-shadow-xl rounded-2xl flex gap-10  overflow-hidden dark:bg-slate-600 ${
              mode ? "dark" : ""
            } `}
          >
            <div className="w-[400px] h-[400px]  flex justify-center shadow-lg">
              <img
                src={item.productImage || noImage}
                alt={`product ${item.id}`}
                className="flex-shrink-0 min-w-[400px] "
              />
            </div>
            <div className="flex flex-col justify-between  mt-5 mb-2 items-start">
              <div className="flex justify-between w-[320px] items-baseline">
                <div className="ml-8 text-2xl">{item.productName} </div>
                <div className="text-xl">
                  {item.stock ? "คงเหลือ : " + item.stock : ""}
                </div>
              </div>
              <div className="flex   ml-4 gap-2 text-lg">
                <div className="flex flex-col w-[200px] justify-start items-start">
                  <div className="flex justify-center w-full text-blue-400">
                    CPU
                  </div>
                  <div className="flex justify-center w-full">
                    {item.cpuName}
                  </div>
                  <div className="flex justify-center w-full text-blue-400">
                    GPU
                  </div>
                  <div className="flex justify-center w-full">
                    {item.gpuName}
                  </div>
                  <div className="flex justify-center w-full text-blue-400">
                    RAM
                  </div>
                  <div className="flex justify-center w-full">
                    {item.ramName}
                  </div>
                  <div className="flex justify-center w-full text-blue-400">
                    Drive
                  </div>
                  <div className="flex justify-center w-full">
                    {item.driveName}
                  </div>
                </div>
                <div className="flex flex-col justify-start items-start">
                  <div className="flex justify-center w-full text-blue-400">
                    M/B
                  </div>
                  <div className="flex justify-center w-full">
                    {item.mainboardName}
                  </div>
                  <div className="flex justify-center w-full text-blue-400">
                    Case
                  </div>
                  <div className="flex justify-center w-full">
                    {item.caseName}
                  </div>
                  <div className="flex justify-center w-full text-blue-400">
                    PSU
                  </div>
                  <div className="flex justify-center w-full">
                    {item.psuName}
                  </div>
                </div>
              </div>

              <div className="text-2xl text-red-500">
                {formatter.format(item.productPrice)}
                <button
                  className="text-base ml-10 NavAuth BtnHover w-32 h-10 hover:bg-blue-600 hover:text-slate-100 text-blue-600 disabled:opacity-50"
                  id={item.id}
                  disabled={disabled}
                  onClick={() => {
                    navigate(`/Order/${item.id}`);
                  }}
                >
                  {item.stock ? "สั่งซื้อสินค้า" : "หมด"}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ProductContainer;
