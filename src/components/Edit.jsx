import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import axios from "../context/Axios";
import { ProductContext } from "../context/Context";
import Navbar from "./Navbar";
import { toast } from "react-toastify";

const Create = () => {
  const [Products, setProducts] = useContext(ProductContext);
  const Navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [editProduct, setEditProduct] = useState({
    title: "",
    image: "",
    description: "",
    category: "",
    price: "",
  });
  const changeHandler = (e) => {
    // console.log(e.target.name, e.target.value);
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const product = Products.find((p) => String(p.id) === String(id));
    if (product) {
      setEditProduct(product);
      setTitle(product.title);
      setImage(product.image);
      setPrice(product.price);
      setDescription(product.description);
      setCategory(product.category);
    }
  }, [Products, id]);

  //   console.log(editProduct);
  const editHandler = (e) => {
    e.preventDefault();

    if (
      editProduct.title.trim().length < 5 ||
      editProduct.image.trim().length < 5 ||
      editProduct.description.trim().length < 5 ||
      editProduct.price.trim().length < 3 ||
      editProduct.category.trim().length < 5
    ) {
      alert("Each and every Fields must have atleast 4 characters... ");
      return;
    }
    const productIndex = Products.findIndex((p) => String(p.id) === String(id));

    const copyProduct = [...Products];
    copyProduct[productIndex] = { ...Products[productIndex], ...editProduct };

    // console.log(copyProduct);
    setProducts(copyProduct);
    // console.log(Products);
    localStorage.setItem("Products", JSON.stringify(copyProduct));
    Navigate("/");
    toast.success("Product Edited successfully!");

    // setCategory("");
    // setDescription("");
    // setImage("");
    // setPrice("");
    // setTitle("");
  };
  //   console.log(Products);
  return (
    <>
      <Navbar />
      <div className="bg-zinc-200 w-full h-full flex flex-col items-center justify-center">
        <h2 className="text-5xl my-3  ">Edit Product</h2>
        <form
          onSubmit={editHandler}
          class="max-w-md mx-auto w-[70%] bg--300 rounded-md p-5"
        >
          <div class="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="title"
              id="title"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={editProduct?.title}
              onChange={changeHandler}
            />
            <label
              for="title"
              class="peer-focus:font-medium absolute text-sm text-gray-800 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Title
            </label>
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <input
              type="url"
              name="image"
              id="image"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={editProduct && editProduct.image}
              onChange={changeHandler}
            />
            <label
              for="image"
              class="peer-focus:font-medium absolute text-sm text-gray-800 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Image link
            </label>
          </div>

          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="category"
                id="category"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={editProduct && editProduct.category}
                onChange={changeHandler}
              />
              <label
                for="category"
                class="peer-focus:font-medium absolute text-sm text-gray-800 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Category
              </label>
            </div>
            <div class="relative z-0 w-full mb-5 group">
              <input
                type="number"
                name="price"
                id="price"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={editProduct && editProduct.price}
                onChange={changeHandler}
              />
              <label
                for="price"
                class="peer-focus:font-medium absolute text-sm text-gray-800 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Price
              </label>
            </div>
          </div>
          <div class="grid md:grid-cols-1 md:gap-6">
            <div class="relative z-0 w-full mb-5 group">
              <textarea
                name="description"
                id="description"
                rows="3"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={editProduct && editProduct.description}
                onChange={changeHandler}
              ></textarea>
              <label
                for="description"
                class="peer-focus:font-medium absolute text-sm text-gray-800 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Description
              </label>
            </div>
          </div>
          <button
            type="submit"
            class="  mr-2 capitalize transition-all duration-300 hover:text-blue-500 hover:scale-[1.1] rounded-md border text-blue-700 border-zinc-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg--600 dark:hover:text-sky-600  shadow-md dark:focus:ring-blue-800"
          >
            Edit Product
          </button>
        </form>
      </div>
    </>
  );
};

export default Create;
