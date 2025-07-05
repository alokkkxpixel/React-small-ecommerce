import React, { useContext, useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Link, useLocation } from "react-router-dom";
import { ProductContext } from "../context/Context";
import Loading from "./Loading";
import axios from "../context/Axios";

const Home = () => {
  const [products] = useContext(ProductContext);
  // console.log(products);

  const { search } = useLocation();
  const category = decodeURIComponent(search.split("=")[1]);

  const [filteredProducts, setfilteredProducts] = useState(null);

  const getFilteredProducts = async () => {
    try {
      const { data } = await axios.get(`/products/category/${category}`);
      setfilteredProducts(data);
      // console.log(data);
    } catch (error) {
      // console.log(error);
    }
  };
  useEffect(() => {
    if (!filteredProducts || category == "undefined")
      setfilteredProducts(products);
    if (category != "undefined")
      setfilteredProducts(products.filter((p) => p.category == category));
    // getFilteredProducts();
  }, [category, products]);

  // console.log(filteredProducts);
  return products ? (
    <>
      <Navbar />

      <div className=" w-[82%]   p-10 pt-[5%]  flex flex-wrap gap-5 overflow-x-hidden overflow-y-auto bg-white ">
        {filteredProducts &&
          filteredProducts
            .slice(0)
            .reverse()
            .map((item, index) => {
              return (
                <Link
                  key={index}
                  to={`/details/${item.id}`}
                  className="hover:scale-[1.05] transition-all card h-[40vh] w-[18%] flex flex-col items-center justify-center  py-5 px-3  border shadow rounded"
                >
                  <div className=" w-[100%] h-[22vh] mb-3">
                    <img
                      className="w-full h-full object-contain"
                      src={item.image}
                      alt=""
                    />
                  </div>
                  <h1 className="text-sm tracking-tight hover:text-gray-800 ">
                    {item.title}
                  </h1>
                </Link>
              );
            })}
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Home;
