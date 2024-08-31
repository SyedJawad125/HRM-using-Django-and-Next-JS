import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import AxiosInstance from "@/components/AxiosInstance";
import { AuthContext } from "@/components/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const router = useRouter();
  const { login } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { username, password };
      const response = await AxiosInstance.post('/user/login', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const { token, permissions, role } = response.data.data;
        login(token, permissions, role); // Pass token, permissions, and role to the login function
        router.push("/admindashboard");
      }
    } catch (error) {
      toast.error("Your username or password is incorrect", {
        position: "top-center",
        autoClose: 3000,
      });
      console.error('Login error:', error);
    }
  };

  const handleSignup = () => {
    router.push("/signup");
  };

  const handleForgetpassword = () => {
    router.push("/forgetpassword");
  };

  const handleGooglelogin = () => {
    router.push("/googlelogin");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-700">
      <ToastContainer />
      <div className="w-full max-w-md">
        <div className="bg-black shadow-md rounded-lg p-8 mt-5">
          <h3 className="text-center text-2xl font-semibold">Login</h3>
          <form onSubmit={handleSubmit}>
            <label className="block text-sm font-medium text-gray-500 mb-2">User Name</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Username"
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <label className="block text-sm font-medium text-gray-500 mt-2 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="w-full text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <span
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="text-black" />
              </span>
            </div>
            <button type="submit" className="w-full mt-5 bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4">
              Login
            </button>
          </form>
          <div className="flex justify-end mt-4">
            <button 
              onClick={handleSignup} 
              className="w-1/4 bg-red-600 text-white font-semibold py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500">
              Signup
            </button>
          </div>
          <div className="flex justify-end">
            <button 
              onClick={handleGooglelogin} 
              className="block py-2 px-4 bg-green-700 rounded hover:bg-green-500 text-center cursor-pointer mt-2">
              Google Login
            </button>
          </div>  
          <div className="flex justify-end">
            <button 
              onClick={handleForgetpassword} 
              className="block py-2 px-4 bg-blue-600 rounded hover:bg-blue-500 text-center cursor-pointer mt-2">
              Forget Password
            </button>
          </div> 
        </div>
      </div>
    </div>
  );
};

export default Login;