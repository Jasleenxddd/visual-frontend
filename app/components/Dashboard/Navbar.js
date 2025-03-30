'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import MobileSidebar from "../Dashboard/MobileSidebar";
import VerticalStepper from "./VerticalStepper/verticalStepper";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(""); // Initialize state for username

  // const handleSignOut = () => {
  //   localStorage.clear()
  // document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
  // window.location.href = '/login'
  // };

  const handleProfile = () => {
    window.location.href = '/profile'
  }

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <>
      <div className="flex items-center p-4">
        <MobileSidebar />
        <div className="flex w-full justify-between space-x-4">
          {/* <button
            onClick={handleSignOut}
            className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition"
          >
            Sign Out
          </button> */}
          {/* <div className="px-4 py-2 font-semibold">Hello {username}! What can I do for you?</div> */}
          {/* <button
            onClick={handleProfile}
            className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition"
          >
            My Profile
          </button> */}
        </div>
      </div>

    </>
  );
};

export default Navbar;