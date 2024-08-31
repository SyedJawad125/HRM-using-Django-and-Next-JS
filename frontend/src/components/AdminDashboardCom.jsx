import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const AdminPage = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Sales',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div className="ml-5 mr-5">
      <div className="bg-green-500 p-8 shadow-md mb-5">
        <h1 className="text-3xl font-bold mb-4">Welcome To Admin Page</h1>
        <h4 className="text-xl mb-2">Admin can Add, Read, Update and Delete all data on the site</h4>
        <p className="mb-8">
          This is an E-Commerce site with many products for sale to our valuable clients, fulfilling their requirements.
        </p>
      </div>

      <div className="flex flex-col h-screen">
        {/* <header className="flex justify-between p-4 bg-green-500 text-white">
          <div className="text-2xl font-bold">Admin Dashboard</div>
          <div className="cursor-pointer">User Profile</div>
        </header> */}

        <main className="flex flex-1">
          {/* <nav className="w-52 bg-gray-200 p-4">
            <div className="my-4 cursor-pointer hover:bg-gray-300">Dashboard</div>
            <div className="my-4 cursor-pointer hover:bg-gray-300">Orders</div>
            <div className="my-4 cursor-pointer hover:bg-gray-300">Products</div>
            <div className="my-4 cursor-pointer hover:bg-gray-300">Customers</div>
          </nav> */}

          <div className="flex-1 p-8 bg-gray-800 h-3/4 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-2xl text-black font-bold mb-4">Sales Overview</h2>
                <Bar data={data} />
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 bg-black">Recent Orders</h2>
                <table className="w-full border-collapse mt-4">
                  <thead>
                    <tr className="bg-black">
                      <th className="border p-2">Order ID</th>
                      <th className="border p-2">Customer</th>
                      <th className="border p-2">Status</th>
                      <th className="border p-2">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-gray-700">
                      <td className="border p-2">001</td>
                      <td className="border p-2">John Doe</td>
                      <td className="border p-2">Shipped</td>
                      <td className="border p-2">$150.00</td>
                    </tr>
                    <tr className="bg-gray-500">
                      <td className="border p-2">002</td>
                      <td className="border p-2">Jane Smith</td>
                      <td className="border p-2">Processing</td>
                      <td className="border p-2">$200.00</td>
                    </tr>
                    <tr className="bg-gray-700">
                      <td className="border p-2">003</td>
                      <td className="border p-2">Jane Smith</td>
                      <td className="border p-2">Processing</td>
                      <td className="border p-2">$250.00</td>
                    </tr>
                    <tr className="bg-gray-500">
                      <td className="border p-2">004</td>
                      <td className="border p-2">Jane Smith</td>
                      <td className="border p-2">Processing</td>
                      <td className="border p-2">$250.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
        <footer className="p-4 bg-green-500 text-white text-center">
          © 2024 E-Commerce Admin Dashboard
        </footer>
      </div>
    </div>
  );
};

export default AdminPage;
