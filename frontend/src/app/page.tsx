'use client'
import Image from "next/image";
import Link from 'next/link';
import NavbarCom from "@/components/NavbarCom";
import TopNavbarCom from "@/components/TopNavbarCom";
import FooterCom from "@/components/FooterCom";
import BannerSliderHomeCom from "@/components/BannerSliderHomeCom";
import LeftSideSliderCom from "@/components/LeftSideSliderCom";
import ContentpageHome from "@/components/ContentpageHome";
import AdModal from "@/components/AdModal";


export default function Home() {
  return (
    <>
    <AdModal />
    <TopNavbarCom />
    <NavbarCom />
    <BannerSliderHomeCom />
    {/* <LeftSideSliderCom /> */}
    <ContentpageHome/>
    <FooterCom />
  </>
  );
}

{/* <>
    <TopNavbarCom />
    <NavbarCom />
    <div className="flex flex-col min-h-screen">  
      {/* Container for main and footer */}
      // <main className="flex grow">  
        {/* Grow ensures main takes up available space */}
    //     <LeftSideSliderCom />
    //     <div className="ml-[15%] w-[85%]">
    //       <BannerSliderHomeCom />
    //     </div>
    //   </main>
    //   <FooterCom />
    // </div>
  // </> */}