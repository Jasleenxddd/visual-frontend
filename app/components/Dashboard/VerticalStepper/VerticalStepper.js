"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "./TopNav";

import InfographIcon from "../../../images/infograph.png";
import MemeIcon from "../../../images/meme.png";
import ChartIcon from "../../../images/chart.png";
import ReelsIcon from "../../../images/reels.png";

const featureLinks = {
  infograph: "/feature/infographics",
  meme: "/meme-gen",
  charts: "/feature/flow-chart",
  reels: "/feature/reels",
};

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-blue-50 px-4">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow mt-1">
        {/* Header Section */}
        <div className="text-center mt-0">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Transform Ideas into Stunning Visuals with<br />
            <span className="text-black">VisualCraft!</span>
          </h1>
          <p className="mt-7 text-gray-600 text-lg">
            Craft Infographics, Memes, charts, presentations, and reels effortlessly.
          </p>
        </div>

        {/* Content Cards */}
        <div className="mt-10 bg-white shadow-lg rounded-2xl p-5 flex gap-x-16 max-w-2xl">
          <CardItem imageSrc={InfographIcon} title="Infograph" textColor="text-[#246BFD]" linkKey="infograph" />
          <CardItem imageSrc={MemeIcon} title="Meme" textColor="text-[#FF4D4D]" linkKey="meme" />
          <CardItem imageSrc={ChartIcon} title="Charts" textColor="text-[#2DC653]" linkKey="charts" />
          <CardItem imageSrc={ReelsIcon} title="Reels" textColor="text-[#333333]" linkKey="reels" />
        </div>
      </div>
    </div>
  );
}

function CardItem({ imageSrc, title, textColor, linkKey }) {
  const router = useRouter();

  const handleClick = () => {
    if (featureLinks[linkKey]) {
      router.push(featureLinks[linkKey]);
    }
  };

  return (
    <div
      className="flex flex-col items-center cursor-pointer transition-all duration-300 p-3"
      onClick={handleClick}
    >
      {/* Circular Hover Effect */}
      <div
        className={`w-16 h-16 flex items-center justify-center bg-white rounded-full 
        transition-all duration-300 hover:shadow-[0px_0px_20px] ${textColor}`}
      >
        <Image src={imageSrc} alt={title} width={48} height={48} className="object-contain" />
      </div>

      {/* Title Below */}
      <p className={`mt-3 text-sm font-medium ${textColor || "text-gray-900"}`}>{title}</p>
    </div>
  );
}
