"use client"

import React, { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";

// Navbar component
const Navbar = ({ onUpload, onDelete, onDownload, hasImage }) => {
  const canvasRef = useRef(null); // Reference to the EditorCanvas component
  const fileInputRef = useRef(null); // Reference to the file input



const handleUpload = (e) => {
  const img = new Image();
    
const file = e.target.files[0];
if (file) {

onUpload(URL.createObjectURL(file));
img.src= URL.createObjectURL(file);
img.onload=()=>{
  const width = img.width;
  const height = img.height;

}
e.target.value = ""; 

}

};



const handleDelete = () => {

onDelete();

  if (fileInputRef.current) {
    fileInputRef.current.value = ""; // Clear the file input reference
    }
  };


  const handleDownload = async () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const imageData = await html2canvas(canvas); // Capture the edited canvas content
      const link = document.createElement("a");
      link.href = imageData.toDataURL("image/png"); // Convert canvas to PNG
      link.download = "infography.png"; // Set download file name
      link.click(); // Simulate a click to trigger download
    }
  };

  // ... rest of the component code (handleUpload, handleDelete)

  return (
    <nav
      className="fixed top-0 left-0 right-0 flex justify-between bg-white items-center px-6 py-4 shadow-lg z-50"
    >
      {/* Logo */}
      <div className="text-black text-xl font-bold">Home</div>

      {/* Image Options */}
      <div className="flex space-x-4">
        {/* Upload Image */}
        <label className="text-sm bg-gray-300 text-gray-800 px-4 py-2 rounded cursor-pointer">
          Upload Image
          <input
            ref={fileInputRef} // Attach the ref to the file input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
        </label>

        {/* Delete Image */}
        <button
          onClick={handleDelete}
          className={`text-sm px-4 py-2 rounded ${
            hasImage ? "bg-red-600 text-white" : "bg-gray-400 text-gray-300 cursor-not-allowed"
          }`}
          disabled={!hasImage}
        >
          Delete Image
        </button>

        {/* Download Image */}
        <button
          onClick={handleDownload}
          className={`text-sm px-4 py-2 rounded ${
            hasImage ? "bg-green-600 text-white" : "bg-gray-400 text-gray-300 cursor-not-allowed"
          }`}
          disabled={!hasImage}
        >
          Download Image
        </button>
      </div>
    </nav>
  );
};

export default Navbar;