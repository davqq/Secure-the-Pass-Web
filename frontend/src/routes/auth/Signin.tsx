import React, { useState } from 'react';
import logo from '@/assets/logo.svg';
import { useAuth } from '../../component/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Layout from '../../layouts/Layout';
import Input from '../../component/Input';
import Password from '../../component/Password';
import Link from '../../component/Link';
import Button from '../../component/Button';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const navigate = useNavigate();

  const { signin } = useAuth();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signin(email, password);
      navigate('/accounts');
    } catch (err) {
      setErrorText('Invalid email or password');
      console.log(err);
    }
  };

  return (
    <Layout className="flex items-center">
      <div className="mx-auto w-full max-w-md">
        <div className="text-center">
          <a href="/accounts">
            <img
              className="mx-auto h-12 w-auto text-white"
              src={logo}
              alt="Logo"
            />
          </a>
          <h2 className="mt-6 text-center text-3xl font-bold text-white">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-8 px-4 py-8 sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Email address
              </label>
              <div className="mt-1">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  autoFocus
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={errorText ? 'border-red-500' : 'border-gray-700'}
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link href="/forgot-password">Forgot password?</Link>
                </div>
              </div>
              <div className="mt-1">
                <Password
                  id="password"
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={errorText ? 'border-red-500' : 'border-gray-700'}
                  placeholder="Enter your password"
                />
              </div>
              {errorText && (
                <p className="mt-2 text-sm text-red-500">{errorText}</p>
              )}
            </div>

            <div>
              <Button type="submit" color="blue" className="w-full">
                Sign in
              </Button>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-400">
                Don't have an account?{' '}
                <Link href="/register">Sign up here</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 p-4">
        <Link href="https://www.davq.de">By David</Link>
      </div>
    </Layout>
  );
}

export default LoginPage;
