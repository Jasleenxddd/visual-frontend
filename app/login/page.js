import SignInForm from '../components/SignInForm';
import { getProviders } from 'next-auth/react';
import Link from 'next/link';

export default async function SignIn() {
  const providers = await getProviders() || {};
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/">
          <img 
            src="/images/logo.png" 
            alt="Prashna AI Logo" 
            className="mx-auto h-24 w-auto cursor-pointer" 
          />
        </Link>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 mb-6">
            Sign in to your account
          </h2>
          <SignInForm providers={providers} />
        </div>
      </div>
    </div>
  );
}
