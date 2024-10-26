/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React from 'react';
import Image from 'next/image';
import bg from '@/assets/Mask group.png';
import bg_login from '@/assets/bg_login.jpg';
import Link from 'next/link';

const LoginPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    console.log('Login attempted');
  };

  return (
    <div 
      className="flex flex-col lg:flex-row h-screen bg-snappy-white" 
      style={{
        backgroundImage: `url(${bg_login.src})`,  
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Container principal avec la boîte de connexion */}
      <div className="flex flex-col lg:flex-row h-auto lg:h-3/4 w-11/12 max-w-6xl rounded-2xl bg-[#D9D9D9] mx-auto my-auto shadow-lg">
        {/* Section gauche avec l'image */}
        <div className="flex-1 relative rounded-l-2xl lg:rounded-l-2xl lg:rounded-t-none overflow-hidden">
          <Image
            src={bg}
            alt="Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-snappy-dark-blue bg-opacity-70 text-snappy-white p-8">
            <h1 className="text-4xl md:text-5xl font-bold text-[#ffffff] mb-4">Snappy</h1>
            <p className="text-center text-[#ffffff] mb-8 text-sm md:text-base">
              Welcome to Snappy, connect with friends and colleagues either for friendly conversations or for business group meetings.
            </p>
            <Link 
              href="/register"
              className="bg-[#247EE4] text-[#ffffff] px-4 py-2 md:px-6 md:py-3 rounded-md hover:bg-[#0069E0] transition duration-300"
            >
              Create An Account
            </Link>
          </div>
        </div>

        {/* Section droite avec le formulaire de connexion */}
        <div className="flex-1 flex justify-center items-center bg-[#ffffff] rounded-b-2xl lg:rounded-r-2xl lg:rounded-b-none p-6 lg:p-0">
          <form onSubmit={handleSubmit} className="w-full max-w-sm">
            <h2 className="text-2xl md:text-3xl font-bold text-[#247EE4] mb-6 md:mb-8 text-center">Log In</h2>
            <div className="mb-4 md:mb-6">
              <label htmlFor="username" className="block text-snappy-black mb-2">Username</label>
              <input 
                type="text" 
                id="username" 
                name="username" 
                required 
                className="w-full p-2 md:p-3 bg-[#D9D9D9] border-2 border-[#D9D9D9] rounded-md focus:outline-none focus:ring-2 focus:ring-snappy-first-blue"
              />
            </div>
            <div className="mb-4 md:mb-6">
              <label htmlFor="password" className="block text-snappy-black mb-2">Password</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                required 
                className="w-full p-2 md:p-3 bg-[#D9D9D9] border-2 border-[#D9D9D9] rounded-md focus:outline-none focus:ring-2 focus:ring-snappy-first-blue"
              />
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 md:mb-6">
              <label className="flex items-center mb-2 md:mb-0">
                <input type="checkbox" name="remember" className="mr-2" />
                <span className="text-snappy-black">Remember Me</span>
              </label>
              <a href="/forgot-password" className="text-snappy-first-blue hover:underline text-sm md:text-base">
                Forgot Password?
              </a>
            </div>
            <button 
              type="submit" 
              className="w-full p-2 md:p-3 bg-[#247EE4] text-[#ffffff] rounded-md focus:outline-none focus:ring-2 focus:ring-snappy-first-blue hover:bg-snappy-second-blue transition duration-300"
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