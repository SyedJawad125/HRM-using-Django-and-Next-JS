'use client';
import React from 'react'
import ProductsCom from "@/components/ProductsCom";
import AdminSideNavbarCom from "@/components/AdminSideNavbarCom";



const page = () => {
  return (
     <div className="flex h-screen">
      
      <div className="w-[12%] bg-gray-800 text-white">
        <AdminSideNavbarCom />
      </div>
      <div className="w-[85%] p-6 bg-black">
        <ProductsCom />
      </div>
    </div> 
  )
}

export default page


{/* <div className="flex h-screen">
      
      <div className="w-[15%] bg-gray-800 text-white">
        <AdminDashboardCom />
      </div>
      <div className="w-[85%] p-6 bg-gray-100">
        <ProductsCom />
      </div>
    </div> */}