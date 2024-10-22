/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React from 'react';
import Image from 'next/image';
import bg from '@/assets/Mask group.png';

const LoginPage: React.FC = () => {


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    console.log('Login attempted');
  };

  return (
    <div className="flex h-screen bg-snappy-white">
     <div className="flex h-3/4 w-3/4 rounded-2xl bg-snappy-gray mx-auto mt-20">
      <div className="flex-1 relative  ">
        <Image
          src={bg}
          alt="Background"
          fill
          className="object-cover"
        />
        
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-snappy-dark-blue bg-opacity-70  text-snappy-white p-8">
          <h1 className="text-5xl text-snappy-white mb-4">Snappy</h1>
          <p className="text-center mb-8">
            Welcome to Snappy connect with friends and colleagues either for friendly
            conversations 
          </p>
          <button
            className="bg-snappy-first-blue text-snappy-white px-6 py-3 rounded-md hover:bg-snappy-second-blue transition duration-300"
          >
            Create An Account
          </button>
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center bg-snappy-white">
        <form onSubmit={handleSubmit} className="w-4/5 max-w-md">
          <h2  className="text-3xl text-snappy-first-blue mb-8 text-center">Log In</h2>
          <div className="mb-6">
            <label htmlFor="username" className="block text-snappy-black mb-2">User Name</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              required 
              className="w-full p-3 bg-white border-2 border-snappy-gray rounded-md focus:outline-none focus:ring-2 focus:ring-snappy-first-blue"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-snappy-black mb-2">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              required 
              className="w-full p-3 bg-white border-2 border-snappy-gray rounded-md focus:outline-none focus:ring-2 focus:ring-snappy-first-blue"
            />
          </div>
          <div className="flex justify-between items-center mb-6">
            <label className="flex items-center">
              <input type="checkbox" name="remember" className="mr-2 border-2" />
              <span className="text-snappy-black">Remember Me</span>
            </label>
            <a href="/forgot-password" className="text-snappy-first-blue hover:underline">
              Forgot Password?
            </a>
          </div>
          <button 
            type="submit" 
            className="w-full p-2 bg-snappy-white text-snappy-black py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-snappy-first-blue hover:bg-snappy-second-blue transition duration-300"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
    </div>
   
  );
};

export default LoginPage;