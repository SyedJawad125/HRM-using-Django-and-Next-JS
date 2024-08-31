import Image from 'next/image';
import img1 from '../../public/images/1.jpg'


export default function DesignPage() {
  return (
    // <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div className="flex flex-col items-center justify-center bg-gray-100 ml-80">
      <div className="flex flex-col items-center md:flex-row md:items-start md:space-x-16 p-10 max-w-4xl 
      mx-auto bg-white rounded-lg shadow-lg ml-0">
        {/* Image */}
        <div className="w-full md:w-1/2">
          <Image
            src={img1} // Replace with your image path
            alt="Sample Image"
            width={400}
            height={400}
            className="rounded-md"
          />
        </div>

        {/* Paragraph */}
        <div className="mt-4 md:mt-0 md:ml-4">
          <p className="text-gray-700 text-lg leading-relaxed">
          E-commerce business online refers to the buying and selling of goods and services over the internet. 
          It allows businesses to reach a global audience, operate 24/7, and offer a wide range of products 
          and services without the limitations of a physical store. Key components include a user-friendly website, 
          secure payment gateways, efficient logistics, and digital marketing strategies to attract 
          and retain customers. E-commerce has revolutionized the retail industry, providing consumers with convenience
          and a broader selection, while offering businesses scalability and the ability to analyze customer
          behavior through data.
          </p>
        </div>
      </div>
    </div>
  );
}
