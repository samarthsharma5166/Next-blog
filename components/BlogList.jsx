import { blog_data } from "@/Assets/assets";
import React, { useEffect, useState } from "react";
import BlogItem from "./BlogItem";
import axios from "axios";

const BlogList = () => {
    const [menu,setMenu] = useState("all");
    const [blogs,setBlogs] = useState(blog_data);
    const fetchBlogs = async () => {
      const res = await axios.get("/api/blog");
      setBlogs(res.data.blogs)
      console.log(res.data.blogs)
    }
    useEffect(()=>{ 
      fetchBlogs()
    },[])
  return (
    <div>
      <div className="flex justify-center gap-6 my-10">
        <button
          onClick={() => setMenu("all")}
          className={
            menu === "all" && "bg-black text-white py-1 px-4 rounded-sm"
          }
        >
          All
        </button>
        <button
          className={
            menu === "Technology" ? "bg-black text-white py-1 px-4 rounded-sm":""
          }
          onClick={() => setMenu("Technology")}
        >
          Technology
        </button>
        <button
          className={
            menu === "Startup" ? "bg-black text-white py-1 px-4 rounded-sm":""
          }
          onClick={() => setMenu("Startup")}
        >
          Startup
        </button>
        <button
          className={
            menu === "Lifestyle" ? "bg-black text-white py-1 px-4 rounded-sm":""
          }
          onClick={() => setMenu("Lifestyle")}
        >
          Lifestyle
        </button>
      </div>
      <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
        {blogs.filter((item) => menu === "all" ?true :item.category ===menu ).map((item,idx) => {
          return (
            <BlogItem
              key={idx}
              id = {item._id}
              image={item.image}
              category={item.category}
              title={item.title}
              description={item.description}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BlogList;
