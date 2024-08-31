import React from 'react'
import NavbarCom from "@/components/NavbarCom";
import ServicesPageCom from "@/components/ServicesPageCom";
import TopNavbarCom from "@/components/TopNavbarCom";
import FooterCom from "@/components/FooterCom";




const page = () => {
  return (
    <div>
      <TopNavbarCom/>
      <NavbarCom/>
      <ServicesPageCom/>
      <div className="mt-20">
        <FooterCom />
      </div>
    </div>
  )
}

export default page