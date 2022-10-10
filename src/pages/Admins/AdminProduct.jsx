import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductContext } from "../../contexts/ProductContext";
import DateAgo from "../../utils/DateAgo";
import Loading from "../../utils/Loading";
import moment from "moment";
import Modal from "../../components/ui/Modal";
import { addModalSwitcher, modalSwitcher } from "../../stores/modalSlice";
import AdminOrderDetail from "./AdminOrderDetail";
import AdminProductDetail from "./AdminProductDetail";
import BtnLoading from "../../utils/BtnLoading";
import AdminAddProduct from "./AdminAddProduct";

function AdminProduct() {
  const mode = useSelector((state) => state.header.mode);
  const modal = useSelector((state) => state.modal.modalActive);
  const addModal = useSelector((state) => state.modal.addModalActive);

  const [loading, setLoading] = useState(true);
  const { getProduct, getProductById, getTopProduct } =
    useContext(ProductContext);
  const [products, setProducts] = useState(null);
  const [productSold, setProductSold] = useState(null);
  const [clickedProduct, setClickedProduct] = useState(null);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getProduct(1, 9999);
        setProducts(res);
        const ress = await getTopProduct(9999);
        setProductSold(ress);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [modal, addModal]);

  const dispatch = useDispatch();
  const openModalFn = async (e) => {
    setClickedProduct(e.target.id);
    await getProductById(e.target.id)
      .then((res) => {
        setProduct(res);
      })
      .then(() => dispatch(modalSwitcher(true)));
  };

  if (loading) return <Loading />;
  return (
    <div
      className={` ${
        mode ? "dark" : ""
      } h-screen w-screen dark:bg-slate-800 dark:text-slate-100`}
    >
      <div className="flex flex-col justify-center gap-10 mx-auto mt-32  w-[1400px]">
        <div className="flex h-[900px] shadow-2xl rounded-2xl ">
          <div className="w-full flex flex-col gap-2  overflow-auto  ">
            <div className="grid grid-cols-8 gap-2 my-4 mt-8">
              <div>รหัสสินค้า</div>
              <div>ชื่อสินค้า</div>
              <div>ราคาต้นทุน</div>
              <div>ราคาขาย</div>
              <div>สั่งซื้อไปทั้งหมด</div>
              <div>คงเหลือ</div>
              <div>สร้างเมื่อ</div>
              <div>รายละเอียดสินค้า</div>
            </div>
            {products?.map((item, index) => {
              const createdDate = item.createdAt
                .slice(0, 10)
                .split("-")
                .reverse()
                .join("/");

              return (
                <div className="grid grid-cols-8 gap-2 border-b" key={index}>
                  <div>{item.id}</div>
                  <div>{item.productName}</div>
                  <div>{item.productCost}</div>
                  <div>{item.productPrice}</div>
                  <div>
                    {
                      productSold.map(
                        (p) =>
                          item.id === p.id && (
                            <div key={p.id}>{p.Product_ordered}</div>
                          )
                      )
                      // || (
                      //   <div key={item.id} className={"text-sm text-red-400"}>
                      //     -
                      //   </div>
                      // )
                    }
                  </div>
                  <div className={item.stock ? "" : "text-sm text-red-400"}>
                    {item.stock || "หมด"}
                  </div>
                  <div>{createdDate}</div>
                  <div
                    onClick={(e) => {
                      openModalFn(e);
                    }}
                    id={item.id}
                    className="cursor-pointer hover:text-blue-500"
                  >
                    ดูเพิ่มเติม
                  </div>
                </div>
              );
            })}
            {modal && (
              <Modal title={`ข้อมูลสินค้ารหัสเลขที่ ${clickedProduct}`}>
                {product && <AdminProductDetail product={product} />}
              </Modal>
            )}
            <button
              className="text-base NavAuth    h-10 hover:bg-blue-600 hover:text-slate-100 text-blue-600"
              onClick={() => dispatch(addModalSwitcher(true))}
            >
              {loading ? <BtnLoading /> : "เพิ่มสินค้า"}
            </button>
            {addModal && (
              <Modal title={`เพิ่มสินค้า`}>{<AdminAddProduct />}</Modal>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProduct;
