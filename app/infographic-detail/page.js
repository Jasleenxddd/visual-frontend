"use client";

import Image from "next/image";
import { FaDownload, FaEdit } from "react-icons/fa";
import vertical from "../images/vertical.jpg";
import { useRouter } from "next/navigation";

export default function InfographicDetail() {
  const router = useRouter();

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = vertical.src;
    link.download = "infographic.jpg";
    link.click();
  };

  const handleEdit = () => {
    router.push("/infograph"); // Navigate to Edit Infographic page
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
      {/* Header Section with Buttons */}
      <div className="flex justify-between w-full max-w-2xl items-center mb-6">
        <button
          onClick={() => router.back()}
          className="text-gray-600 hover:text-gray-800"
        >
          Close ❌
        </button>

        <div className="flex space-x-4">
          <button
            onClick={handleDownload}
            className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            <FaDownload className="mr-2" />
            Download
          </button>

          <button
            onClick={handleEdit}
            className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            <FaEdit className="mr-2" />
            Edit this Infographic
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-2xl">
        <div className="flex justify-center mb-4">
          <Image
            src={vertical}
            alt="Infographic Detail"
            className="rounded-lg object-cover"
            width={300}
            height={450}
          />
        </div>
      </div>

      {/* Separate Carousel Section */}
      <div className="mt-8 w-full max-w-4xl bg-gray-200 p-4 rounded-lg shadow-md">
        <div className="flex justify-center space-x-6">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="p-2 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <Image
                src={vertical}
                alt={`Thumbnail ${index + 1}`}
                width={75}
                height={110}
                className="cursor-pointer rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
