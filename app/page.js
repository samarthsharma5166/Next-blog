"use client"
import BlogItem from '@/components/BlogItem';
import './globals.css'
import Header from "@/components/Header";
import BlogList from '@/components/BlogList';
import Footer from '@/components/Footer';
  import { ToastContainer } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <>
      <ToastContainer theme='dark'/>
      <Header />
      <BlogList/>
      <Footer/>
    </>
  );
}
