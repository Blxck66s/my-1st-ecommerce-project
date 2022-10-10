import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import BtnLoading from "../../utils/BtnLoading";
import { useContext } from "react";
import { ProductContext } from "../../contexts/ProductContext";
import { modalSwitcher } from "../../stores/modalSlice";
import noImage from "../../public/no-image.svg";

function AdminProductDetail({ product }) {
  const [Sproduct, setProduct] = useState(product);
  const modal = useSelector((state) => state.modal.modalActive);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const fileEl = useRef();
  const { updateProduct } = useContext(ProductContext);
  const dispatch = useDispatch();
  console.log(image);
  const handleUpdate = async () => {
    try {
      const formData = new FormData();

      Sproduct.productName &&
        formData.append("productName", Sproduct.productName);
      Sproduct.productCost &&
        formData.append("productCost", Sproduct.productCost);
      Sproduct.productPrice &&
        formData.append("productPrice", Sproduct.productPrice);
      Sproduct.stock && formData.append("stock", Sproduct.stock);
      image && formData.append("productImage", image);
      Sproduct.cpuName && formData.append("cpuName", Sproduct.cpuName);
      Sproduct.mainboardName &&
        formData.append("mainboardName", Sproduct.mainboardName);
      Sproduct.ramName && formData.append("ramName", Sproduct.ramName);
      Sproduct.gpuName && formData.append("gpuName", Sproduct.gpuName);
      Sproduct.driveName && formData.append("driveName", Sproduct.driveName);
      Sproduct.psuName && formData.append("psuName", Sproduct.psuName);
      Sproduct.caseName && formData.append("caseName", Sproduct.caseName);

      setLoading(true);
      await updateProduct(Sproduct.id, formData);

      dispatch(modalSwitcher(false));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setProduct(product);
  }, [product]);

  return (
    <div className="h-fit w-[1000px] m-8">
      <div className="flex flex-col justify-center">
        <div className="grid grid-cols-6 gap-2  mb-3">
          <div>ชื่อสินค้า</div>
          <div>ราคาต้นทุน</div>
          <div>ราคาขาย</div>
          <div>คงเหลือ</div>
          <div>รูปสินค้าปัจจุบัน</div>
          <div>เปลี่ยนรูปสินค้า</div>
        </div>
        <div className="grid grid-cols-6 gap-2 ">
          <div>
            <input
              type="text"
              value={Sproduct.productName}
              className="w-full rounded-md dark:bg-slate-600 px-2 text-center"
              onChange={(e) =>
                setProduct({ ...Sproduct, productName: e.target.value })
              }
            />
          </div>
          <div>
            <input
              type="text"
              value={Sproduct.productCost}
              className="w-full rounded-md dark:bg-slate-600 px-2 text-center"
              onChange={(e) =>
                setProduct({ ...Sproduct, productCost: e.target.value })
              }
            />
          </div>
          <div>
            <input
              type="text"
              value={Sproduct.productPrice}
              className="w-full rounded-md dark:bg-slate-600 px-2 text-center"
              onChange={(e) =>
                setProduct({ ...Sproduct, productPrice: e.target.value })
              }
            />
          </div>
          <div>
            <input
              type="text"
              value={Sproduct.stock || ""}
              className="w-full rounded-md dark:bg-slate-600 px-2 text-center"
              onChange={(e) =>
                setProduct({ ...Sproduct, stock: e.target.value })
              }
            />
          </div>
          <div>
            <img
              src={Sproduct.productImage || noImage}
              className="h-full"
              alt="slipImage"
            />
          </div>
          <div className="flex justify-center   relative ">
            {image ? (
              <>
                <button
                  type="button"
                  className="h-6 w-6 absolute right-1"
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
                className="flex justify-center place-items-center rounded-xl border p-2 h-40 w-40 hover:bg-gray-200 dark:hover:bg-slate-800"
                role="button"
                onClick={() => fileEl.current.click()}
              >
                <ArrowUpTrayIcon className="h-10 w-10" />
              </div>
            )}
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
        </div>
        <br />
        <div className="flex text-2xl">สเป็คสินค้า</div>
        <br />

        <div className="grid grid-cols-8 gap-2  mb-3">
          <div>CPU</div>
          <div>M/B</div>
          <div>RAM</div>
          <div>GPU</div>
          <div>DRIVE</div>
          <div>PSU</div>
          <div>CASE</div>
        </div>
        <div className="grid grid-cols-8 gap-2 ">
          <div>
            <input
              type="text"
              value={Sproduct.cpuName}
              className="w-full rounded-md dark:bg-slate-600 px-2 text-center"
              onChange={(e) =>
                setProduct({ ...Sproduct, cpuName: e.target.value })
              }
            />
          </div>
          <div>
            <input
              type="text"
              className="w-full rounded-md dark:bg-slate-600 px-2 text-center"
              value={Sproduct.mainboardName}
              onChange={(e) =>
                setProduct({ ...Sproduct, mainboardName: e.target.value })
              }
            />
          </div>
          <div>
            <input
              type="text"
              className="w-full rounded-md dark:bg-slate-600 px-2 text-center"
              value={Sproduct.ramName}
              onChange={(e) =>
                setProduct({ ...Sproduct, ramName: e.target.value })
              }
            />
          </div>
          <div>
            <input
              type="text"
              className="w-full rounded-md dark:bg-slate-600 px-2 text-center"
              value={Sproduct.gpuName}
              onChange={(e) =>
                setProduct({ ...Sproduct, gpuName: e.target.value })
              }
            />
          </div>
          <div>
            <input
              type="text"
              className="w-full rounded-md dark:bg-slate-600 px-2 text-center"
              value={Sproduct.driveName}
              onChange={(e) =>
                setProduct({ ...Sproduct, driveName: e.target.value })
              }
            />
          </div>
          <div>
            <input
              type="text"
              className="w-full rounded-md dark:bg-slate-600 px-2 text-center"
              value={Sproduct.psuName}
              onChange={(e) =>
                setProduct({ ...Sproduct, psuName: e.target.value })
              }
            />
          </div>
          <div>
            <input
              type="text"
              className="w-full rounded-md dark:bg-slate-600 px-2 text-center"
              value={Sproduct.caseName}
              onChange={(e) =>
                setProduct({ ...Sproduct, caseName: e.target.value })
              }
            />
          </div>
          <button
            className="text-base NavAuth BtnHover -mt-4 w-32 h-10 hover:bg-blue-600 hover:text-slate-100 text-blue-600"
            onClick={handleUpdate}
          >
            {loading ? <BtnLoading /> : "อัพเดทสินค้า"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminProductDetail;
