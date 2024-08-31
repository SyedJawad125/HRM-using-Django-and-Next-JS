'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faSignInAlt, faUserPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

const TopNavbarCom = () => {
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Checking authentication status on the client side
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            setIsAuthenticated(!!token);
        }
    }, []);

    const logout = () => {
        setIsLoggingOut(true);
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        router.push('/');
    };

    return (
        <div className="bg-black text-white p-3">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <FontAwesomeIcon icon={faPhone} className="h-3 w-3" />
                    <span>(+92) 333 1906382</span>
                </div>
                <div className="flex items-center space-x-4 mr-20">
                    {isAuthenticated ? (
                        <button 
                            onClick={logout} 
                            disabled={isLoggingOut} 
                            className={`flex items-center space-x-2 text-white hover:text-gray-300 ${isLoggingOut ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <FontAwesomeIcon icon={faSignOutAlt} />
                            <span>Logout</span>
                        </button>
                    ) : (
                        <Link href="/Login">
                            <div className="flex items-center space-x-2">
                                <FontAwesomeIcon icon={faSignInAlt} />
                                <span>Login</span>
                            </div>
                        </Link>
                    )}
                    <Link href="/signup">
                        <div className="flex items-center space-x-2">
                            <FontAwesomeIcon icon={faUserPlus} />
                            <span>SignUp</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TopNavbarCom;




// 'use client';
// import Link from 'next/link';
// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPhone, faSignInAlt, faUserPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
// import { useRouter } from 'next/navigation';

// const TopNavbarCom = () => {
//     const router = useRouter();
    
//     const [isLoggingOut, setIsLoggingOut] = React.useState(false);

//     const logout = () => {
//         setIsLoggingOut(true);
//         localStorage.removeItem('token');
//         router.push('/');
//     };

//     return (
//         <div className="bg-black text-white p-3">
//             <div className="container mx-auto flex justify-between items-center">
//                 <div className="flex items-center space-x-2">
//                     <FontAwesomeIcon icon={faPhone} className="h-3 w-3" />
//                     <span>(+92) 333 1906382</span>
//                 </div>
//                 <div className="flex items-center space-x-4 mr-20">
//                     {typeof window !== 'undefined' && localStorage.getItem('token') ? (
//                         <button 
//                             onClick={logout} 
//                             disabled={isLoggingOut} 
//                             className={`flex items-center space-x-2 text-white hover:text-gray-300 ${isLoggingOut ? 'opacity-50 cursor-not-allowed' : ''}`}
//                         >
//                             <FontAwesomeIcon icon={faSignOutAlt} />
//                             <span>Logout</span>
//                         </button>
//                     ) : (
//                         <Link href="/Login">
//                             <div className="flex items-center space-x-2">
//                                 <FontAwesomeIcon icon={faSignInAlt} />
//                                 <span>Login</span>
//                             </div>
//                         </Link>
//                     )}
//                     <Link href="/signup">
//                         <div className="flex items-center space-x-2">
//                             <FontAwesomeIcon icon={faUserPlus} />
//                             <span>SignUp</span>
//                         </div>
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default TopNavbarCom;
