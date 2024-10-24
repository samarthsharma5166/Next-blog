"use client";
import { assets, blog_data } from "@/Assets/assets";
import Footer from "@/components/Footer";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { use } from "react";

const Page = ({ params }) => {
  const [data, setData] = useState(null); // Initialize data as null to indicate loading state
  const unwrappedParams = use(params);
  const bid = unwrappedParams.id;

  const fetchBlog = async() => {
    console.log(bid)
    const res = await axios.get(`/api/blog`,{
      params: {
        id : bid
      }
    });
    console.log(res)
    setData(res.data);
  };

  useEffect(() => {
    fetchBlog();
  }, []); // Add id as a dependency to refetch if id changes

  // Conditional rendering to handle cases where data is not yet available
  return data ? (
    <>
      <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28">
        <div className="flex justify-between items-center">
          <Link href={"/"}>
            <Image
              src={assets.logo}
              width={180}
              alt="Logo"
              className="w-[180px] sm:w-auto"
            />
          </Link>
          <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000]">
            Get Started <Image src={assets.arrow} alt="arrow" />
          </button>
        </div>
        <div className="text-center my-24">
          <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto">
            {data?.title}
          </h1>
          <Image
            src={data.authorImage}
            className="mx-auto mt-6 border border-white rounded-full"
            alt=""
            width={60}
            height={60}
          />
          <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto">
            {data.author}
          </p>
        </div>
      </div>
      <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10 ">
        <Image
          src={data.image}
          width={1280}
          height={720}
          className="border-4 border-white"
          alt=""
        />
        <h1 className="my-8 text-[26px] font-semibold">Introduction</h1>
        <p>{data.description}</p>
        <h3 className="my-5 text-[18px] font-semibold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, eveniet?
        </h3>
        <p className="my-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
          molestiae consequuntur recusandae nihil libero, corporis atque eos
          soluta, dolorem fugit culpa nam, nisi perspiciatis! Architecto sed
          necessitatibus accusamus magni exercitationem!
        </p>
        <p className="my-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
          molestiae consequuntur recusandae nihil libero, corporis atque eos
          soluta, dolorem fugit culpa nam, nisi perspiciatis! Architecto sed
          necessitatibus accusamus magni exercitationem!
        </p>
        <h3 className="my-5 text-[18px] font-semibold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, eveniet?
        </h3>
        <p className="my-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
          molestiae consequuntur recusandae nihil libero, corporis atque eos
          soluta, dolorem fugit culpa nam, nisi perspiciatis! Architecto sed
          necessitatibus accusamus magni exercitationem!
        </p>
        <p className="my-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
          molestiae consequuntur recusandae nihil libero, corporis atque eos
          soluta, dolorem fugit culpa nam, nisi perspiciatis! Architecto sed
          necessitatibus accusamus magni exercitationem!
        </p>
        <h3 className="my-5 text-[18px] font-semibold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, eveniet?
        </h3>
        <p className="my-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
          molestiae consequuntur recusandae nihil libero, corporis atque eos
          soluta, dolorem fugit culpa nam, nisi perspiciatis! Architecto sed
          necessitatibus accusamus magni exercitationem!
        </p>
        <p className="my-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
          molestiae consequuntur recusandae nihil libero, corporis atque eos
          soluta, dolorem fugit culpa nam, nisi perspiciatis! Architecto sed
          necessitatibus accusamus magni exercitationem!
        </p>
        <div className="my-24">
          <p className="text-black font font-semibold my-4">
            share this artical on social media
          </p>
          <div className="flex">
            <Image src={assets.facebook_icon} width={50} alt="" />
            <Image src={assets.twitter_icon} width={50} alt="" />
            <Image src={assets.googleplus_icon} width={50} alt="" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <></>
  );
};

export default Page;
