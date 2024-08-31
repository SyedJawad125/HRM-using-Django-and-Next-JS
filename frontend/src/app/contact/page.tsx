import React from 'react'
import NavbarCom from "@/components/NavbarCom";
import ContactPageCom from "@/components/ContactPageCom";
import TopNavbarCom from "@/components/TopNavbarCom";
import FooterCom from "@/components/FooterCom";




const page = () => {
  return (
    <div>
      <TopNavbarCom/>
      <NavbarCom/>
      <ContactPageCom/>
      {/* <FooterCom/> */}
    </div>
  )
}

export default page