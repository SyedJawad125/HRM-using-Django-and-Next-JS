// AuthContext Code .......................................

// 'use client'
// import React, { createContext, useState, useEffect } from 'react';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   console.log('AuthProvider is rendered');
  
//   const [token, setToken] = useState(null);

//   useEffect(() => {
//     // This code will only run in the browser
//     const storedToken = localStorage.getItem('token');
//     setToken(storedToken ? JSON.parse(storedToken) : null);
//   }, []);

//   const login = (userToken) => {
//     localStorage.setItem('token', JSON.stringify(userToken));
//     setToken(userToken);
//   };

//   const logout = async () => {
//     try {
//       // Assuming you're calling an API to log out
//       await AxiosInstance.post('/user/logout');
//       localStorage.removeItem('token');
//       setToken(null);
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };



// 'use client';
// import React, { createContext, useState, useEffect } from 'react';
// import AxiosInstance from "@/components/AxiosInstance";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(null);
//   const [permissions, setPermissions] = useState({});

//   // Effect to check for an existing token on component mount
//   useEffect(() => {
//     const storedToken = localStorage.getItem('token');
//     if (storedToken) {
//       setToken(JSON.parse(storedToken));
//     }
//   }, []);
  
//   // Login function
//   const login = async (userToken) => {
//     try {
//       // Store token in local storage and set in state
//       localStorage.setItem('token', JSON.stringify(userToken));
//       setToken(userToken);

//       // Fetch user permissions after setting the token
//       const res = await AxiosInstance.get('/user/login'); // Adjust endpoint if needed
//       console.log('Fetched permissions:', res.data); // Log fetched permissions
//       if (res.data && res.data.permissions) {
//         setPermissions(res.data.permissions); // Save permissions in global state
//       } else {
//         console.error('Permissions not found in response:', res.data);
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//     }
//   };

//   // Logout function
//   const logout = async () => {
//     try {
//       await AxiosInstance.post('/user/logout');
//       localStorage.removeItem('token');
//       setToken(null);
//       setPermissions({}); // Clear permissions on logout
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ token, permissions, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };



// EmployeeCom .............................................


// 'use client';
// import React, { useEffect, useState } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import AxiosInstance from "@/components/AxiosInstance";
// import { useRouter } from 'next/navigation';

// const EmployeeCom = () => {
//   const router = useRouter();
//   const [records, setRecords] = useState([]);
//   const [data, setData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const recordsPerPage = 10;
//   const [totalPages, setTotalPages] = useState(1);

//   useEffect(() => {
//     const receiveData = async () => {
//       try {
//         const res = await AxiosInstance.get('/ecommerce/employee', {
//           params: {
//             limit: recordsPerPage,
//             offset: (currentPage - 1) * recordsPerPage,
//           },
//         });

//         if (res && res.data && res.data.data.data) {
//           setRecords(res.data.data.data);
//           setTotalPages(Math.ceil(res.data.count / recordsPerPage));
//           setData(res.data);
//         } else {
//           console.error('Unexpected response structure:', res);
//         }
//       } catch (error) {
//         console.error('Error occurred:', error);
//       }
//     };

//     receiveData();
//   }, [currentPage]);

//   const deleteRecord = async (id) => {
//     try {
//       const res = await AxiosInstance.delete(`/ecommerce/employee?id=${id}`);
//       if (res) {
//         toast.success('Employee deleted successfully!');
//         setCurrentPage(1); // Reset to the first page after deletion
//       }
//     } catch (error) {
//       toast.error('Error deleting employee!');
//     }
//   };

//   const updateRecord = (item) => {
//     router.push(`/updateemployeepage?id=${item.id}`);
//   };

//    const DetailRecord = (EpmloyeeId) => {
//      router.push(`/epmloyeesdetail?EpmloyeeId=${EpmloyeeId}`);
//    };


//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearchTerm(value);
//     setCurrentPage(1); // Reset to the first page after search
//   };

//   // Filter records based on search term, ensuring records is an array
//   const filteredRecords = Array.isArray(records) ? records.filter((record) => {
//     const fullName = `${record.first_name?.toLowerCase() || ''} ${record.last_name?.toLowerCase() || ''}`;
//     const idMatch = record.id?.toString() === searchTerm;
//     const nameMatch = fullName.includes(searchTerm);

//     return idMatch || nameMatch;
//   }) : [];

//   console.log('Filtered Records:', filteredRecords);

//   return (
//     <div className="container mx-auto my-4 w-full bg-black ml-5">
//       <ToastContainer />
//       <h2 className="text-2xl font-bold mb-4 text-center text-white">Employees Record</h2>

//       <button
//         className="btn btn-primary mt-3 bg-blue-500 text-white py-2 px-4 rounded"
//         onClick={() => router.push('/addemployeepage')}
//       >
//         Add Employee
//       </button>

//       <br />
//       <br />

//       {/* <p className="text-white">Total Records: {filteredRecords.length}</p> */}
//       {data && data.data ? <p>Total: {data.data.count}</p> : <p>Total: 0</p>}

//       {/* Search Bar */}
//       <div className="flex justify-center mb-5">
//         <input
//           type="text"
//           placeholder="Search by ID or Name"
//           value={searchTerm}
//           onChange={handleSearch}
//           className="px-4 py-2 w-1/2 rounded-md border bg-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       <div className="container mt-5 mr-10">
//         {filteredRecords.length > 0 ? (
//           <div>
//             {/* Header Row */}
//             <div className="grid grid-cols-6 text-white font-bold bg-gray-900 p-2 rounded-t-lg">
//               <span className="text-left">S.No</span>
//               <span className="text-left -ml-20">ID</span>
//               <span className="text-left -ml-36">Name</span>
//               <span className="text-left -ml-36">Position</span>
//               <span className="text-left -ml-32">Dept</span>
//             </div>

//             {/* Data Rows */}
//             <ul className="list-none">
//               {filteredRecords.map((item, index) => (
//                 <li key={item.id} className="grid grid-cols-6 bg-gray-800 text-white p-0 border-t border-gray-700 mt-4">
//                   <span className="text-left ml-2 mt-4">{(currentPage - 1) * recordsPerPage + index + 1}</span>
//                   <span className="text-left -ml-20 mt-4">{item.id}</span>
//                   <span className="text-left -ml-36 mt-4">{item.first_name} {item.last_name}</span>
//                   <span className="text-left -ml-36 mt-4">{item.position}</span>
//                   <span className="text-left -ml-32 mt-4">{item.department}</span>

//                   <div className="col-span-6 flex justify-end space-x-2 mb-1 mr-5">
//                     <button
//                       className="btn btn-danger bg-green-500 text-white py-1 px-2 rounded"
//                       onClick={() => DetailRecord(item.id)}
//                     >
//                       Detail
//                     </button>
//                     <button
//                       className="btn btn-primary bg-blue-500 text-white py-1 px-2 rounded"
//                       onClick={() => updateRecord(item)}
//                     >
//                       Update
//                     </button>
//                     <button
//                       className="btn btn-danger bg-red-500 text-white py-1 px-2 rounded"
//                       onClick={() => deleteRecord(item.id)}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </li>
//               ))}
//             </ul>

//             {/* Pagination Controls */}
//             <div className="flex justify-center mt-4">
//               {Array.from({ length: totalPages }, (_, index) => (
//                 <button
//                   key={index + 1}
//                   onClick={() => setCurrentPage(index + 1)}
//                   className={`px-3 py-1 mx-1 rounded ${
//                     currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
//                   }`}
//                 >
//                   {index + 1}
//                 </button>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <p className="text-white">No Employees found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EmployeeCom;



// 'use client';
// import React, { useEffect, useState } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import AxiosInstance from "@/components/AxiosInstance";
// import { useRouter } from 'next/navigation';

// const EmployeeCom = () => {
//   const router = useRouter();
//   const [records, setRecords] = useState([]);
//   const [filteredRecords, setFilteredRecords] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [data, setData] = useState([]);
//   const [flag, setFlag] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const recordsPerPage = 10;

//   useEffect(() => {
//     if (router.query && router.query.name) {
//       toast.success(router.query.name);
//       router.replace('/EmployeeCom', undefined, { shallow: true });
//     } else if (flag) {
//       setFlag(false);
//     }

//     const receiveData = async () => {
//       try {
//         const res = await AxiosInstance.get('/ecommerce/employee');
//         if (res && res.data && res.data.data && res.data.data.data) {
//           setRecords(res.data.data.data);
//           setFilteredRecords(res.data.data.data); // Initialize filtered records
//           setData(res.data);
//         } else {
//           console.error('Unexpected response structure:', res);
//         }
//       } catch (error) {
//         console.error('Error occurred:', error);
//       }
//     };

//     receiveData();
//   }, [flag, router.query?.name]);

//   const deleteRecord = async (id) => {
//     try {
//       const res = await AxiosInstance.delete(`/ecommerce/employee?id=${id}`);
//       if (res) {
//         setFlag(true);
//         toast.success('Employee deleted successfully!');
//       }
//     } catch (error) {
//       toast.error('Error deleting employee!');
//     }
//   };

//   const updateRecord = async (item) => {
//     router.push(`/updateemployeepage?id=${item.id}`);
//   };

//   const DetailRecord = (EpmloyeeId) => {
//     router.push(`/epmloyeesdetail?EpmloyeeId=${EpmloyeeId}`);
//   };


//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearchTerm(value);
  
//     const filtered = records.filter((record) => {
//       const fullName = `${record.first_name.toLowerCase()} ${record.last_name.toLowerCase()}`;
//       const idMatch = record.id.toString() === value;
//       const nameMatch = fullName.includes(value);
  
//       return idMatch || nameMatch;
//     });
  
//     setFilteredRecords(filtered);
//     setCurrentPage(1); // Reset to the first page
//   };
  

//   // Pagination logic
//   const indexOfLastRecord = currentPage * recordsPerPage;
//   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
//   const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);
//   const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className="container mx-auto my-4 w-full bg-black ml-5">
//       <h2 className="text-2xl font-bold mb-4 text-center">Employees Record</h2>

//       <button
//         className="btn btn-primary mt-3 bg-blue-500 text-white py-2 px-4 rounded"
//         onClick={() => router.push('/addemployeepage')}
//       >
//         Add Employee
//       </button>

//       <br />
//       <br />

//       {data && data.data ? <p>Total: {data.data.count}</p> : <p>Total: 0</p>}

//       {/* Search Bar */}
//       <div className="flex justify-center mb-5">
//         <input
//           type="text"
//           placeholder="Search by ID or Name"
//           value={searchTerm}
//           onChange={handleSearch}
//           className="px-4 py-2 w-1/2 rounded-md border bg-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       <div className="container mt-5 mr-10">
//         {currentRecords.length > 0 ? (
//           <div>
//             {/* Header Row */}
//             <div className="grid grid-cols-6 text-white font-bold bg-gray-900 p-2 rounded-t-lg">
//               <span className="text-left">S.No</span>
//               <span className="text-left -ml-20">ID</span>
//               <span className="text-left -ml-36">Name</span>
//               <span className="text-left -ml-36">Position</span>
//               <span className="text-left -ml-32">Dept</span>
//             </div>

//             {/* Data Rows */}
//             <ul className="list-none">
//               {currentRecords.map((item, index) => (
//                 <li key={item.id} className="grid grid-cols-6 bg-gray-800 text-white p-0 border-t border-gray-700 mt-4">
//                   <span className="text-left ml-2 mt-4">{indexOfFirstRecord + index + 1}</span>
//                   <span className="text-left -ml-20 mt-4">{item.id}</span>
//                   <span className="text-left -ml-36 mt-4">{item.first_name} {item.last_name}</span>
//                   <span className="text-left -ml-36 mt-4">{item.position}</span>
//                   <span className="text-left -ml-32 mt-4">{item.department}</span>

//                   <div className="col-span-6 flex justify-end space-x-2 mb-1 mr-5">
//                     <button
//                       className="btn btn-danger bg-green-500 text-white py-1 px-2 rounded"
//                       onClick={() => DetailRecord(item.id)}
//                     >
//                       Detail
//                     </button>
//                     <button
//                       className="btn btn-primary bg-blue-500 text-white py-1 px-2 rounded"
//                       onClick={() => updateRecord(item)}
//                     >
//                       Update
//                     </button>
//                     <button
//                       className="btn btn-danger bg-red-500 text-white py-1 px-2 rounded"
//                       onClick={() => deleteRecord(item.id)}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </li>
//               ))}
//             </ul>

//             {/* Pagination Controls */}
//             <div className="flex justify-center mt-4">
//               {Array.from({ length: totalPages }, (_, index) => (
//                 <button
//                   key={index + 1}
//                   onClick={() => paginate(index + 1)}
//                   className={`px-3 py-1 mx-1 rounded ${
//                     currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
//                   }`}
//                 >
//                   {index + 1}
//                 </button>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <p>No Employees found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EmployeeCom;



// Good Code of AuthContext, which give Token in applicattion, .....................................

// 'use client';
// import React, { createContext, useState, useEffect } from 'react';
// import AxiosInstance from "@/components/AxiosInstance";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   console.log('AuthProvider is rendered');
  
//   const [token, setToken] = useState(null);
//   const [permissions, setPermissions] = useState(undefined); // Set permissions to undefined initially

//   useEffect(() => {
//     // This code will only run in the browser
//     const storedToken = localStorage.getItem('token');
//     const storedPermissions = localStorage.getItem('permissions');

//     // Debug logging for loaded data
//     console.log('Loaded token from localStorage:', storedToken);
//     console.log('Loaded permissions from localStorage:', storedPermissions);

//     // Parse and set token
//     if (storedToken) {
//       try {
//         const parsedToken = JSON.parse(storedToken);
//         setToken(parsedToken);
//         console.log('Parsed token:', parsedToken);
//       } catch (error) {
//         console.error('Error parsing token:', error);
//         setToken(null);
//       }
//     }

//     // Parse and set permissions
//     if (storedPermissions) {
//       try {
//         const parsedPermissions = JSON.parse(storedPermissions);
//         setPermissions(parsedPermissions);
//         console.log('Parsed permissions:', parsedPermissions);
//       } catch (error) {
//         console.error('Error parsing permissions:', error);
//         setPermissions(undefined); // Reset to undefined on error
//       }
//     }
//   }, []);

//   const login = (userToken, userPermissions) => {
//     // Store token and permissions in local storage
//     localStorage.setItem('token', JSON.stringify(userToken));
//     localStorage.setItem('permissions', JSON.stringify(userPermissions));

//     // Update state
//     setToken(userToken);
//     setPermissions(userPermissions || {}); // Set permissions or leave as undefined if permissions are empty

//     // Debugging logs
//     console.log('Logged in with token:', userToken);
//     console.log('Permissions set on login:', userPermissions);
//   };

//   const logout = async () => {
//     try {
//       // Assuming you're calling an API to log out
//       await AxiosInstance.post('/user/logout');
      
//       // Clear local storage and update state
//       localStorage.removeItem('token');
//       localStorage.removeItem('permissions');

//       setToken(null);
//       setPermissions(undefined); // Reset permissions to undefined

//       console.log('Logged out and cleared local storage.');
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ token, permissions, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };