import axios from "axios";
import { createContext } from "react";

export const orderContext = createContext();

function OrderContextProvider({ children }) {
  const getOrders = async () => {
    try {
      const res = await axios.get("http://localhost:3001/order/getorder", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return res.data.Order;
    } catch (err) {
      console.log(err);
    }
  };

  const createOrder = async (order) => {
    const res = await axios.post("http://localhost:3001/order", order, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.data.Order;
  };

  const getOrderById = async (orderid) => {
    try {
      const res = await axios.get(
        `http://localhost:3001/order/getorder/${orderid}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      return res.data.Order;
    } catch (err) {
      console.log(err);
    }
  };

  const getOrderPaymentConfirmByOrderId = async (orderid) => {
    try {
      const res = await axios.get(
        `http://localhost:3001/order/getorderPC/${orderid}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      return res.data.PaymentConfirmation;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <orderContext.Provider
      value={{
        getOrderById,
        createOrder,
        getOrders,
        getOrderPaymentConfirmByOrderId,
      }}
    >
      {children}
    </orderContext.Provider>
  );
}

export default OrderContextProvider;
