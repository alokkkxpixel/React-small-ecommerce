import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/Context";
import { Link, useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { backgroundImage } from "flowbite-react/plugin/tailwindcss/theme";
import { div, g } from "framer-motion/client";
import axios from "../context/Axios";

const Navbar = () => {
  const [products] = useContext(ProductContext);

  let { search, pathname } = useLocation();
  let { id } = useParams();

  let unqiueCategory =
    products && products.reduce((acc, cv) => [...acc, cv.category], []);
  unqiueCategory = [...new Set(unqiueCategory)];

  return (
    <nav className="w-[18%] h-full bg-zinc-100 flex flex-col items-center pt-5">
      {(pathname != "/" || search.length > 0) && (
        <div className="relative overflow-hidden w-fit rounded-full border border-black group mb-4">
          <Link
            to={"/"}
            className="px-8 py-2   block relative z-10 font-medium text-black transition-colors duration-500 group-hover:text-white"
          >
            Home
          </Link>
          <div className="absolute  top-0 left-full w-full h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500 group-hover:left-0"></div>
        </div>
      )}

      {(pathname != `/details/${id}` || search) && (
        <>
          <div className="relative overflow-hidden w-fit rounded-full border border-black group">
            <a
              href="/create"
              className="px-6 py-2 block relative z-10 font-medium text-black transition-colors duration-500 group-hover:text-white"
            >
              Add new product
            </a>
            <div className="absolute  top-full w-full h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500 group-hover:top-0"></div>
          </div>

          <hr className="w-[80%] my-3" />
          <h1 className="text-2xl w-[80%] mb-3 font-medium">Category Filter</h1>

          <div className="bg--500 w-[80%]">
            {unqiueCategory.map((c, i) => {
              return (
                <Link
                  key={i}
                  to={`/?category=${c}`}
                  className="mb-3 bg--100 flex items-center capitalize transition-all duration-300 hover:text-blue-500 hover:scale-105"
                >
                  <span
                    className={`w-[15px] h-[15px] mr-3  rounded-full bg-blue-300`}
                  ></span>
                  {c}
                </Link>
              );
            })}
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
