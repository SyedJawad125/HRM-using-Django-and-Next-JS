import React from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import b1 from '../../public/images/b1.jpg'
import b2 from '../../public/images/b2.jpg'
import b3 from '../../public/images/b3.jpg'
import b4 from '../../public/images/b4.jpg'
import b5 from '../../public/images/b5.webp'
import b6 from '../../public/images/b6.jpg'
import b7 from '../../public/images/b7.jpg'
import b9 from '../../public/images/b9.webp'
import b10 from '../../public/images/b10.jpg'
import b11 from '../../public/images/b11.png'
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
                      src={b1}
                      alt="image1"
                      className="w-full h-[87vh] object-cover"
                  />
                  {/* <p className="legend">Image 1</p> */}
              </div>
              <div>
                  <Image
                      src={b2}
                      alt="image2"
                      className="w-full h-[87vh] object-cover"
                  />
                  {/* <p className="legend">Image 2</p> */}
              </div>
              <div>
                  <Image
                      src={b3}
                      alt="image3"
                      className="w-full h-[87vh] object-cover"
                  />
                  {/* <p className="legend">Image 3</p> */}
              </div>
              <div>
                  <Image
                      src={b4}
                      alt="image4"
                      className="w-full h-[87vh] object-cover"
                  />
                  {/* <p className="legend">Image 4</p> */}
              </div>
              <div>
                  <Image
                      src={b5}
                      alt="image5"
                      className="w-full h-[87vh] object-cover"
                  />
                  {/* <p className="legend">Image 5</p> */}
              </div>
              <div>
                  <Image
                      src={b6}
                      alt="image1"
                      className="w-full h-[87vh] object-cover"
                  />
                  {/* <p className="legend">Image 1</p> */}
              </div>
              <div>
                  <Image
                      src={b7}
                      alt="image2"
                      className="w-full h-[87vh] object-cover"
                  />
                  {/* <p className="legend">Image 2</p> */}
              </div>
              <div>
                  <Image
                      src={b9}
                      alt="image3"
                      className="w-full h-[87vh] object-cover"
                  />
                  {/* <p className="legend">Image 3</p> */}
              </div>
              <div>
                  <Image
                      src={b10}
                      alt="image4"
                      className="w-full h-[87vh] object-cover"
                  />
                  {/* <p className="legend">Image 4</p> */}
              </div>
              <div>
                  <Image
                      src={b11}
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
