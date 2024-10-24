"use client"
import { assets } from '@/Assets/assets'
import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const page = () => {
    const [image,setImage] = useState()
    const [data,setData] = useState({
        title:"",
        description:"",
        category:"Startup",
        author:"Alex Bennett",
        authorImg:"/author_img.png"
    })

    const onChangeHandler=(e)=>{
        setData(data=>({...data,[e.target.name]:e.target.value}))
        console.log(data)
    }

    const onSubmitHandler = async(e)=>{
        e.preventDefault()
        const formData = new FormData()
        formData.append("image",image)
        formData.append("title",data.title)
        formData.append("description",data.description)
        formData.append("category",data.category)
        formData.append("author",data.author)
        formData.append("authorImg",data.authorImg)
        const response = await axios.post('/api/blog',formData);
        if(response.data.success){
            toast.success(response.data.msg)
            setImage(null)
            setData({title:"",description:"",category:"Startup",author:"Alex Bentley",authorImg:"/author_img.png"})
        }else{
            toast.error("something went worng")
        }
    }
  return (
    <>
      <form onSubmit={onSubmitHandler} className="pt-5 px-5 sm:pt-12 sm:pl-16">
        <p className="text-xl">upload thumbnail</p>
        <label htmlFor="image">
          <Image
            className="mt-4"
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            width={140}
            height={70}
            alt=""
          />
        </label>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          id="image"
          hidden
          required
        />
        <p className="text-xl mt-4">Blog title</p>
        <input
          type="text"
          placeholder="Enter here"
          name="title"
          value={data.title}
          onChange={onChangeHandler}
          required
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
        />

        <p className="text-xl mt-4">Blog description</p>
        <textarea
          type="text"
          placeholder="wite content here"
          name="description"
          onChange={onChangeHandler}
          value={data.description}
          rows={6}
          required
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
        />
        <p className="text-xl mt-4">Blog category</p>
        <select
          name="category"
          onChange={onChangeHandler}
          value={data.category}
          className="w-40 mt-4 px-4 py-3 border text-gray-500"
        >
          <option value="Startup">Startup</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>
        <br />
        <button className="mt-8 w-40 h-12 bg-black text-white">ADD</button>
      </form>
    </>
  );
}

export default page