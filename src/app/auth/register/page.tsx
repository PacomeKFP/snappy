'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import bg from '@/assets/Mask group.png'; 
import bg_login from '@/assets/bg_login.jpg'; 
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface User {
  username: string;
  email: string;
  password: string;
}

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<User>({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log(response);

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const userData = await response.json();
      
      if (userData) {
        // Stocker les informations de l'utilisateur si nécessaire
        localStorage.setItem('user', JSON.stringify(userData));
        // Rediriger vers la page de login après inscription réussie
        router.push('/login');
      } else {
        setError('Registration failed');
      }
    } catch (error) {
      setError('An error occurred during registration');
      console.error('Registration error:', error);
    }
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
      {/* Container principal avec la boîte d'inscription */}
      <div className="flex flex-col lg:flex-row h-auto lg:h-3/4 w-11/12 max-w-6xl rounded-2xl bg-snappy-gray mx-auto my-auto shadow-lg">
        {/* Section gauche avec l'image */}
        <div className="flex-1 relative rounded-t-2xl lg:rounded-l-2xl lg:rounded-t-none overflow-hidden">
          <Image
            src={bg}
            alt="Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-snappy-dark-blue bg-opacity-70 text-snappy-white p-8">
            <h1 className="text-4xl md:text-5xl font-bold text-[#ffffff] mb-4">Join Snappy</h1>
            <p className="text-center text-[#ffffff] mb-8 text-sm md:text-base">
              Connect with friends and colleagues, discover new opportunities, and grow your network with Snappy.
            </p>
            <Link 
              href="/login"
              className="bg-[#247EE4] text-[#ffffff] px-4 py-2 md:px-6 md:py-3 rounded-md hover:bg-[#0069E0] transition duration-300"
            >
              Already Have An Account?
            </Link>
          </div>
        </div>

        {/* Section droite avec le formulaire d'inscription */}
        <div className="flex-1 flex justify-center items-center bg-[#ffffff] rounded-b-2xl lg:rounded-r-2xl lg:rounded-b-none p-6 lg:p-0">
          <form onSubmit={handleSubmit} className="w-full max-w-sm">
            <h2 className="text-2xl md:text-3xl font-bold text-[#247EE4] mb-6 md:mb-8 text-center">Create Your Account</h2>
            
            {error && (
              <div className="mb-4 p-2 bg-red-100 text-red-600 rounded-md text-center">
                {error}
              </div>
            )}

            {/* Nom d'utilisateur */}
            <div className="mb-4 md:mb-6">
              <label htmlFor="username" className="block text-snappy-black mb-2">User Name</label>
              <input 
                type="text" 
                id="username" 
                name="username" 
                value={formData.username}
                onChange={handleChange}
                required 
                className="w-full p-2 md:p-3 bg-[#D9D9D9] border-2 border-[#D9D9D9] rounded-md focus:outline-none focus:ring-2 focus:ring-snappy-first-blue"
              />
            </div>

            {/* Email */}
            <div className="mb-4 md:mb-6">
              <label htmlFor="email" className="block text-snappy-black mb-2">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                required 
                className="w-full p-2 md:p-3 bg-[#D9D9D9] border-2 border-[#D9D9D9] rounded-md focus:outline-none focus:ring-2 focus:ring-snappy-first-blue"
              />
            </div>

            {/* Mot de passe */}
            <div className="mb-4 md:mb-6">
              <label htmlFor="password" className="block text-snappy-black mb-2">Password</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                value={formData.password}
                onChange={handleChange}
                required 
                className="w-full p-2 md:p-3 bg-[#D9D9D9] border-2 border-[#D9D9D9] rounded-md focus:outline-none focus:ring-2 focus:ring-snappy-first-blue"
              />
            </div>

            <button 
              type="submit" 
              className="w-full p-2 md:p-3 bg-[#247EE4] text-[#ffffff] rounded-md focus:outline-none focus:ring-2 focus:ring-snappy-first-blue hover:bg-snappy-second-blue transition duration-300"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;