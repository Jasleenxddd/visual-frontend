"use client";

import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import Navbar from "../feature/components/navbar";
import { HiViewGrid, HiViewList } from "react-icons/hi";
import Collection from '../feature/collection/page'
export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("Profile");
  const [subTab, setSubTab] = useState("Recents");
  const [viewType, setViewType] = useState("grid");

  const [name, setName] = useState("John Carter");
  const [email, setEmail] = useState("johncarter@gmail.com");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [otp, setOtp] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 relative">
      <Navbar />

      {/* Background Blur when Modal is Open */}
      {isModalOpen && <div className="fixed inset-0 bg-black opacity-40 z-10"></div>}

      {/* Profile Card */}
      <div className="bg-white shadow-lg rounded-xl p-6 mt-8 w-full max-w-6xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <FaUserCircle className="text-gray-400 text-5xl" />
          <div>
            <h2 className="text-xl font-bold">{name}</h2>
            <p className="text-gray-500">{email}</p>
          </div>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition">
          Subscribe
        </button>
      </div>

      {/* Tabs Section */}
      <div className="border border-blue-100 bg-blue-100 w-full max-w-6xl mt-6 rounded-lg flex p-2">
        {["Profile", "Security", "Collection", "Notification"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 text-center rounded-md font-medium transition-all duration-300 ${
              activeTab === tab
                ? "bg-white shadow-md text-black w-3/12 px-4"
                : "text-gray-600 flex-1"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Profile Form */}
      {activeTab === "Profile" && (
        <div className="bg-white border border-blue-100 shadow-lg rounded-xl p-6 w-full max-w-6xl mt-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-blue-100 rounded-lg mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-blue-100 rounded-lg mt-1"
            />
          </div>
          <button className="bg-blue-200 text-black px-4 py-2 rounded-lg shadow-md hover:bg-blue-300 transition">
            Save Changes
          </button>
        </div>
      )}

      {/* Change Password Form */}
      {activeTab === "Security" && (
        <div className="bg-white border border-blue-100 shadow-lg rounded-xl p-6 w-full max-w-6xl mt-6">
          <h2 className="text-xl font-bold mb-4">Change Password</h2>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Old Password</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full p-2 border border-blue-100 rounded-lg mt-1"
              placeholder="Enter your old password"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border border-blue-100 rounded-lg mt-1"
              placeholder="Enter a new password"
            />
          </div>
          <p className="text-xs text-gray-500 mb-4">*You will get a 6-digit code via email</p>
          <button
            className="bg-blue-200 text-black px-4 py-2 rounded-lg shadow-md hover:bg-blue-300 transition"
            onClick={() => setIsModalOpen(true)}
          >
            Save Changes
          </button>
        </div>
      )}

      {/* OTP Popup */}
{isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center z-20 p-16">
    <div className="bg-white p-16 ml-8 mr-8 rounded-xl shadow-2xl w-[450px] text-center">
      <h2 className="text-l font-semibold mb-6 text-gray-800">
        Please enter the 6 digit code sent to your mail to change password
      </h2>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        maxLength={5}
        className="w-full border p-3 text-center text-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
        placeholder="Enter OTP"
      />
      <div className="mt-6 flex justify-center gap-6">
        {/* <button
          className="bg-gray-300 px-6 py-3 text-lg rounded-lg shadow hover:bg-gray-400 transition"
          onClick={() => setIsModalOpen(false)}
        >
          Cancel
        </button> */}
        <button
  className="bg-blue-200 text-black font-semibold px-6 py-3 text-md rounded-lg shadow-md hover:bg-blue-300 transition"
  onClick={() => setIsModalOpen(false)}
>
  Change Password
</button>

      </div>
    </div>
  </div>
)}


 {/* Collection Section */}
 {activeTab === "Collection" && (
        <div className="bg-white border border-blue-100 shadow-lg rounded-xl p-6 w-full max-w-6xl mt-6">
          {/* Recents & Favorites Tabs */}
          <div className="flex justify-between items-center border-b pb-3">
            <div className="flex gap-4">
              {["Recents", "Favorites"].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 rounded-md font-medium ${
                    subTab === tab ? "bg-blue-500 text-white" : "text-gray-600"
                  }`}
                  onClick={() => setSubTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <HiViewGrid
                className={`cursor-pointer text-xl ${viewType === "grid" ? "text-blue-500" : "text-gray-400"}`}
                onClick={() => setViewType("grid")}
              />
              <HiViewList
                className={`cursor-pointer text-xl ${viewType === "list" ? "text-blue-500" : "text-gray-400"}`}
                onClick={() => setViewType("list")}
              />
            </div>
          </div>

          {/* Collection Items */}
          <Collection/>
        </div>
      )}



    </div>
  );
}
