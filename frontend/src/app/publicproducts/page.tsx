'use client'
import React from 'react'
import PublicProductsCom from "@/components/PublicProductsCom";
import NavbarCom from "@/components/NavbarCom";
import TopNavbarCom from "@/components/TopNavbarCom";
import FooterCom from "@/components/FooterCom";

const page = () => {
  return (
    <div>
      <TopNavbarCom/>
      <NavbarCom/>
      <PublicProductsCom/>
      <FooterCom />
    </div>
  )
}

export default page