'use client'
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // Next.js router
import AxiosInstance from "@/components/AxiosInstance";

interface Category {
  id: number;
  name: string;
  // Add other fields if necessary
}
const AddProduct = () => {
  const router = useRouter();
  // const searchParams = useSearchParams();
  // const productId = searchParams.get('id'); // Extract product ID from query params

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [prodHasCategory, setProdHasCategory] = useState('');
  const [categoryRecords, setCategoryRecords] = useState<Category[]>([]);

  useEffect(() => {

    // const fetchProductDetails = async () => {
    //   try {
    //     if (productId) {
    //       const res = await AxiosInstance.get(`/ecommerce/product/${productId}`);
    //       console.log('Product details response:', res.data); // Log the response
    //       if (res && res.data) {
    //         const product = res.data.data;
    //         setName(product.name);
    //         setDescription(product.description);
    //         setPrice(product.price);
    //         setProdHasCategory(product.prodHasCategory);
    //       }
    //     }
    //   } catch (error) {
    //     console.log('Error fetching product details:', error);
    //   }
    // };




    // Fetch categories for the dropdown list
    const fetchMenu = async () => {
      try {
        const res = await AxiosInstance.get('/ecommerce/category');
        if (res) {
          setCategoryRecords(res.data.data.data);
        }
      } catch (error) {
        console.log('Error occurred:', error);
      }
    };
    fetchMenu();
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      if (image) formData.append('image', image);
      formData.append('prod_has_category', prodHasCategory);

      const response = await AxiosInstance.post('/ecommerce/product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response) {
        console.log('Response:', response.data);
        router.push('/products');
      }    // , { state: { message: 'Product Added!' } }
      
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 ml-20">
    <h2 className="mt-4 text-2xl font-bold mt-5 mb-10">Add Product Here:</h2>
    <form className="mt-3" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-1000">
          Name
        </label>
        <input
          type="text"
          id="name"
          className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
          focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-1000">
          Description
        </label>
        <input
          type="text"
          id="description"
          className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
          focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="block text-sm font-medium text-gray-1000">
          Price
        </label>
        <input
          type="text"
          id="price"
          className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
          focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="image" className="block text-sm font-medium text-gray-1000">
          Upload Image
        </label>
        <input
          type="file"
          id="image"
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-3 file:rounded-lg 
          file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 
          hover:file:bg-indigo-100"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium text-gray-1000">
          Select Category
        </label>
        <select
          id="category"
          className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
          focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
          onChange={(e) => setProdHasCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {categoryRecords?.map((item) => (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="mt-3 w-1/4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm 
        text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none 
        focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit
      </button>
    </form>
  </div>
  
  );
};

export default AddProduct;
