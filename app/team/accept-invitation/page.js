"use client";
import { useState, useEffect } from 'react';
import React from 'react';
import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

function AcceptInvitationContent() {
  const [status, setStatus] = useState('loading');
  const [redirectMessage, setRedirectMessage] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const verifyInvitation = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/team/accept-invitation?token=${token}`, {
        method: 'GET',
      });

      const data = await response.json();

      if (data.success) {
        if (data.status === 'NEEDS_SIGNUP') {
          setRedirectMessage('Verification Pending');
          setStatus('pending');
          setTimeout(() => {
            router.push(`/signup?email=${encodeURIComponent(data.email)}&invitationToken=${encodeURIComponent(token)}`);
          }, 3000);
        } else if (data.status === 'NEEDS_SIGNIN') {
          setRedirectMessage('Verification Successful');
          setStatus('success');
          setTimeout(() => {
            router.push(`/login?email=${encodeURIComponent(data.email)}&redirect=${encodeURIComponent(`/team/accept-invitation?token=${token}`)}`);
          }, 3000);
        }
      } else {
        setStatus('error');
        toast.error(data.message || 'Failed to verify invitation');
      }
    } catch (error) {
      setStatus('error');
      toast.error('An unexpected error occurred');
    }
  };

  React.useEffect(() => {
    if (token) {
      verifyInvitation();
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        {status === 'loading' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Verifying Invitation...</h2>
            <p>Please wait while we process your team invitation.</p>
          </div>
        )}
        {status === 'success' && (
          <div>
            <h2 className="text-2xl font-bold text-green-600 mb-4">{redirectMessage}</h2>
            <p>Redirecting to sign-in page...</p>
          </div>
        )}
        {status === 'pending' && (
          <div>
            <h2 className="text-2xl font-bold text-yellow-600 mb-4">{redirectMessage}</h2>
            <p>Create an Account first and then use the same invitation again</p>
            <p>Redirecting to sign-up page...</p>
          </div>
        )}
        {status === 'error' && (
          <div>
            <h2 className="text-2xl font-bold text-red-600 mb-4">Invitation Error</h2>
            <p>There was a problem verifying the team invitation.</p>
            <br></br>
            <p>Reasons:</p>
            <ol>
              <li><i>The invitation link is invalid or expired.</i></li>
              <li><i>The invitation link has already been used.</i></li>
              <li><i>The Team's maximum occupancy has reached. Contact the owner for further details.</i></li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AcceptInvitationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AcceptInvitationContent />
    </Suspense>
  );
}