"use client";
import Header from "../components/Header";
import Tabs from "../components/Tabs";
import InputSection from "../components/InputSection";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Dashboard/VerticalStepper/TopNav";
const Infographics = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-blue-50 px-4">
          {/* Navbar */}
          <Navbar />
      <div className="flex-1 p-4">
        <Header />
        <div className="pt-0">
          <Tabs />
        </div>
        <div className="-mt-6">
          <InputSection />
        </div>
      </div>
    </div>

  );
};

export default Infographics;
