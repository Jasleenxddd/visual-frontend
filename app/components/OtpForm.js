'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function OtpForm() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const tempToken = localStorage.getItem('tempToken');
    if (!tempToken) {
      router.push('/signup'); 
    }
  }, []);

  const handleChange = (element, index) => {
    const value = element.value;
  
    if (value && isNaN(parseInt(value))) return false;
  
    setOtp([...otp.map((d, idx) => (idx === index ? value : d))]);
  
    if (value !== '' && element.nextSibling) {
      element.nextSibling.focus();
    }
  };
  
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      setTimeout(() => {
        const prevInput = document.querySelector(`input:nth-child(${index})`);
        if (prevInput) {
          prevInput.focus();
        }
      }, 0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const otpString = otp.join('');
    const tempToken = localStorage.getItem('tempToken');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}user/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tempToken}`,
        },
        body: JSON.stringify({ otp: parseInt(otpString) }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'OTP verification failed');
      }

      if (!data.user) {
        throw new Error('User data not found in response');
      }

      const { user, token } = data;

      localStorage.removeItem('tempToken');
      localStorage.setItem('userId', user._id);
      localStorage.setItem('authToken', token);
      localStorage.setItem('subscribed', user.subscription.status);
      console.log('User has a subscription??', user.subscription.status);
      toast.success('OTP verified successfully');
      router.push('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to verify OTP. Please try again.');
      toast.error('Failed to verify OTP. Please try again.');
      console.error('OTP verification error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center mt-6 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" reverseOrder={false} />
      <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
        <div className="flex justify-center space-x-2">
        {otp.map((data, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={data}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="w-12 h-12 text-center text-2xl border-2 border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
        ))}
        </div>

        {error && (
          <div className="text-red-600 text-sm text-center">{error}</div>
        )}

        <button
          type="submit"
          disabled={isLoading || otp.some((digit) => digit === '')}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isLoading ? 'Verifying...' : 'Verify OTP'}
        </button>
      </form>
    </div>
  );
}
