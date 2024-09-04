'use client'
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // Next.js router
import AxiosInstance from "@/components/AxiosInstance";

interface Departmet {
  id: number;
  dept_name: string;
  // Add other fields if necessary
}
const AddDepartment = () => {
  const router = useRouter();
 
  const [dept_name, setdept_name] = useState('');
  const [dept_description, setdept_description] = useState('');
  const [dept_location, setdept_location] = useState('');
  const [dept_budget, setdept_budget] = useState('');
  const [dept_projects, setdept_projects] = useState('');
  const [dept_goals, setdept_goals] = useState('');



  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
         const payload = {"dept_name":dept_name , "dept_description":dept_description,"dept_location":dept_location, 
           "dept_budget":dept_budget, "dept_projects":dept_projects, "dept_goals":dept_goals}

      const response = await AxiosInstance.post('/hrm/department', payload , {
        headers: {
            'Content-Type': 'application/json'
        },
      });
      if (response) {
        console.log('Response:', response.data);
        router.push('/department');
      }    // , { state: { message: 'Product Added!' } }
      
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 ml-20">
  <h2 className="mt-4 text-2xl font-bold mt-5 mb-10">Add Employee Here:</h2>
  <form className="mt-3" onSubmit={handleSubmit}>

    {/* First Name and Last Name on the same row */}
    <div className="grid grid-cols-2 gap-2 mb-4"> {/* Reduced gap */}
        <div>
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-1000">
            Department Name
            </label>
            <input
            type="text"
            id="first_name"
            className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
            value={dept_name}
            onChange={(e) => setdept_name(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="last_name" className="block text-sm font-medium text-gray-1000">
            Department Description
            </label>
            <input
            type="text"
            id="last_name"
            className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
            value={dept_description}
            onChange={(e) => setdept_description(e.target.value)}
            />
        </div>
    </div>
    <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Email */}
        <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-1000">
        Department Location
        </label>
        <input
            type="text"
            id="email"
            className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
            value={dept_location}
            onChange={(e) => setdept_location(e.target.value)}
        />
        </div>

        {/* Phone Number */}
        <div className="mb-4">
        <label htmlFor="phone_number" className="block text-sm font-medium text-gray-1000">
        Department Budget
        </label>
        <input
            type="text"
            id="phone_number"
            className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
            value={dept_budget}
            onChange={(e) => setdept_budget(e.target.value)}
        />
        </div>
    </div>
    <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Date of Birth */}
        <div className="mb-4">
        <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-1000">
        Department Projects
        </label>
        <input
            type="text"
            id="date_of_birth"
            className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
            value={dept_projects}
            onChange={(e) => setdept_projects(e.target.value)}
        />
        </div>

        {/* Hire Date */}
        <div className="mb-4">
        <label htmlFor="hire_date" className="block text-sm font-medium text-gray-1000">
        Department Goals
        </label>
        <input
            type="text"
            id="hire_date"
            className="mt-1 block w-2/4 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md text-gray-900"
            value={dept_goals}
            onChange={(e) => setdept_goals(e.target.value)}
        />
        </div>
    </div>

    <button
      type="submit"
      className="mt-3 w-1/4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm 
      text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none 
      focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-4"
    >
      Submit
    </button>
  </form>
</div>

  
  );
};

export default AddDepartment;


