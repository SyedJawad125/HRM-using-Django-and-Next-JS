// 'use client'
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import AxiosInstance from "@/components/AxiosInstance";

// const PublicProducts = () => {
//     const router = useRouter();
//     const [records, setRecords] = useState([]);
//     const [data, setData] = useState([]);
//     const [flag, setFlag] = useState(false);

//     useEffect(() => {
//         if (router.query && router.query.name) {
//             toast.success(router.query.name);
//             router.push('/products', undefined, { shallow: true });
//         } else if (flag) {
//             toast.success('Product deleted');
//             setFlag(false);
//         }

//         const receiveData = async () => {
//             try {
//                 const res = await AxiosInstance.get('/ecommerce/publicproduct');
//                 if (res) {
//                     setRecords(res.data.data.data);
//                     setData(res.data);
//                 }
//             } catch (error) {
//                 console.log('Error occurred', error);
//             }
//         };

//         receiveData();
//     }, [flag, router.query?.name]);

//     const handleProductClick = (ProductId) => {
//         router.push(`/productdetailpage?ProductId=${ProductId}`);
//     };

//     return (
//         <div className="container mx-auto my-4 ml-56 w-3/4">
//             <h2 className="text-2xl font-bold mb-4">List Of Products</h2>
//             <br />
//             <br />
//             {data && data.data ? <p>Total: {data.data.count}</p> : <p>Total: 0</p>}
//             <br/>
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
//                 {records.length > 0 ? (
//                     records.map((item) => (
//                         <div
//                             key={item.id}
//                             className="card-5 cursor-pointer"
//                             onClick={() => handleProductClick(item.id)}
//                         >
//                             <img
//                                 src={`http://localhost:8000/${item.image}`}
//                                 className="card-image5 clickable-image w-full h-40 object-cover transform 
//                                 transition-transform duration-300 hover:scale-105"
//                                 alt={item.name}
//                             />
//                             <div className="card-body5 p-4">
//                                 <h5 className="card-title text-lg font-semibold">{item.name}</h5>
//                                 <p className="card-text text-sm mt-2">Description: {item.description}</p>
//                                 <p className="card-text text-sm mt-2 font-bold">Price: {item.price}</p>
//                                 <p className="card-text text-sm mt-2">Category: {item.category_name}</p>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p>Loading....</p>
//                 )}
//             </div>
//             <ToastContainer />
//         </div>
//     );
// };

// export default PublicProducts;
