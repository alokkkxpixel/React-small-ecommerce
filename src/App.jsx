import React from "react";
import Card from "./components/Card";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import Details from "./components/Details";
import Create from "./components/Create";
import Edit from "./components/Edit";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className=" h-screen w-full flex">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/create" element={<Create />} />
        <Route path={`edit/:id`} element={<Edit />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
