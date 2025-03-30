import SignUpForm from '../components/SignUpForm';
import Link from 'next/link';

export default function SignUp() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <Link href="/">
            <img 
              src="/images/logo.png" 
              alt="Prashna AI Logo" 
              className="mx-auto h-24 w-auto" 
            />
          </Link>
          </div>
    
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 mb-6">
           Create Your Account
          </h2>
          <SignUpForm />
            </div>
          </div>
        </div>
  );
}

