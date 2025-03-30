"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { FaHeart, FaDownload, FaEdit } from "react-icons/fa";
import Navbar from '../feature/components/navbar';

import vertical from "../images/1st.png";

export default function InfographicDetail() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedImage = searchParams.get("image") || vertical.src; // Default to vertical
  const topic = searchParams.get("topic") || "Ashoka the Great"; // Default topic
  const type = searchParams.get("type") || "Topic";

  // Display 4 images of the selected infographic
  const images = [selectedImage, selectedImage, selectedImage, selectedImage];

  return (
    <div className="max-w-6xl mx-auto p-8">
      <Navbar />

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
      >
        <span className="text-lg font-medium">← Back</span>
      </button>

      {/* Selected Topic Info */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-lg flex">
        <div className="w-1/3">
          <h2 className="text-lg font-bold text-blue-600">Infograph</h2>
          <p className="text-blue-600">{type}</p>
          <p className="text-gray-700 font-medium">{topic}</p>
        </div>

        {/* Infographic Display */}
        <div className="flex-1 grid grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="relative group flex justify-center cursor-pointer"
              onClick={() => router.push(`/infograph?image=${encodeURIComponent(image)}`)}
            >
              <Image
                src={image}
                alt="Generated Infographic"
                width={200}
                height={320}
                className="rounded-lg shadow-lg object-cover"
              />

              {/* Hover Icons */}
              <div className="absolute bottom-2 left-2 right-2 flex justify-between bg-white bg-opacity-90 p-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <FaHeart className="text-gray-500 cursor-pointer hover:text-red-500" />
                <FaDownload className="text-gray-500 cursor-pointer hover:text-green-400" />
                <FaEdit className="text-gray-500 cursor-pointer hover:text-blue-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
