import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ProductContext } from "../contexts/ProductContext";
import Loading from "../utils/Loading";
import noImage from "../public/no-image.svg";

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
  console.log(product);

  if (loading) return <Loading />;
  return (
    <>
      {product.map((item, index) => {
        const formatter = new Intl.NumberFormat("en", {
          style: "currency",
          currency: "THB",
        });
        return (
          <div
            key={index}
            className={`w-[750px] h-[300px] bg-slate-200 drop-shadow-xl rounded-2xl flex gap-10  overflow-hidden dark:bg-slate-600 ${
              mode ? "dark" : ""
            } `}
          >
            <div className="w-[300px] h-[300px] overflow-hidden flex justify-center shadow-lg">
              <img
                src={item.productImage || noImage}
                alt={`product ${item.id}`}
                className="flex-shrink-0 max-h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-between ml-2 mt-5 mb-5 items-start">
              <div className="text-2xl">{item.productName} </div>
              <div className="flex   ml-4 gap-10 text-lg">
                <div className="flex flex-col justify-start items-start">
                  <div>CPU {item.cpuName}</div>
                  <div>GPU {item.gpuName} </div>
                  <div>RAM {item.ramName} </div>
                  <div>Drive {item.driveName} </div>
                </div>
                <div className="flex flex-col justify-start items-start">
                  <div>M/B {item.mainboardName} </div>
                  <div>Case {item.caseName} </div>
                  <div>PSU {item.psuName} </div>
                </div>
              </div>

              <div className="text-2xl text-red-500">
                {formatter.format(item.productPrice)}
                <button
                  className="text-base ml-10 NavAuth BtnHover w-32 h-10 hover:bg-blue-600 hover:text-slate-100 text-blue-600"
                  id={item.id}
                >
                  สั่งซื้อสินค้า
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
