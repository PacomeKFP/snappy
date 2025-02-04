"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/auth';

export const OrganizationAuth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const [status, setStatus] = useState<string | null>(null);

  const { loginOrganization, registerOrganization } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
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
  );
};