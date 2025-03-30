"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { FaPaperclip, FaCoins } from "react-icons/fa6";
import Topic from "../../images/topic.png";
import Url from "../../images/url.png";
import Doc from "../../images/docc.png";

function ChooseLayout({ onLayoutChange }) {
  const [selectedOption, setSelectedOption] = useState("Vertical (9:16)");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const options = ["Vertical (9:16)", "Square (1:1)", "Horizontal (16:9)"];

  const handleSelection = (option) => {
    setSelectedOption(option);
    setDropdownOpen(false);
    onLayoutChange(option);
  };

  return (
    <div className="my-8">
      <div className="flex items-center justify-center gap-4">
        <h2 className="text-xl font-semibold">Choose your</h2>
        <div className="relative inline-block text-left">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="inline-flex items-center justify-between font-bold w-48 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 shadow-sm hover:bg-gray-100 focus:outline-none"
          >
            {selectedOption}
            <ChevronDownIcon className="ml-2 w-4 h-4" />
          </button>

          {dropdownOpen && (
            <div className="absolute z-10 mt-2 w-full rounded-md bg-white shadow-lg">
              <ul className="py-1 text-gray-700">
                {options.map((option) => (
                  <li
                    key={option}
                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                      selectedOption === option ? "font-semibold" : ""
                    }`}
                    onClick={() => handleSelection(option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Tabs() {
  const tabs = ["Topic", "Paste URL", "Paste text/ Upload doc"];
  const placeholders = [
    "Type a topic of your choice",
    "Paste a URL here...",
    "Paste your Text or upload file",
  ];
  const tabImages = [Topic, Url, Doc];

  const [activeTab, setActiveTab] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [selectedLayout, setSelectedLayout] = useState("Vertical (9:16)");
  const router = useRouter();

  const handleGenerateInfographic = () => {
    if (inputValue.trim() !== "") {
      router.push(
        `/info-d?layout=${encodeURIComponent(selectedLayout)}&input=${encodeURIComponent(inputValue)}&topic=${encodeURIComponent(inputValue)}`
      );
    }
  };
  

  return (
    <>
      <ChooseLayout onLayoutChange={setSelectedLayout} />

      <div className="flex flex-col items-center w-full">
  <div className="grid grid-cols-3 gap-4 w-full max-w-4xl">
    {tabs.map((tab, index) => (
      <button
        key={tab}
        onClick={() => setActiveTab(index)}
        className={`w-full px-6 py-4 text-center text-lg font-medium transition-colors rounded-lg border-2 flex flex-col items-center 
          shadow-md hover:shadow-lg ${
            activeTab === index
              ? "bg-gray-100  shadow-lg"
              : "bg-white  hover:bg-blue-100"
          } 
          ${
            index === 0
              ? "text-blue-600 "
              : index === 1
              ? "text-purple-600 "
              : "text-green-600 "
          }`}
      >
        <Image src={tabImages[index]} alt={tab} className="w-12 h-12 mb-2" />
        {tab}
      </button>
    ))}
  </div>
</div>


      <div className="bg-white mt-6 p-4 rounded-xl shadow-md max-w-4xl mx-auto">
        <div className="flex flex-col justify-between h-auto  p-4 rounded-lg">
          {activeTab === 0 ? (
            <textarea
              className="w-full focus:outline-none text-gray-700 h-40 resize-none placeholder-gray-400"
              placeholder={placeholders[activeTab]}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          ) : (
            <input
              type="text"
              className="w-full focus:outline-none text-gray-700 placeholder-gray-400"
              placeholder={placeholders[activeTab]}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          )}

          <div className="flex justify-end mt-4 space-x-2">
            {activeTab === 2 && (
              <label className="flex items-center bg-gray-200 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-300">
                <FaPaperclip className="mr-2 text-gray-600" />
                <span className="text-gray-700">Upload pdf/docx/txt</span>
                <input type="file" className="hidden" />
              </label>
            )}

            <button
              onClick={handleGenerateInfographic}
              className="flex items-center space-x-2 bg-gradient-to-r from-[#A485F8] to-[#E18BEA] text-white py-2 px-6 rounded-lg hover:opacity-90"
            >
              <FaCoins className="text-yellow-400" />
              <span className="text-sm">2</span>
              <span>Generate Infographic</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
