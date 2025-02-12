"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from '@/hooks/auth';
import { useState } from 'react';

// export const metadata: Metadata = {
//   title: "Organization Authentication",
//   description: "Sign in or register your organization",
// };
const SignIn: React.FC = () => {

    const [isLogin, setIsLogin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
    const [status, setStatus] = useState<string | null>(null);
    const { loginOrganization, registerOrganization } = useAuth({middleware: 'guest', redirectIfAuthenticated: '/dashboard'});

    const handleSubmit = async (e: React.FormEvent) => {
      console.log(isLogin);
      e.preventDefault();
      if (isLogin) {
        await loginOrganization({
          email,
          password,
          setErrors,
          setStatus,
        });
      } else {
        await registerOrganization({
          name,
          email,
          password,
          setErrors,
        });
      }
    };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-boxdark-2">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-[1200px] rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
          <div className="flex flex-wrap items-center">
            <div className="w-full xl:w-1/2">
              <div className="w-full p-4 sm:p-12.5 xl:p-15">
                {/* <OrganizationAuth /> */}
                <div className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-black dark:text-white">
          {isLogin ? 'Sign In' : 'Register'} to Organization Portal
        </h2>
        <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
          {isLogin 
            ? "Don't have an organization account yet? "
            : "Already have an organization account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary hover:underline"
          >
            {isLogin ? 'Register' : 'Sign In'}
          </button>
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="mb-4">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Organization Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your organization name"
              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
            {errors.name && (
              <div className="mt-1 text-red-500">{errors.name.join(', ')}</div>
            )}
          </div>
        )}

        <div className="mb-4">
          <label className="mb-2.5 block font-medium text-black dark:text-white">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
          {errors.email && (
            <div className="mt-1 text-red-500">{errors.email.join(', ')}</div>
          )}
        </div>

        <div className="mb-6">
          <label className="mb-2.5 block font-medium text-black dark:text-white">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
          {errors.password && (
            <div className="mt-1 text-red-500">{errors.password.join(', ')}</div>
          )}
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
        >
          {isLogin ? 'Sign In' : 'Register'}
        </button>

        {status && (
          <div className="mt-4 text-center text-green-500">{status}</div>
        )}
      </form>
    </div>
              </div>
            </div>

            <div className="hidden w-full p-7.5 xl:block xl:w-1/2">
              <div className="custom-gradient-1 overflow-hidden rounded-2xl px-12.5 pt-12.5 dark:!bg-dark-2 dark:bg-none text-center">
                <Link className="mb-10 inline-block" href="/">
                  <Image
                    className="hidden dark:block"
                    src={"/images/logo/logo.svg"}
                    alt="Logo"
                    width={176}
                    height={32}
                  />
                  {/* <Image
                    className="dark:hidden"
                    src={"/images/logo/logo-dark.svg"}
                    alt="Logo"
                    width={176}
                    height={32}
                  /> */}
                  <h1 className="text-2xl font-bold text-blue-500 dark:text-blue-400 sm:text-heading-3 text-center">
                  Snappy
                </h1>

                </Link>
                <p className="mb-3 text-xl font-medium text-dark dark:text-white">
                  Organization Portal
                </p>

                <h1 className="mb-4 text-2xl font-bold text-dark dark:text-white sm:text-heading-3">
                  Welcome Back!
                </h1>

                <p className="w-full max-w-[375px] font-medium text-dark-4 dark:text-dark-6">
                  Sign in to your organization account or register a new organization
                </p>

                <div className="mt-31">
                  <Image
                    src={"/images/grids/grid-02.svg"}
                    alt="Logo"
                    width={405}
                    height={325}
                    className="mx-auto dark:opacity-30"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;