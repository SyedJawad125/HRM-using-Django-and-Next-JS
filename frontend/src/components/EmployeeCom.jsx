'use client';
import React, { useEffect, useState, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AxiosInstance from "@/components/AxiosInstance";
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/components/AuthContext';

const EmployeeCom = () => {
  const router = useRouter();
  const { permissions = {} } = useContext(AuthContext); // Provide a default value for permissions
  const [records, setRecords] = useState([]);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const receiveData = async () => {
      try {
        const res = await AxiosInstance.get('/ecommerce/employee', {
          params: {
            limit: recordsPerPage,
            offset: (currentPage - 1) * recordsPerPage,
          },
        });

        if (res && res.data && res.data.data.data) {
          setRecords(res.data.data.data);
          setTotalPages(Math.ceil(res.data.count / recordsPerPage));
          setData(res.data);
        } else {
          console.error('Unexpected response structure:', res);
        }
      } catch (error) {
        console.error('Error occurred:', error);
      }
    };

    receiveData();
  }, [currentPage]);

  const deleteRecord = async (id) => {
    try {
      const res = await AxiosInstance.delete(`/ecommerce/employee?id=${id}`);
      if (res) {
        toast.success('Employee deleted successfully!');
        setCurrentPage(1); // Reset to the first page after deletion
      }
    } catch (error) {
      toast.error('Error deleting employee!');
    }
  };

  const updateRecord = (item) => {
    router.push(`/updateemployeepage?id=${item.id}`);
  };

  const DetailRecord = (employeeId) => {
    router.push(`/epmloyeesdetail?EpmloyeeId=${employeeId}`);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setCurrentPage(1); // Reset to the first page after search
  };

  // Filter records based on search term
  const filteredRecords = Array.isArray(records) ? records.filter((record) => {
    const fullName = `${record.first_name?.toLowerCase() || ''} ${record.last_name?.toLowerCase() || ''}`;
    const idMatch = record.id?.toString() === searchTerm;
    const nameMatch = fullName.includes(searchTerm);

    return idMatch || nameMatch;
  }) : [];

  // Log permissions to debug
  console.log('User permissions:', permissions);

  return (
    <div className="container mx-auto my-4 w-full bg-black ml-5">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4 text-center text-white">Employees Record</h2>

      {/* Conditionally render the Add Employee button based on user permissions */}
      {permissions.create_employee && (
        <button
          className="btn btn-primary mt-3 bg-blue-500 text-white py-2 px-4 rounded"
          onClick={() => router.push('/addemployeepage')}
        >
          Add Employee
        </button>
      )}

      <br />
      <br />

      {data && data.data ? <p>Total: {data.data.count}</p> : <p>Total: 0</p>}

      {/* Search Bar */}
      <div className="flex justify-center mb-5">
        <input
          type="text"
          placeholder="Search by ID or Name"
          value={searchTerm}
          onChange={handleSearch}
          className="px-4 py-2 w-1/2 rounded-md border bg-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="container mt-5 mr-10">
        {filteredRecords.length > 0 ? (
          <div>
            {/* Header Row */}
            <div className="grid grid-cols-6 text-white font-bold bg-gray-900 p-2 rounded-t-lg">
              <span className="text-left">S.No</span>
              <span className="text-left -ml-20">ID</span>
              <span className="text-left -ml-36">Name</span>
              <span className="text-left -ml-36">Position</span>
              <span className="text-left -ml-32">Dept</span>
            </div>

            {/* Data Rows */}
            <ul className="list-none">
              {filteredRecords.map((item, index) => (
                <li key={item.id} className="grid grid-cols-6 bg-gray-800 text-white p-0 border-t border-gray-700 mt-4">
                  <span className="text-left ml-2 mt-4">{(currentPage - 1) * recordsPerPage + index + 1}</span>
                  <span className="text-left -ml-20 mt-4">{item.id}</span>
                  <span className="text-left -ml-36 mt-4">{item.first_name} {item.last_name}</span>
                  <span className="text-left -ml-36 mt-4">{item.position}</span>
                  <span className="text-left -ml-32 mt-4">{item.department}</span>

                  <div className="col-span-6 flex justify-end space-x-2 mb-1 mr-5">
                    <button
                      className="btn btn-danger bg-green-500 text-white py-1 px-2 rounded"
                      onClick={() => DetailRecord(item.id)}
                    >
                      Detail
                    </button>
                    
                    {/* Conditionally render the Update and Delete buttons based on user permissions */}
                    {permissions.update_employee && (
                      <button
                        className="btn btn-primary bg-blue-500 text-white py-1 px-2 rounded"
                        onClick={() => updateRecord(item)}
                      >
                        Update
                      </button>
                    )}
                    {permissions.delete_employee && (
                      <button
                        className="btn btn-danger bg-red-500 text-white py-1 px-2 rounded"
                        onClick={() => deleteRecord(item.id)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            {/* Pagination Controls */}
            <div className="flex justify-center mt-4">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-3 py-1 mx-1 rounded ${
                    currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-white">No Employees found.</p>
        )}
      </div>
    </div>
  );
};

export default EmployeeCom;
