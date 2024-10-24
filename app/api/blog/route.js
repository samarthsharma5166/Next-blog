import { connectDB } from "@/lib/config/db";
import { NextResponse } from "next/server";
import {writeFile} from "fs/promises"
import BlogModel from "@/lib/models/BlogModel";
import fs from 'fs';
import mongoose from "mongoose";

const LoadDb = async()=>{
    await connectDB();
}

export async function GET(req, res) {
  await LoadDb();
  try {
    const id = req.nextUrl.searchParams.get("id");
    console.log(id);
    if (id) {
      if (mongoose.Types.ObjectId.isValid(id)) {
        const blog = await BlogModel.findById(id);
        return NextResponse.json(blog);
      } else {
        return NextResponse.json({ error: "Invalid ID format" });
      }
    }
    const blogs = await BlogModel.find({});
    return NextResponse.json({ blogs });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message });
  }
}
export async function POST(req) {
  try {
     await LoadDb();
    // Parse the incoming multipart form data
    const formdata = await req.formData();
    const timestamp = Date.now();

    // Retrieve the image file from the form
    const image = formdata.get("image");
    if (!image) {
      return NextResponse.json(
        { error: "Image file is missing" },
        { status: 400 }
      );
    }

    // Convert image data to a buffer
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData); // Correct method for buffer creation

    // Define the file path for saving the image
    const path = `./public/${timestamp}_${image.name}`;
    await writeFile(path, buffer);
    // Generate the image URL
    const imgUrl = `/${timestamp}_${image.name}`;
    const blogData = {
      title: formdata.get("title"),
      description: formdata.get("description"),
      category: formdata.get("category"),
      author: formdata.get("author"),
      image: imgUrl,
      authorImage: formdata.get("authorImg"),
    };

    const blog =  await BlogModel.create(blogData);
    return NextResponse.json({
      success: true,
      msg: "Blog created successfully",
      data: blog,
    });
  } catch (error) {
    console.error("Error processing image upload:", error);
    return NextResponse.json(
      { error: "Error processing image upload" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  const id = await req.nextUrl.searchParams.get("id");
  const blog = await BlogModel.findById(id);
  fs.unlink(`./public${blog.image}`,()=>{})
  await BlogModel.findByIdAndDelete(id);
  return NextResponse.json({ success: true, msg: "Blog deleted successfully" });
}