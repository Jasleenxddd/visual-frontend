'use client';

import React, { useContext } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AuthContext from './components/AuthContext';
import Page from './page';
import Student from './student/page';
import Teacher from './teacher/page';
import ResultsPage from './ResultsPage';
import SignIn from './login/page';
import SignUp from './signup';
import VerifyOtp from './verify-otp/page';
import HistoryDetailPage from './history/[id]/page';
import Dashboard from "../app/dashboard/page";
import Pricing from './pricing/page';
import { useRouter } from 'next/router';

function App() {
  const { authToken } = useContext(AuthContext);
  const router = useRouter();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!authToken && router.pathname === '/dashboard') {
      router.push('/login');
    }
  }, [authToken, router]);

  return (
    <GoogleOAuthProvider clientId="208921631978-08ecoilbsi6fh3aelms0mel28l0vvilr.apps.googleusercontent.com"> {/* Replace with your actual client ID */}
      <div>
        {router.pathname === '/' && <Page />}
        {router.pathname === '/login' && <SignIn />}
        {router.pathname === '/signup' && <SignUp />}
        {router.pathname === '/verify-otp' && <VerifyOtp />}
        {router.pathname === '/history' && <HistoryDetailPage />}
        {router.pathname === '/pricing' && <Pricing />}
        {router.pathname === '/results' && <ResultsPage />}
        {router.pathname === '/teacher' && <Teacher />}
        {router.pathname === '/student' && <Student />}
        {authToken && router.pathname === '/dashboard' && <Dashboard />}
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;