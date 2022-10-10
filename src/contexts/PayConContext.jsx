import axios from "axios";
import { createContext } from "react";

export const PayConContext = createContext();

function PayConContextProvider({ children }) {
  const createPayConfirm = async (data) => {
    const res = await axios.post(`http://localhost:3001/payconfirm`, data);
    return res.data.newPayConfirm;
  };

  return (
    <PayConContext.Provider
      value={{
        createPayConfirm,
      }}
    >
      {children}
    </PayConContext.Provider>
  );
}

export default PayConContextProvider;
