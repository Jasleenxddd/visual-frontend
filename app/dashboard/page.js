"use client";

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Dashboard/Sidebar';
import Navbar from '../components/Dashboard/Navbar';
import VerticalStepper from '../components/Dashboard/VerticalStepper/verticalStepper';
import HistoryDetail from '../components/HistoryDetail';
import MobileSidebar from '../components/Dashboard/MobileSidebar';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ProfileComponent from "../components/ProfileComponent";
import { HistoryProvider } from '../contexts/HistoryContext';

const Dashboard = () => {
  const [selectedHistoryId, setSelectedHistoryId] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [showQuizContainer, setShowQuizContainer] = useState(false);
  const [resetStepperTrigger, setResetStepperTrigger] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedToken = typeof window !== "undefined" ? localStorage.getItem('authToken') : null;
    if (!storedToken) {
      router.push('/login');
    } else {
      setIsTokenValid(true);
      setToken(storedToken);
    }
  }, [router]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!token) return;

      const currentUserId = localStorage.getItem("userId");

      if (!currentUserId) {
        setError("User ID not found. Please log in again.");
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}user/get-details?id=${currentUserId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (response.data && response.data.user) {
          setUser(response.data.user);
        }
      } catch (err) {
        setError("Failed to load user details.");
      }
    };

    fetchUserDetails();
  }, [token]);

  const handleHistoryItemClick = (historyId) => {
    setSelectedHistoryId(historyId);
    setIsMobileMenuOpen(false);
    setShowProfile(false);
  };

  const handleNewChat = () => {
    setSelectedHistoryId(null);
    setShowProfile(false);
    setShowQuizContainer(false);
    setResetStepperTrigger(prev => !prev); 
    localStorage.removeItem('resultData');
    localStorage.removeItem('historyId');
  };

  const updateUserCredits = (newCredits) => {
    setUser(prevUser => ({
      ...prevUser,
      subscription: {
        ...prevUser.subscription,
        credits: newCredits
      }
    }));
  };

  const handleBackToStepper = () => {
    setSelectedHistoryId(null);
  };

  const handleShowProfile = () => {
    setShowProfile(true);
    setIsMobileMenuOpen(false);
  };

  const handleBackToDashboard = () => {
    setShowProfile(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (!isTokenValid) {
    return null;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <HistoryProvider>
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <div className="hidden md:flex w-72 flex-shrink-0 border-r border-gray-200">
          <Sidebar 
            onHistoryItemClick={handleHistoryItemClick} 
            handleNewChat={handleNewChat}  
          />
        </div>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" 
               onClick={toggleMobileMenu}>
            <div className="absolute left-0 top-0 h-full w-72 bg-white"
                 onClick={e => e.stopPropagation()}>
              <Sidebar onHistoryItemClick={handleHistoryItemClick} 
              handleNewChat={handleNewChat}
              />
            </div>
          </div>
        )}

        <div className="flex-1 flex flex-col w-full">
          <div className="sticky top-0 z-30 bg-white border-b border-gray-200">
            {/* <div className="flex items-center px-4 py-3 md:py-4">
              <button
                onClick={toggleMobileMenu}
                className="md:hidden mr-4 p-2 rounded-lg hover:bg-gray-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <div className="flex flex-1 items-center justify-between">
                <div className="text-sm md:text-base font-semibold truncate">
                  Hello {user?.username || 'User'}! What can I do for you?
                  <br/>
                  <span className="text-xs md:text-sm text-gray-500">
                    Credits Remaining: {user?.subscription?.credits || 0}
                  </span>
                </div>
                
                <div className="flex-shrink-0 ml-4">
                  {!showProfile ? (
                    <button
                      onClick={handleShowProfile}
                      className="text-white bg-blue-500 hover:bg-blue-600 px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base rounded-lg transition"
                    >
                      My Profile
                    </button>
                  ) : (
                    <button
                      onClick={handleBackToDashboard}
                      className="text-white bg-blue-500 hover:bg-blue-600 px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base rounded-lg transition"
                    >
                      Back
                    </button>
                  )}
                </div>
              </div>
            </div> */}
          </div>

          <div className="flex-1 overflow-auto bg-[#F2F1FA]">
          <Container maxWidth="lg" className="px-4">
            <Box className="w-full">
            {!showProfile ? (
          selectedHistoryId ? (
            <HistoryDetail historyId={selectedHistoryId} />
          ) : (
            <VerticalStepper className="w-full" />

          )
        ) : (
          <ProfileComponent />
        )}
            </Box>
          </Container>
        </div>
      </div>
    </div>
    </HistoryProvider>
  );
};

export default Dashboard;