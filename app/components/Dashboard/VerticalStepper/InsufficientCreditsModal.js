'use client';
import React from 'react';
import { useRouter } from 'next/navigation';  
import { X } from 'lucide-react';  

const InsufficientCreditsModal = ({ show, onClose }) => {
  const router = useRouter();
  
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="text-center">
          <h3 className="text-lg font-medium mb-2">You're out of credits! ⚡</h3>
          <p className="mb-2">Upgrade your plan or wait for your next free credits.</p>
          <p className="mb-6">Check out our subscription plans to continue generating questions.</p>
          
          <button
            onClick={() => router.push('/pricing')}
            className="w-full bg-blue-600 text-white rounded-lg py-2 px-4 hover:bg-blue-700 transition-colors"
          >
            Upgrade Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsufficientCreditsModal;