import { parse } from "postcss";
import axios from "./Axios";
import React, { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();

const Context = (props) => {
  const [Products, setProducts] = useState(
    JSON.parse(localStorage.getItem("Products") || null)
  );
  const getProducts = async () => {
    try {
      const { data } = await axios("/products");
      setProducts(data);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <ProductContext.Provider value={[Products, setProducts]}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default Context;
