"use client";
import { Home, User } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center p-4">
      <button className="flex items-center gap-2 bg-white shadow-md px-4 py-2 rounded-xl">
        <Home className="w-5 h-5" />
        <span className="text-sm font-medium">Home</span>
      </button>
      <button className="flex items-center gap-2 bg-white shadow-md px-4 py-2 rounded-xl">
        <User className="w-5 h-5" />
        <span className="text-sm font-medium">Profile</span>
      </button>
    </nav>
  );
}
