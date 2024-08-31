import React from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import banner1 from '../../public/images/banner1.jpg'
import banner2 from '../../public/images/banner2.jpg'
import banner3 from '../../public/images/banner3.jpg'
import banner4 from '../../public/images/banner4.jpg'
import banner5 from '../../public/images/banner5.jpg'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { Carousel } from "react-responsive-carousel";



const NextJsCarousel = () => {
  return (
      // <div className="max-w-screen-lg mx-auto">

      <div className="w-full">
          
          <Carousel 
              showThumbs={false} 
              autoPlay 
              infiniteLoop 
              interval={3000}
              showStatus={false}
          >
              <div>
                  <Image
                      src={banner1}
                      alt="image1"
                      className="w-full h-[87vh] object-cover"
                  />
                  {/* <p className="legend">Image 1</p> */}
              </div>
              <div>
                  <Image
                      src={banner2}
                      alt="image2"
                      className="w-full h-[87vh] object-cover"
                  />
                  {/* <p className="legend">Image 2</p> */}
              </div>
              <div>
                  <Image
                      src={banner3}
                      alt="image3"
                      className="w-full h-[87vh] object-cover"
                  />
                  {/* <p className="legend">Image 3</p> */}
              </div>
              <div>
                  <Image
                      src={banner4}
                      alt="image4"
                      className="w-full h-[87vh] object-cover"
                  />
                  {/* <p className="legend">Image 4</p> */}
              </div>
              <div>
                  <Image
                      src={banner5}
                      alt="image5"
                      className="w-full h-[87vh] object-cover"
                  />
                  {/* <p className="legend">Image 5</p> */}
              </div>
          </Carousel>
      </div>
  );
};

export default NextJsCarousel;



// const BannerSlider = () => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//   };

//   return (
    
//     <div id="banner-slider" className="container px-1 py-0">
//     <Slider {...settings} className="h-50"> {/* Adjust height as needed */}
//       <div className="h-full">
//         <Image 
//           src={banner1} 
//           alt="Banner 1" 
//           width={800}  // Adjust width as needed
//           height={250} // Adjust height as needed
//           className="object-cover w-full h-1/2"
//         />
//       </div>
//       <div className="h-full">
//         <Image 
//           src={banner1} 
//           alt="Banner 2" 
//           width={800}  // Adjust width as needed
//           height={250} // Adjust height as needed
//           className="object-cover w-full h-1/2"
//         />
//       </div>
//       <div className="h-full">
//         <Image 
//           src={banner1} 
//           alt="Banner 3" 
//           width={800}  // Adjust width as needed
//           height={300} // Adjust height as needed
//           className="object-cover w-full h-1/2"
//         />
//       </div>
//       <div className="h-full">
//         <Image 
//           src={banner1} 
//           alt="Banner 4" 
//           width={800}  // Adjust width as needed
//           height={300} // Adjust height as needed
//           className="object-cover w-full h-1/2"
//         />
//       </div>
//       <div className="h-full">
//         <Image 
//           src={banner1} 
//           alt="Banner 5" 
//           width={800}  // Adjust width as needed
//           height={300} // Adjust height as needed
//           className="object-cover w-full h-1/2"
//         />
//       </div>
//     </Slider>
//   </div>
//   );
// };

// export default BannerSlider;
