import OtpForm from '../components/OtpForm';
import AuthLayout from '../components/AuthLayout';

export default function VerifyOtp() {
  return (
    <AuthLayout>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 mb-6">
        Verify Your Account
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        Please enter the OTP sent to your email or phone
      </p>
      <p className="mt-2 text-center text-sm text-gray-600">
        OTP is valid for 15 minutes
      </p>
      <OtpForm />
    </AuthLayout>
  );
}

