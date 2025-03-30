'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

export default function SignUpForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   const loadGoogleSignIn = () => {
  //     window.gapi.load('auth2', () => {
  //       window.gapi.auth2.init({
  //         client_id: '347463117720-cheui6k3te25reg6bqhvd34p38guseit.apps.googleusercontent.com',
  //       });
  //     });
  //   };

  //   if (window.gapi) {
  //     loadGoogleSignIn();
  //   } else {
  //     const script = document.createElement('script');
  //     script.src = 'https://apis.google.com/js/api.js';
  //     script.async = true;
  //     script.onload = loadGoogleSignIn;
  //     document.body.appendChild(script);
  //   }
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        if (response.status === 409) {
          setError('An account with this email already exists. Please log in instead.');
        } else {
          throw new Error('Signup failed');
        }
        return;
      }
      const data = await response.json();
      if (data.success) {
        toast.success("OTP sent successfully");
        localStorage.setItem('tempToken', data.tempToken);
        router.push('/verify-otp');
      } else {
        throw new Error('Signup failed');
      }
    } catch (err) {
      toast.error("Failed to sign up. Please try again.");
      setError('Failed to sign up. Please try again.');
      console.error('Signup error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // const handleGoogleSignIn = async () => {
  //   try {
  //     const googleAuthInstance = window.gapi.auth2.getAuthInstance();
  //     const googleUser = await googleAuthInstance.signIn();
  //     const idToken = googleUser.getAuthResponse().id_token;

  //     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user/google-auth`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ idToken }),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Google sign-in failed');
  //     }

  //     const data = await response.json();
  //     const { user, token } = data;
  //     localStorage.setItem('userId', user._id);
  //     localStorage.setItem('authToken', token);
  //     toast.success('Sign-in successful! Redirecting to dashboard...');
  //     router.push('/dashboard');
  //   } catch (err) {
  //     toast.error('Failed to sign in with Google. Please try again.');
  //     setError('Failed to sign in with Google. Please try again.');
  //     console.error('Google sign-in error:', err);
  //   }
  // };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 md:px-8 py-6">
      <Toaster position="top-right" reverseOrder={false} />
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <div className="mt-1">
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
          </div>
          <div className="mt-1 relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pr-10"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
            >
              {showPassword ? (
                <FaEyeSlash className="h-5 w-5" />
              ) : (
                <FaEye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
        {error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isLoading ? 'Signing up...' : 'Sign up'}
          </button>
        </div>
      </form>

        {/* <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div> */}

        {/* <div className="mt-6">
          <button
            onClick={handleGoogleSignIn}
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FcGoogle className="w-5 h-5 mr-2" />
            Sign up with Google
          </button>
        </div> */}
      
      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
          Sign in
        </Link>
      </p>
    </div>
  );
}
