import axios from "axios";
import { createContext } from "react";

export const ProductContext = createContext();

function ProductContextProvider({ children }) {
  const getTopProduct = async () => {
    try {
      const res = await axios.get("http://localhost:3001/product/TopProduct");
      return res.data.Product;
    } catch (err) {
      console.log(err);
    }
  };

  const getProduct = async (
    page = "1",
    limit = "5",
    sort = "createdAt",
    updown = "DESC",
    cpu = "",
    mainboard = "",
    ram = "",
    gpu = "",
    drive = "",
    caseN = "",
    psu = ""
  ) => {
    try {
      const res = await axios.get(
        `http://localhost:3001/product?page=${page}&limit=${limit}&sort=${sort}&updown=${updown}&cpu=${cpu}&mainboard=${mainboard}&ram=${ram}&gpu=${gpu}
        &drive=${drive}&caseN=${caseN}&psu=${psu}`
      );
      return res.data.Product;
    } catch (err) {
      console.log(err);
    }
  };

  const getCPU = async () => {
    try {
      const res = await axios.get("http://localhost:3001/product/CPU");
      return res.data.CPU;
    } catch (err) {
      console.log(err);
    }
  };
  const getMB = async () => {
    try {
      const res = await axios.get("http://localhost:3001/product/MB");
      return res.data.mainboard;
    } catch (err) {
      console.log(err);
    }
  };
  const getram = async () => {
    try {
      const res = await axios.get("http://localhost:3001/product/ram");
      return res.data.ram;
    } catch (err) {
      console.log(err);
    }
  };
  const getgpu = async () => {
    try {
      const res = await axios.get("http://localhost:3001/product/gpu");
      return res.data.gpu;
    } catch (err) {
      console.log(err);
    }
  };
  const getdrive = async () => {
    try {
      const res = await axios.get("http://localhost:3001/product/drive");
      return res.data.drive;
    } catch (err) {
      console.log(err);
    }
  };
  const getcase = async () => {
    try {
      const res = await axios.get("http://localhost:3001/product/case");
      return res.data.caseN;
    } catch (err) {
      console.log(err);
    }
  };
  const getpsu = async () => {
    try {
      const res = await axios.get("http://localhost:3001/product/psu");
      return res.data.psu;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        getTopProduct,
        getProduct,
        getCPU,
        getMB,
        getram,
        getgpu,
        getdrive,
        getcase,
        getpsu,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export default ProductContextProvider;
