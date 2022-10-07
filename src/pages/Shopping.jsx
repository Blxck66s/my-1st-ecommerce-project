import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductContainer from "../components/ProductContainer";
import { ProductContext } from "../contexts/ProductContext";
import Loading from "../utils/Loading";
import kosana from "../public/kosana.jpg";

function Shopping() {
  const mode = useSelector((state) => state.header.mode);
  const [loading, setLoading] = useState(true);
  const {
    getCPU,
    getMB,
    getram,
    getgpu,
    getdrive,
    getcase,
    getpsu,
    getTotalProduct,
  } = useContext(ProductContext);
  const [cpu, setCpu] = useState(null);
  const [mainboard, setMainboard] = useState(null);
  const [ram, setRam] = useState(null);
  const [gpu, setGpu] = useState(null);
  const [drive, setDrive] = useState(null);
  const [caseN, setCaseN] = useState(null);
  const [psu, setPsu] = useState(null);

  const [limit, setLimit] = useState(5);
  const [sort, setSort] = useState("createdAt");
  const [showSort, setshowSort] = useState("createdAtDESC");
  const [updown, setUpdown] = useState("DESC");
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);

  const [selectedCPU, setSelectedCPU] = useState("");
  const [selectedmainboard, setselectedMainboard] = useState("");
  const [selectedram, setselectedRam] = useState("");
  const [selectedgpu, setselectedGpu] = useState("");
  const [selecteddrive, setselectedDrive] = useState("");
  const [selectedcaseN, setselectedCaseN] = useState("");
  const [selectedpsu, setselectedPsu] = useState("");

  useEffect(() => {
    const fetch = async () => {
      await getCPU().then((res) => setCpu(res));
      await getMB().then((res) => setMainboard(res));
      await getram().then((res) => setRam(res));
      await getgpu().then((res) => setGpu(res));
      await getdrive().then((res) => setDrive(res));
      await getcase().then((res) => setCaseN(res));
      await getpsu().then((res) => setPsu(res));
      await getTotalProduct()
        .then((res) => {
          const number = Math.ceil(res / limit);
          setTotalPage([...Array(number).keys()]);
        })
        .then(() => setLoading(false));
    };
    fetch();
  }, [
    selectedCPU,
    limit,
    selectedmainboard,
    selectedram,
    selectedgpu,
    selecteddrive,
    selectedcaseN,
    selectedpsu,
    getTotalProduct,
  ]);

  if (loading) return <Loading />;
  return (
    <div
      className={`h-fit dark:bg-slate-700 dark:text-white  ${
        mode ? "dark" : ""
      }`}
    >
      <div className="flex  justify-center">
        <div className="flex flex-col justify-center w-[1200px]  mt-14">
          <div className="grid grid-cols-3">
            <div className="col-start-1 col-end-2">
              <div className="mb-10"></div>
              <div className="flex flex-col justify-center items-center gap-4">
                <div className="text-2xl">Filter by Parts</div>
                <div className="flex">
                  CPU
                  <select
                    name="Sort"
                    className=" border w-40 border-slate-300 rounded-md ml-2 dark:bg-slate-600 pl-2 pr-1"
                    value={selectedCPU}
                    onChange={(e) => setSelectedCPU(e.target.value)}
                  >
                    <option value="">-------</option>
                    {cpu.map((item, index) => {
                      return (
                        <option value={item.cpuName} key={index}>
                          {item.cpuName}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="flex">
                  M/B
                  <select
                    name="Sort"
                    className=" border w-40 border-slate-300 rounded-md ml-2 dark:bg-slate-600 pl-2 pr-1"
                    value={selectedmainboard}
                    onChange={(e) => setselectedMainboard(e.target.value)}
                  >
                    <option value="">-------</option>
                    {mainboard.map((item, index) => {
                      return (
                        <option value={item.mainboardName} key={index}>
                          {item.mainboardName}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="flex">
                  RAM
                  <select
                    name="Sort"
                    className=" border w-40 border-slate-300 rounded-md ml-2 dark:bg-slate-600 pl-2 pr-1"
                    value={selectedram}
                    onChange={(e) => setselectedRam(e.target.value)}
                  >
                    <option value="">-------</option>
                    {ram.map((item, index) => {
                      return (
                        <option value={item.ramName} key={index}>
                          {item.ramName}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="flex">
                  GPU
                  <select
                    name="Sort"
                    className=" border w-40 border-slate-300 rounded-md ml-2 dark:bg-slate-600 pl-2 pr-1"
                    value={selectedgpu}
                    onChange={(e) => setselectedGpu(e.target.value)}
                  >
                    <option value="">-------</option>
                    {gpu.map((item, index) => {
                      return (
                        <option value={item.gpuName} key={index}>
                          {item.gpuName}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="flex">
                  Drive
                  <select
                    name="Sort"
                    className=" border w-40 border-slate-300 rounded-md ml-2 dark:bg-slate-600 pl-2 pr-1"
                    value={selecteddrive}
                    onChange={(e) => setselectedDrive(e.target.value)}
                  >
                    <option value="">-------</option>
                    {drive.map((item, index) => {
                      return (
                        <option value={item.driveName} key={index}>
                          {item.driveName}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="flex">
                  CASE
                  <select
                    name="Sort"
                    className=" border w-40 border-slate-300 rounded-md ml-2 dark:bg-slate-600 pl-2 pr-1"
                    value={selectedcaseN}
                    onChange={(e) => setselectedCaseN(e.target.value)}
                  >
                    <option value="">-------</option>
                    {caseN.map((item, index) => {
                      return (
                        <option value={item.caseName} key={index}>
                          {item.caseName}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="flex">
                  PSU
                  <select
                    name="Sort"
                    className=" border w-40 border-slate-300 rounded-md ml-2 dark:bg-slate-600 pl-2 pr-1"
                    value={selectedpsu}
                    onChange={(e) => setselectedPsu(e.target.value)}
                  >
                    <option value="">-------</option>
                    {psu.map((item, index) => {
                      return (
                        <option value={item.psuName} key={index}>
                          {item.psuName}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="mt-10 rounded-lg overflow-hidden w-[340px] ">
                  <img src={kosana} alt="kosana" />
                </div>
                <div className="mt-10 rounded-lg overflow-hidden w-[340px]">
                  <img src={kosana} alt="kosana" />
                </div>
                <div className="mt-10 rounded-lg overflow-hidden w-[340px]">
                  <img src={kosana} alt="kosana" />
                </div>
                <div className="mt-10 rounded-lg overflow-hidden w-[340px]">
                  <img src={kosana} alt="kosana" />
                </div>
              </div>
            </div>
            <div className="col-start-2 col-end-4 ">
              <div className="flex justify-end gap-4 mb-10 mr-4">
                <div>
                  จำนวนสินค้าต่อหน้า :
                  <select
                    name="Sort"
                    className=" border border-slate-300 rounded-md ml-2 dark:bg-slate-600"
                    value={limit}
                    onChange={(e) => setLimit(e.target.value)}
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="Sort">เรียงโดย :</label>
                  <select
                    name="Sort"
                    className=" border border-slate-300 rounded-md ml-2 dark:bg-slate-600"
                    value={showSort}
                    way={updown}
                    onChange={(e) => {
                      if (e.target.value === "createdAtDESC") {
                        setSort("createdAt");
                        setUpdown("DESC");
                        setshowSort(e.target.value);
                      }
                      if (e.target.value === "createdAtASC") {
                        setSort("createdAt");
                        setUpdown("ASC");
                        setshowSort(e.target.value);
                      }
                      if (e.target.value === "productPriceDESC") {
                        setSort("productPrice");
                        setUpdown("DESC");
                        setshowSort(e.target.value);
                      }
                      if (e.target.value === "productPriceASC") {
                        setSort("productPrice");
                        setUpdown("ASC");
                        setshowSort(e.target.value);
                      }
                    }}
                  >
                    <option value="createdAtDESC">สินค้าใหม่</option>
                    <option value="createdAtASC">สินค้าเก่า</option>
                    <option value="productPriceDESC">ราคาสูงสุด</option>
                    <option value="productPriceASC">ราคาต่ำสุด</option>
                  </select>
                </div>
                <div className="flex"></div>
              </div>
              <div className="mb-4">
                <ul className="inline-flex -space-x-px">
                  <li>
                    <button
                      onClick={(e) => setPage(page > 1 ? page - 1 : page)}
                    >
                      <span className="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        Previous
                      </span>
                    </button>
                  </li>
                  {totalPage.map((item, index) => {
                    return (
                      <li key={index}>
                        <button onClick={(e) => setPage(index + 1)}>
                          <span
                            className={`py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white
                           ${
                             page === index + 1
                               ? "bg-gray-100 dark:bg-gray-700"
                               : ""
                           }`}
                          >
                            {index + 1}
                          </span>
                        </button>
                      </li>
                    );
                  })}

                  <li>
                    <button
                      onClick={(e) =>
                        setPage(page < totalPage.length ? page + 1 : page)
                      }
                    >
                      <span className="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        Next
                      </span>
                    </button>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col justify-center items-center gap-10">
                <ProductContainer
                  page={page}
                  cpu={selectedCPU}
                  mainboard={selectedmainboard}
                  ram={selectedram}
                  gpu={selectedgpu}
                  drive={selecteddrive}
                  caseN={selectedcaseN}
                  psu={selectedpsu}
                  sort={sort}
                  updown={updown}
                  limit={limit}
                />
              </div>
            </div>
          </div>
          <div className="h-[200px] w-[200px]"></div>
        </div>
      </div>
    </div>
  );
}

export default Shopping;
