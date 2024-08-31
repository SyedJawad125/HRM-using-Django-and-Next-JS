'use client';
import React, { createContext, useState, useEffect } from 'react';
import AxiosInstance from "@/components/AxiosInstance";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  console.log('AuthProvider is rendered');

  const [token, setToken] = useState(null);
  const [permissions, setPermissions] = useState({}); // Initialize permissions as an empty object
  const [role, setRole] = useState(null); // Initialize role state

  useEffect(() => {
    // Load token, permissions, and role from localStorage
    const storedToken = localStorage.getItem('token');
    const storedPermissions = localStorage.getItem('permissions');
    const storedRole = localStorage.getItem('role'); // Load role from localStorage

    console.log('Loaded token from localStorage:', storedToken);
    console.log('Loaded permissions from localStorage:', storedPermissions);
    console.log('Loaded role from localStorage:', storedRole); // Log loaded role

    if (storedToken) {
      try {
        const parsedToken = JSON.parse(storedToken);
        setToken(parsedToken);
        console.log('Parsed token:', parsedToken);
      } catch (error) {
        console.error('Error parsing token:', error);
        setToken(null);
      }
    }

    if (storedPermissions) {
      try {
        const parsedPermissions = JSON.parse(storedPermissions);
        setPermissions(parsedPermissions);
        console.log('Parsed permissions:', parsedPermissions);
      } catch (error) {
        console.error('Error parsing permissions:', error);
        setPermissions({}); // Reset to an empty object on error
      }
    }

    if (storedRole) {
      try {
        const parsedRole = JSON.parse(storedRole);
        setRole(parsedRole);
        console.log('Parsed role:', parsedRole);
      } catch (error) {
        console.error('Error parsing role:', error);
        setRole(null); // Reset role on error
      }
    }
  }, []);

  const login = (userToken, userPermissions, userRole) => {
    // Store token, permissions, and role in local storage
    localStorage.setItem('token', JSON.stringify(userToken));
    localStorage.setItem('permissions', JSON.stringify(userPermissions));
    localStorage.setItem('role', JSON.stringify(userRole)); // Store role

    // Update state
    setToken(userToken);
    setPermissions(userPermissions || {}); // Ensure userPermissions is an object
    setRole(userRole); // Set role state

    console.log('Logged in with token:', userToken);
    console.log('Permissions set on login:', userPermissions);
    console.log('Role set on login:', userRole); // Log the role
  };

  const logout = async () => {
    try {
      // Assuming you're calling an API to log out
      await AxiosInstance.post('/user/logout');

      // Clear local storage and update state
      localStorage.removeItem('token');
      localStorage.removeItem('permissions');
      localStorage.removeItem('role'); // Clear role from local storage

      setToken(null);
      setPermissions({}); // Reset permissions to an empty object
      setRole(null); // Reset role to null

      console.log('Logged out and cleared local storage.');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ token, permissions, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};




// 'use client';
// import React, { createContext, useState, useEffect } from 'react';
// import AxiosInstance from "@/components/AxiosInstance";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   console.log('AuthProvider is rendered');
  
//   const [token, setToken] = useState(null);
//   const [permissions, setPermissions] = useState({});

//   useEffect(() => {
//     // This code will only run in the browser
//     const storedToken = localStorage.getItem('token');
//     const storedPermissions = localStorage.getItem('permissions');

//     // Debug logging for loaded data
//     console.log('Loaded token from localStorage:', storedToken);
//     console.log('Loaded permissions from localStorage:', storedPermissions);

//     try {
//       const parsedToken = storedToken ? JSON.parse(storedToken) : null;
//       setToken(parsedToken);
//       console.log('Parsed token:', parsedToken);
//     } catch (error) {
//       console.error('Error parsing token:', error);
//       setToken(null);
//     }

//     try {
//       const parsedPermissions = storedPermissions ? JSON.parse(storedPermissions) : {};
//       setPermissions(parsedPermissions);
//       console.log('Parsed permissions:', parsedPermissions);
//     } catch (error) {
//       console.error('Error parsing permissions:', error);
//       setPermissions({});
//     }
//   }, []);

//   const login = (userToken, userPermissions) => {
//     // Store token and permissions in local storage
//     localStorage.setItem('token', JSON.stringify(userToken));
//     localStorage.setItem('permissions', JSON.stringify(userPermissions));

//     // Update state
//     setToken(userToken);
//     setPermissions(userPermissions || {}); // Ensure it's at least an empty object

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
//       setPermissions({});

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



// 'use client';
// import React, { createContext, useState, useEffect } from 'react';
// import AxiosInstance from "@/components/AxiosInstance";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   console.log('AuthProvider is rendered');
  
//   const [token, setToken] = useState(null);
//   const [permissions, setPermissions] = useState(undefined);

//   useEffect(() => {
//     const storedToken = localStorage.getItem('token');

//     if (storedToken) {
//       try {
//         const parsedToken = JSON.parse(storedToken);
//         setToken(parsedToken);

//         // Fetch permissions from the backend
//         fetchPermissions(parsedToken);
//       } catch (error) {
//         console.error('Error parsing token:', error);
//         setToken(null);
//       }
//     }
//   }, []);

//   const fetchPermissions = async (token) => {
//     try {
//       const response = await AxiosInstance.get('/user/permissions', {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       const userPermissions = response.data;
//       setPermissions(userPermissions);

//       // Store permissions in localStorage for later use
//       localStorage.setItem('permissions', JSON.stringify(userPermissions));

//       console.log('Fetched and stored permissions:', userPermissions);
//     } catch (error) {
//       console.error('Error fetching permissions:', error);
//       setPermissions(undefined);
//     }
//   };

//   const login = (userToken, userPermissions) => {
//     localStorage.setItem('token', JSON.stringify(userToken));
//     setToken(userToken);

//     // Fetch permissions after login
//     fetchPermissions(userToken);
//   };

//   const logout = async () => {
//     try {
//       await AxiosInstance.post('/user/logout');
      
//       localStorage.removeItem('token');
//       localStorage.removeItem('permissions');

//       setToken(null);
//       setPermissions(undefined);

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
