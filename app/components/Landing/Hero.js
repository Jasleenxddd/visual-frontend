"use client"

import Link from "next/link";
import React from "react";
import Image from "next/image";
import img1 from "@/assets/image-1.svg";
import hero from "@/assets/hero.png";

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      //setIsMenuOpen(false); 
  }
};

function Hero() {
  return (
    <div className="hero-section flex flex-wrap items-center justify-between  sm:px-8 lg:px-8 mx-4 sm:mx-4 lg:mx-6 my-6 sm:my:4 lg:my:8 ">
      {/* Left Container */}
      <div className="left-container w-full md:w-1/2 max-w-lg">
        <h1 className=" text-3xl sm:text-4xl lg:text-5xl font-bold ">
        Transform Your Content into Questions Instantly with Prashna AI!
        </h1>
        
        <p className="left-para text-sm sm:text-base lg:text-lg mt-4 text-gray-700">
        Instantly generate questions from PDFs, videos, audio, or text—perfect for educators, students, and professionals.
        </p>
        <Link href="/signup" className="inline-block">
          <button className="start-btn px-6 py-3 lg:py-4 mt-6 rounded-full bg-blue-500 text-white text-sm lg:text-base font-semibold hover:bg-blue-600 transition">
            Start for free
          </button>
        </Link>
        <button onClick={()=> scrollToSection("learn")} className="start-btn px-6 py-3 ml-3 lg:py-4 mt-6 rounded-full bg-blue-500 text-white text-sm lg:text-base font-semibold hover:bg-blue-600 transition">
            Learn More
          </button>
      </div>

      {/* Right Container */}
      <div className="right-container w-full md:w-1/2 mt-8 md:mt-0 flex items-center justify-center">
        <Image 
          src={hero} 
          alt="Illustration" 
          className="w-full max-w-xl h-auto"
          priority 
        />
      </div>
    </div>
  );
}

export default Hero;