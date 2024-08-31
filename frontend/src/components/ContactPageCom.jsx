// pages/contact.js
'use client';
import React, { useState } from 'react';
import AxiosInstance from "@/components/AxiosInstance";
import { useRouter } from 'next/navigation';


const Contact = () => {
  const [name, setname] = useState('')
  const [phone_number, setphone_number] = useState('')
  const [email, setemail] = useState('')
  const [message, setmessage] = useState('')

  const router = useRouter();

  const handleSubmit = async (e) => {
    try {
        e.preventDefault();
        const payload = {"name":name ,"phone_number":phone_number, 
          "email":email, "message":message}
        
        const response = await AxiosInstance.post('/ecommerce/contact', payload , {
        headers: {
            'Content-Type': 'application/json'
        }
        });
        if (response){
           
          console.log('Response:', response.data);
          setname('');
          setphone_number('');
          setemail('');
          setmessage('');

          router.push('/contact');
        }
    } catch (error) {
        console.error('Error:', error);
    }
    };
  
  return (
    <div className="min-h-screen bg-black-100 mt-0 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ml-56 w-3/4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white-900">Contact Us</h2>
          <p className="mt-2 text-center text-sm text-white-600">
            We'd love to hear from you!
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">Name</label>
              <input id="name" name="name" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
              placeholder="Your Name" value={name} onChange= {e => setname(e.target.value)} />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
              placeholder="Email address"  value={email} onChange= {e => setemail(e.target.value)} />
            </div>
            <div>
              <label htmlFor="phone-number" className="sr-only">Phone Number</label>
              <input id="phone-number" name="email" type="phone-number" autoComplete="phone-number" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
              placeholder="Phone Number"   value={phone_number} onChange= {e => setphone_number(e.target.value)}/>
            </div>
            <div>
              <label htmlFor="message" className="sr-only">Message</label>
              <textarea id="message" name="message" rows="4" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
              placeholder="Your Message"  value={message} onChange= {e => setmessage(e.target.value)}></textarea>
            </div>
          </div>

          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
