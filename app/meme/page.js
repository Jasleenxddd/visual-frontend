"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Navbar from "../feature/components/navbar";
import { FaHeart, FaDownload, FaEdit } from "react-icons/fa";

export default function MemePage() {
  const searchParams = useSearchParams();
  const memeText = searchParams.get("text");
  const images = JSON.parse(searchParams.get("images") || "[]");
  const router = useRouter();

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-white to-blue-50 p-6">
      <Navbar />

      <div className="w-full max-w-6xl">
        <button
          onClick={() => router.back()}
          className="flex items-center bg-white shadow-md px-4 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          ← Back
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-6">
        {images.map((url, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center transition hover:shadow-lg group relative cursor-pointer"
          >
            <img
              src={url}
              alt="Generated Meme"
              className="w-full h-auto rounded-md"
            />
            <p className="mt-3 text-gray-700 text-sm text-center font-bold">{memeText}</p>

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