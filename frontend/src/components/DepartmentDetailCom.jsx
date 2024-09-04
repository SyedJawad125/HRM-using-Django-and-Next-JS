'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AxiosInstance from '@/components/AxiosInstance';

const DepartmentDetail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const DepartmentId = searchParams.get('DepartmentId');

    if (DepartmentId) {
      const fetchEmployees = async () => {
        try {
          const res = await AxiosInstance.get(`/hrm/department?id=${DepartmentId}`);
          if (res && res.data && res.data.data) {
            setDepartments(res.data.data.data); // Convert to array if it's a single object
          } else {
            console.error('Unexpected API response structure:', res.data);
          }
        } catch (error) {
          console.error('Error fetching employee:', error);
        }
      };
      fetchEmployees();
    }
  }, [searchParams]);

  return (
    <div className="container mx-auto my-0 p-6 bg-gray-800 rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold mb-4 text-white ml-5">Department Details</h2>
  
    {departments.length ? (
      departments.map((department) => (
        <div key={department.id} className="flex flex-col md:flex-row gap-4 text-gray-400 leading-relaxed text-sm md:text-base lg:text-lg ml-5">
          {/* <div className="flex flex-col items-center md:items-start md:w-1/3">
            {employee.image && (
              <div className="flex flex-col items-center md:items-start mt-5">
                <img 
                  src={`http://localhost:8000/${employee.image}`} 
                  alt={`${employee.first_name} ${employee.last_name}`} 
                  className="rounded-lg shadow-lg w-48 h-48 object-cover mb-2" 
                />
                <p className="text-white font-semibold mb-5">{`${employee.first_name} ${employee.last_name}`}</p>
              </div>
            )}
          </div> */}
          <div className="md:w-2/3">
            <p><strong>ID:</strong> {department.id}</p>
            <p><strong>Department Name:</strong> {department.dept_name}</p>
            <p><strong>Department Description:</strong> {department.dept_description}</p>
            <p><strong>Department Location:</strong> {department.dept_location}</p>
            <p><strong>Department Budget:</strong> {department.dept_budget}</p>
            <p><strong>Department Projects:</strong> {department.dept_projects}</p>
            <p><strong>Department Goals:</strong> {department.dept_goals}</p>
          </div>
        </div>
      ))
    ) : (
      <p className="text-gray-400">No department details available.</p>
    )}
    <button
      className="mt-4 bg-blue-700 text-white py-2 px-4 rounded ml-5"
      onClick={() => router.push('/department')}
    >
      Back to Departmant List
    </button>
  </div>
  

  );
};

export default DepartmentDetail;
