'use client';

import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import { LogOut } from "lucide-react";
import { Clock, PlusCircle } from "lucide-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { HistoryContext } from '../../contexts/HistoryContext'; // Updated import path
import { CircularProgress } from "@mui/material";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

const handleSignOut = async () => {
  try {
    const token = localStorage.getItem('authToken');
    
    if (token) {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}user/signout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
    }

    localStorage.clear();
    
    document.cookie = "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    
    toast.success("Signed out successfully");
    window.location.href = "/login";
    
  } catch (error) {
    console.error('Signout error:', error);
    
    localStorage.clear();
    document.cookie = "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    
    toast.error("Error during sign out");
  }
};

function Sidebar({ onHistoryItemClick, handleNewChat }) {
  const { historyUpdate } = useContext(HistoryContext);
  const [user, setUser] = useState("");
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem("authToken");
      setToken(savedToken);
    }
  }, []);

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
          localStorage.setItem("username", response.data.user.username);
          localStorage.setItem("isTeamMember", response.data.user.isTeamMember);
          localStorage.setItem("credits", response.data.user.subscription.credits);
        }
      } catch (err) {
        setError("Failed to load user details.");
      }
    };

    fetchUserDetails();
  }, [token]);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!token) return;

      const currentUserId = localStorage.getItem("userId");

      if (!currentUserId) {
        setError("User ID not found. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}api/history/get-summary?userId=${currentUserId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (response.data && response.data.histories) {
          setHistoryData(response.data.histories);
        }

        setLoading(false);
      } catch (err) {
        setError("Failed to load history data.");
        setLoading(false);
      }
    };

    fetchHistory();
  }, [token, historyUpdate]); 

  const renderHistoryItem = (item) => {
    if (!item.historyId || !item.questions?.length || item===undefined) {
      return null;
    }

    const firstQuestion = item.questions[0];
    // const truncatedQuestionInput = firstQuestion.questionInput?.length > 25
    //   ? `${firstQuestion.questionInput.replace(/^"|"$/g, '').replace(/\\"/g, '"')}...`
    //   : firstQuestion.questionInput.replace(/^"|"$/g, '').replace(/\\"/g, '"');

    const newQuestion = firstQuestion.questionInput.replace(/^["']|["']$|\\(["'])/g, '$1');
    const trunct = newQuestion.length > 15 ? `${newQuestion.slice(0,15)}...` : newQuestion;
    return (
      <li key={item.historyId}>
        <div
          onClick={() => onHistoryItemClick(item.historyId)}
          className="bg-gray-800 p-2.5 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-gray-700 cursor-pointer mb-2"
        >
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-gray-400 mr-2" />
            <div className="flex-1">
              <p className="text-lg text-gray-300 truncate">
                {trunct?.replace(/["\\']/g, '') || "No Description"}
              </p>
              {/* <p className="text-xs text-gray-400">
                {[
                  firstQuestion.typeOfQuestion,
                  firstQuestion.difficulty,
                  `${questionsCount} Question${questionsCount > 1 ? 's' : ''}`
                ].filter(Boolean).join(", ")}
              </p> */}
            </div>
          </div>
        </div>
      </li>
    );
  };
// h-screen to h-[100vh] - avinash

  return (
    <div className="flex flex-col bg-[#111827] text-white h-[100vh] fixed w-72">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="px-4 pt-4 bg-[#111827] shadow-md  flex items-center">
        <Link href="/dashboard" className="flex items-center gap-3">
          <img src="/images/logo.png" alt="Logo" className="h-20 w-auto" />
          <h1 className={` text-2xl font-bold ${montserrat.className}`}>Prashna AI</h1>
        </Link>
      </div>

      <div className="p-4">
        <button
          onClick={handleNewChat}  
          className="h-[50px] w-[256px] flex items-center justify-center gap-2 bg-gradient-to-tr from-[#459AFF] to-[#6054FF] text-white px-4 py-2 rounded-3xl shadow-lg transition-transform duration-300 ease-in-out hover:from-[#6054FF] hover:to-[#459AFF] hover:scale-105 hover:shadow-xl"
        >
          <PlusCircle />
          New Chat
        </button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto scrollbar-hide">
        <h3 className="text-sm font-medium text-gray-400 uppercase mb-4">Recent History</h3>
        {loading ? (
          <CircularProgress></CircularProgress>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : historyData.length > 0 ? (
          <ul>{historyData.map(renderHistoryItem)}</ul>
        ) : (
          <p className="text-gray-400">No history found</p>
        )}
      </div>

      <div className="p-4 bg-[#1F2937]">
  <Link href="/pricing">
    <button className="h-[50px] w-[256px] bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-3xl mb-4 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
      SUBSCRIBE
    </button>
  </Link>
  <div className="flex items-center justify-between">
    <p className="font-bold">
      {user.username && user.username.length > 10 
        ? `${user.username.slice(0, 20)}...` 
        : user.username || "Guest"}
    </p>
    <button
      onClick={handleSignOut}
      className="flex items-center text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg gap-2 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
    >
      <LogOut />
    </button>
  </div>
</div>
    </div>
  );
}

export default Sidebar;
