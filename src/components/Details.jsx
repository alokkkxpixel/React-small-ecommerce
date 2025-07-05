import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import axios from "../context/Axios";
import { ProductContext } from "../context/Context";
import Navbar from "./Navbar";
import { toast } from "react-toastify";

const Details = () => {
  const Navigate = useNavigate();
  const [product, setproduct] = useState(null);
  const [Products, setProducts] = useContext(ProductContext);

  const { id } = useParams();
  //   console.log(id);
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(`/products/${id}`);
      setproduct(data);
      //   console.log(data);
    } catch (error) {
      //   console.log(error);
    }
  };

  useEffect(() => {
    if (!product) {
      const foundProduct =
        Products.find((p) => p?.id === id) ||
        Products.find((p) => p.id === Number(id));
      setproduct(foundProduct);
      //   console.log("Found product", foundProduct);
    }
  }, [Products, id]);

  const productDelete = (id) => {
    const filterDeleteProuct = Products.filter((p) => p.id !== id);
    // console.log(filterDeleteProuct);
    setProducts(filterDeleteProuct);
    localStorage.setItem("Products", JSON.stringify(filterDeleteProuct));
    Navigate("/");
    toast.success("Product Deleted successfully!");
  };
  return product ? (
    <>
      <Navbar />

      <div className="w-[70%] h-full m-auto bg--100 flex p-[10%]  gap-10 items-center justify-start">
        <img
          className="w-[45%] h-[50vh] object-contain"
          src={product?.image}
          alt=""
        />

        <div className=" w-[50%]  bg--300  p-2">
          <h2 className="text-4xl font-medium text-pretty mb-7 ">
            {product?.title}
          </h2>
          <h2 className="text-zinc-600 my-3 capitalize">{product?.category}</h2>
          <h3 className="text-red-500 my-3 text-xl font-medium">
            ${product?.price}
          </h3>
          <p className="mb-6 text-truncate ">{product?.description}</p>
          <Link
            to={`/edit/${product.id}`}
            className="px-4 py-2 mr-5 rounded-md border text-blue-500 border-zinc-400"
          >
            Edit
          </Link>
          <button
            onClick={() => productDelete(product.id)}
            className="px-4 py-2 mr-2 rounded-md border text-red-500 border-zinc-400"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Details;
