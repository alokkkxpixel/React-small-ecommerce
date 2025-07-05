import React, { useContext, useState } from "react";
import Context, { ProductContext } from "../context/Context";
import { v4 as uuidv4 } from "uuid";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Create = () => {
  const Navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDecription] = useState("");
  const [category, setCategory] = useState("");

  const [Products, setProducts] = useContext(ProductContext);
  const AddHandler = (e) => {
    e.preventDefault();

    if (
      title.trim().length < 5 ||
      image.trim().length < 5 ||
      description.trim().length < 5 ||
      price.trim().length < 3 ||
      category.trim().length < 5
    ) {
      alert("Each and every Fields must have atleast 4 characters... ");
      return;
    }
    const product = {
      id: uuidv4(),
      image,
      title,
      price,
      description,
      category,
    };
    setProducts([...Products, product]);
    // console.log(Products);
    localStorage.setItem("Products", JSON.stringify([...Products, product]));
    Navigate("/");
    toast.success("Product Created successfully!");

    setCategory("");
    setDecription("");
    setImage("");
    setPrice("");
    setTitle("");
  };
  return (
    <>
      <Navbar />
      <div className="bg-zinc-200 w-full h-full flex flex-col items-center justify-center">
        <h2 className="text-3xl my-3 ">Add a Product</h2>
        <form
          onSubmit={AddHandler}
          class="max-w-md mx-auto w-[70%] bg-zinc-300 rounded-md p-5"
        >
          <div class="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="title"
              id="title"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              value={image}
              onChange={(e) => setImage(e.target.value)}
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
                value={category}
                onChange={(e) => setCategory(e.target.value)}
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
                value={price}
                onChange={(e) => setPrice(e.target.value)}
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
                value={description}
                onChange={(e) => setDecription(e.target.value)}
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
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add New Product
          </button>
        </form>
      </div>
    </>
  );
};

export default Create;
