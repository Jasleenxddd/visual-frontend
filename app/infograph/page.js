// src/app/App.js
"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../components/infography/Sidebar";
import EditorCanvas from "../components/infography/EditorCanvas";
import Navbar from "../components/infography/Navbar";
import vertical from '../images/1st.png';
import { useSearchParams } from "next/navigation";


const App = () => {
  const searchParams = useSearchParams();
  const selectedImage = searchParams.get("image") || vertical.src;

  const defaultStyles = {
    text: "",
    size: 24,
    font: "Arial",
    color: "#000",
    weight: "normal",
  };

  // States for heading, subheadings, and contents
  const [heading, setHeading] = useState({ ...defaultStyles, text: "Main Heading" });

  const [subHeadings, setSubHeadings] = useState([
    { ...defaultStyles, text: "Subheading 1" },
    { ...defaultStyles, text: "Subheading 2" },
    { ...defaultStyles, text: "Subheading 3" },
    { ...defaultStyles, text: "Subheading 4" },
    { ...defaultStyles, text: "Subheading 5" }
  ]);

  const [contents, setContents] = useState([
    { ...defaultStyles, text: "Content for the first section." },
    { ...defaultStyles, text: "Content for the second section." },
    { ...defaultStyles, text: "Content for the third section." },
    { ...defaultStyles, text: "Content for the fourth section." },
    { ...defaultStyles, text: "Content for the fifth section." }
  ]);

  // States for image and other properties
  const [imageWidth, setWidth] = useState(0);
  const [imageHeight, setHeight] = useState(0);
  const [backgroundImage, setBackgroundImage] = useState(selectedImage);
  const [selectedElement, setSelectedElement] = useState(null);
  
  useEffect(() => {
    if (selectedImage) {
      const img = new Image();
      img.onload = () => {
        setWidth(img.width);
        setHeight(img.height);
      };
      img.src = selectedImage;
      setBackgroundImage(selectedImage);
    }
  }, [selectedImage]);

  const handleImageDelete = () => setBackgroundImage(null);
  const handleImageDownload = () => {
    if (backgroundImage) {
      const link = document.createElement("a");
      link.href = backgroundImage;
      link.download = "background-image.png";
      link.click();
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar
        onDelete={handleImageDelete}
        onDownload={handleImageDownload}
        hasImage={!!backgroundImage}
      />
      <div className="flex flex-grow pt-14">
        <Sidebar
          heading={heading}
          setHeading={setHeading}
          subHeadings={subHeadings}
          setSubHeadings={setSubHeadings}
          contents={contents}
          setContents={setContents}
          selectedElement={selectedElement}
          setSelectedElement={setSelectedElement}
        />
        <div className="flex justify-center items-center h-full w-full bg-gray-100">
          <EditorCanvas
            heading={heading}
            subHeadings={subHeadings}
            contents={contents}
            backgroundImage={backgroundImage}
            imageWidth={imageWidth}
            imageHeight={imageHeight}
            selectedElement={selectedElement}
            setSelectedElement={setSelectedElement}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
