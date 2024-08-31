// 'use client';
// import { useEffect, useState } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import AxiosInstance from "@/components/AxiosInstance";
// import { useCart } from '@/components/CartContext';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const ProductDetailsCom = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const [products, setProducts] = useState([]);
//   const [quantity, setQuantity] = useState(1); // State for product quantity
//   const { addToCart } = useCart();

//   useEffect(() => {
//     const ProductId = searchParams.get('ProductId');

//     if (ProductId) {
//       const fetchProduct = async () => {
//         try {
//           const res = await AxiosInstance.get(`/ecommerce/publicproduct?id=${ProductId}`);
//           if (res && res.data && res.data.data && Array.isArray(res.data.data.data)) {
//             setProducts(res.data.data.data);
//           } else {
//             console.error('Unexpected API response structure:', res.data);
//           }
//         } catch (error) {
//           console.error('Error fetching products:', error);
//         }
//       };
//       fetchProduct();
//     }
//   }, [searchParams]);

//   const handleBackButton = () => {
//     router.push('/publicproducts');
//   };

//   const handleAddToCart = () => {
//     if (products.length > 0) {
//       addToCart(products[0], quantity); // Add product with selected quantity
//       toast.success('Product added to cart!');
//       router.push('/addtocartpage');
//     } else {
//       console.error('No products to add to cart');
//     }
//   };

//   const increaseQuantity = () => {
//     setQuantity((prevQuantity) => prevQuantity + 1); // Increment the quantity
//   };

//   const decreaseQuantity = () => {
//     setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1)); // Decrement the quantity, but not below 1
//   };

//   return (
//     <div className="container mx-auto mt-6 mb-24 px-4 sm:px-6 lg:px-8 w-11/12 lg:w-3/4">
//       <div className="flex justify-between items-center mb-8">
//         <button
//           type="button"
//           className="bg-gradient-to-r from-gray-800 to-gray-600 text-white px-6 py-3 rounded-lg shadow-lg hover:from-gray-700 hover:to-gray-500 transition duration-300"
//           onClick={handleBackButton}
//         >
//           Go Back
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-3/4">
//         {products.length ? (
//           products.map((product) => (
//             <div
//               key={product.id}
//               className="md:col-start-2 md:col-span-2 bg-gray-900 shadow-2xl rounded-lg overflow-hidden transform transition duration-500 ease-in-out"
//             >
//               <img
//                 src={`http://localhost:8000/${product.image}`}
//                 className="w-full h-72 object-cover"
//                 alt={product.name}
//               />
//               <div className="p-6">
//                 <h3 className="text-2xl font-semibold text-white mb-3">{product.name}</h3>
//                 <p className="text-gray-300 mb-4">{product.description}</p>
//                 <div className="text-gray-400 text-sm">
//                   <p>Price: {product.price}</p>
//                 </div>
//                 <div className="flex items-center mt-4">
//                   <button
//                     className="bg-gray-700 text-white px-2 py-1 rounded-l"
//                     onClick={decreaseQuantity}
//                   >
//                     -
//                   </button>
//                   <span className="bg-gray-800 text-white px-4 py-1">{quantity}</span>
//                   <button
//                     className="bg-gray-700 text-white px-2 py-1 rounded-r"
//                     onClick={increaseQuantity}
//                   >
//                     +
//                   </button>
//                   <button
//                   type="button"
//                   className="bg-green-500 text-white py-2 px-4 rounded mt-0 ml-10"
//                   onClick={handleAddToCart}
//                 >
//                   Add to Cart
//                 </button>
//                 </div>
               
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="col-span-full text-center text-gray-500">No products found for this category.</p>
//         )}
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default ProductDetailsCom;