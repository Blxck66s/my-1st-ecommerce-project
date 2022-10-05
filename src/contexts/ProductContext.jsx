import axios from "axios";
import { createContext } from "react";

export const ProductContext = createContext();

function ProductContextProvider({ children }) {
  const getTopProduct = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3001/product/getTopProduct"
      );
      return res.data.Product;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ProductContext.Provider value={{ getTopProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export default ProductContextProvider;
