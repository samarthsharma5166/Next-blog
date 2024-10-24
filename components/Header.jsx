"use client"
import { assets } from "@/Assets/assets";
import logo from "../Assets/logo.png";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const Header = () => {
   const[email,setEmail]=useState("")
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    const response = await axios.post("/api/email", formData)
    console.log(response)
    if(response.data.success){
      toast.success(response.data.msg)
      setEmail("")
    }else{
      toast.error("somthing went wrong try again")
    }
  }
  return (
    <div className="p-5 md:px-12 lg:px-28">
      <div className="flex justify-between items-center ">
        <Image
          src={logo}
          width={180}
          alt="asd"
          className="w-[130px] sm:w-auto"
        />
        <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000]">
          Get Started
          <Image src={assets.arrow} alt="iarrow"/>
        </button>
      </div>
      <div className="text-center my-8">
        <h1 className="text-3xl sm:text-5xl font-medium">Latest Blogs</h1>
        <p className="mt-10 max-w-[740px] m-auto text-xs sm:text-base">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur
          illum iusto repellat alias autem explicabo quia ea labore hic incidunt
          dolor vitae expedita, officiis aliquid cumque, totam possimus officia?
          Officiis.
        </p>
      </div>
      <form onSubmit={onSubmitHandler} className="flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_#000000]">
        <input
        onChange={(e)=>setEmail(e.target.value)}
          type="email"
          value={email}
          placeholder="Enter your email"
          className="pl-4 outline-none "
        />
        <button type="submit" className="border-l border-black py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white">
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Header;
