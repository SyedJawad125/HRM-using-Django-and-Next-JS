'use client'
import React from 'react'
import ProductDetailsCom from "@/components/ProductDetailsCom";
import NavbarCom from "@/components/NavbarCom";
import TopNavbarCom from "@/components/TopNavbarCom";

const page = () => {
  return (
    <div>
      <TopNavbarCom/>
      <NavbarCom/>
      <ProductDetailsCom/>
    </div>
  )
}

export default page