import React from 'react'
import NavbarCom from "@/components/NavbarCom";
import AboutPageCom from "@/components/AboutPageCom";
import TopNavbarCom from "@/components/TopNavbarCom";
import FooterCom from "@/components/FooterCom";






const about = () => {
  return (
    <div>
      <TopNavbarCom/>
      <NavbarCom/>
      <AboutPageCom/>
      <div className="mt-20">
        <FooterCom />
      </div>
    </div>
  )
}

export default about