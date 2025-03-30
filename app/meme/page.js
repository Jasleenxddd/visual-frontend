"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Navbar from "../feature/components/navbar";
import { FaHeart, FaDownload, FaEdit } from "react-icons/fa";

export default function MemePage() {
  const searchParams = useSearchParams();
  const memeText = searchParams.get("text");
  const router = useRouter();

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-white to-blue-50 p-6">
      {/* Navbar */}
      <Navbar />

      {/* Back Button (Left Corner) */}
      <div className="w-full max-w-6xl">
        <button
          onClick={() => router.back()}
          className="flex items-center bg-white shadow-md px-4 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          ← Back
        </button>
      </div>

      {/* Meme Grid with Navigation on Click */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-10 mt-6">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center transition hover:shadow-lg group relative cursor-pointer"
            onClick={() => router.push(`/infograph?text=${encodeURIComponent(memeText || "")}`)}
          >
            {/* Meme Image */}
            <img
              src="https://i.imgflip.com/1bij.jpg"
              alt="Meme"
              className="w-48 h-auto rounded-md"
            />

            {/* Meme Text */}
            <p className="mt-3 text-gray-700 text-sm text-center font-bold">{memeText}</p>

            {/* Icons Section (Appears on Hover) */}
            <div className="absolute bottom-2 left-2 right-2 flex justify-between bg-white bg-opacity-90 p-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <FaHeart className="text-gray-500 cursor-pointer hover:text-red-500" />
              <FaDownload className="text-gray-500 cursor-pointer hover:text-green-400" />
              <FaEdit className="text-gray-500 cursor-pointer hover:text-blue-300" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
