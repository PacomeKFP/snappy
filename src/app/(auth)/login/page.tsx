/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React from 'react';
import Image from 'next/image';
import bg from '@/assets/bg_login.jpg';

const LoginPage: React.FC = () => {


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    console.log('Login attempted');
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 relative overflow-hidden">
        <Image
          src={bg}
          alt="Background"
          fill
          className="object-cover"
        />
        
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-snappy-dark-blue bg-opacity-70 backdrop-blur-custom text-snappy-white p-8">
          <h1 className="text-5xl mb-4">Snappy</h1>
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
          <h2 className="text-3xl text-snappy-black mb-8 text-center">Log In</h2>
          <div className="mb-6">
            <label htmlFor="username" className="block text-snappy-black mb-2">User Name</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              required 
              className="w-full p-3 border border-snappy-gray rounded-md focus:outline-none focus:ring-2 focus:ring-snappy-first-blue"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-snappy-black mb-2">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              required 
              className="w-full p-3 border border-snappy-gray rounded-md focus:outline-none focus:ring-2 focus:ring-snappy-first-blue"
            />
          </div>
          <div className="flex justify-between items-center mb-6">
            <label className="flex items-center">
              <input type="checkbox" name="remember" className="mr-2" />
              <span className="text-snappy-black">Remember Me</span>
            </label>
            <a href="/forgot-password" className="text-snappy-first-blue hover:underline">
              Forgot Password?
            </a>
          </div>
          <button 
            type="submit" 
            className="w-full bg-snappy-first-blue text-snappy-white py-3 rounded-md hover:bg-snappy-second-blue transition duration-300"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;