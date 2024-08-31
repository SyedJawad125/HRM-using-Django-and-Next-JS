import React from 'react'
import Image from 'next/image';
import img4 from '../../public/images/4.jpg'
import img5 from '../../public/images/5.jpg'
import img6 from '../../public/images/6.jpg'


const AboutPage = () => {
  return (
    <div className="container mx-auto p-4 ml-56 w-3/4">
  <div className="aboutservicesection text-center">
    <h1 className="text-4xl font-bold mb-4">About Us</h1>
    <p className="mb-2">Some text about who we are and what we do.</p>
    <p className="mb-2">Resize the browser window to see that this page is responsive by the way.</p>
  </div>

  <div className="teamSection mt-10">
    <h1 className="text-center text-3xl font-bold mb-8">Our Team</h1>
    <div className="flex flex-wrap justify-center">
      <div className="w-full md:w-1/4 p-2">
        <div className="cardAbout bg-white shadow-lg rounded-lg overflow-hidden">
          <Image src={img4} className="cardImgTopAbout w-full" width={500} height={500} alt="Service 1" />
          <div className="cardBodyAbout p-4 text-center">
            <h2 className="text-xl font-semibold">John Doe</h2>
            <p className="text-gray-600">Designer</p>
            <p className="text-gray-700 mt-2">Some text that describes me lorem ipsum ipsum lorem.</p>
            <p className="text-gray-700">john@example.com</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Contact</button>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/4 p-2">
        <div className="cardAbout bg-white shadow-lg rounded-lg overflow-hidden">
          <Image src={img5} className="cardImgTopAbout w-full" width={500} height={500} alt="Service 2" />
          <div className="cardBodyAbout p-4 text-center">
            <h2 className="text-xl font-semibold">John Doe</h2>
            <p className="text-gray-600">Designer</p>
            <p className="text-gray-700 mt-2">Some text that describes me lorem ipsum ipsum lorem.</p>
            <p className="text-gray-700">john@example.com</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Contact</button>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/4 p-2">
        <div className="cardAbout bg-white shadow-lg rounded-lg overflow-hidden">
          <Image src={img6} className="cardImgTopAbout w-full" width={500} height={500} alt="Service 3" />
          <div className="cardBodyAbout p-4 text-center">
            <h2 className="text-xl font-semibold">John Doe</h2>
            <p className="text-gray-600">Designer</p>
            <p className="text-gray-700 mt-2">Some text that describes me lorem ipsum ipsum lorem.</p>
            <p className="text-gray-700">john@example.com</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Contact</button>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/4 p-2">
        <div className="cardAbout bg-white shadow-lg rounded-lg overflow-hidden">
          <Image src={img6} className="cardImgTopAbout w-full" width={500} height={500} alt="Service 4" />
          <div className="cardBodyAbout p-4 text-center">
            <h2 className="text-xl font-semibold">John Doe</h2>
            <p className="text-gray-600">Designer</p>
            <p className="text-gray-700 mt-2">Some text that describes me lorem ipsum ipsum lorem.</p>
            <p className="text-gray-700">john@example.com</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Contact</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default AboutPage;
