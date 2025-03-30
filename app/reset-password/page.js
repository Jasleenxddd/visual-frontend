'use client';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

function ResetPasswordForm() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(!confirmPasswordVisible);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!passwordMatch) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}user/verify-reset-password`,
        { newPassword: password },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setSuccess(true);
        setTimeout(() => router.push('/login'), 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
    setLoading(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordMatch(e.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordMatch(password === e.target.value);
  };

  return (
    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <h2 className="text-center text-3xl font-extrabold text-gray-900">Reset Password</h2>

      {success ? (
        <div className="text-green-600 text-center">
          Password reset successfully. Redirecting to login...
        </div>
      ) : (
        <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
          <div className="space-y-4">
            <div className="relative">
              <label htmlFor="password" className="sr-only">New Password</label>
              <input
                id="password"
                type={passwordVisible ? 'text' : 'password'}
                required
                className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="New Password"
                value={password}
                onChange={handlePasswordChange}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-2 flex items-center text-gray-500"
              >
                {passwordVisible ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
              </button>
            </div>

            <div className="relative">
              <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
              <input
                id="confirm-password"
                type={confirmPasswordVisible ? 'text' : 'password'}
                required
                className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute inset-y-0 right-2 flex items-center text-gray-500"
              >
                {confirmPasswordVisible ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
              </button>
            </div>

            <div className={`text-sm text-center ${passwordMatch ? 'text-green-600' : 'text-red-600'}`}>
              {password && confirmPassword && (passwordMatch ? 'Passwords match ✅' : 'Passwords do not match ❌')}
            </div>
          </div>

          {error && <div className="text-red-600 text-center">{error}</div>}

          <button
            type="submit"
            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md 
              ${loading || !passwordMatch ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'} 
              text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            disabled={loading || !passwordMatch}
          >
            {loading ? 'Processing...' : 'Reset Password'}
          </button>
        </form>
      )}
    </div>
  );
}

function LoadingState() {
  return (
    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <div className="text-center">Loading...</div>
    </div>
  );
}

export default function ResetPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F3F4F6] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Suspense fallback={<LoadingState />}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}