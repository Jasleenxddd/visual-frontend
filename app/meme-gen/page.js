"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import TopNav from "../components/Dashboard/VerticalStepper/TopNav";
import mood from "../images/mm.png";
import dice from "../images/d.png";

const moodOptions = [
  { emoji: "😊", label: "Happy" },
  { emoji: "😡", label: "Angry" },
  { emoji: "😢", label: "Sad" },
  { emoji: "😲", label: "Surprise" },
  { emoji: "😆", label: "Excited" },
  { emoji: "🙃", label: "Sarcastic" },
  { emoji: "😕", label: "Confused" },
  { emoji: "😴", label: "Tired" },
];

export default function MemeGenerator() {
  const [memeText, setMemeText] = useState("");
  const [selectedMood, setSelectedMood] = useState(null);
  const [activeTab, setActiveTab] = useState(null);
  const [showMoodPopup, setShowMoodPopup] = useState(false);
  const [generatedMemes, setGeneratedMemes] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGenerateMeme = async () => {
    if (!memeText.trim()) {
      setError("Meme text cannot be empty");
      return;
    }
  
    if (!selectedMood) {
      setError("Mood is required");
      return;
    }
  
    setLoading(true);
    setError("");
  
    try {
      const userId = localStorage.getItem("userId");
  
      if (!userId) {
        setError("User not logged in");
        setLoading(false);
        return;
      }
  
      const backendUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') || 'http://localhost:80';

const response = await axios.post(`${backendUrl}/api/meme/generate-meme`, {
  userInput: memeText,
  userId: userId,
  mood: selectedMood ? selectedMood.label : "Neutral",
});



  
      const { memes, detected_emotion } = response.data;
  
      if (!memes || memes.length === 0) {
        throw new Error("No memes generated");
      }
  
      setGeneratedMemes(memes);
      console.log("Detected Emotion:", detected_emotion);
    } catch (err) {
      console.error("Error generating meme:", err);
      setError(err.response?.data?.error || "Failed to generate meme");
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-white to-blue-50 p-6">
      <TopNav />

      <h1 className="text-2xl font-bold text-center mt-16">
        Turn Your Thoughts into Hilarious Memes! with
        <br />
        <span className="text-blue-600">Visual Craft</span>
      </h1>

      <div className="grid grid-cols-2 gap-16 mt-8 relative">
        {/* Mood Selector */}
        <div
          className="relative flex flex-col items-center"
          onMouseEnter={() => setShowMoodPopup(true)}
          onMouseLeave={() => setShowMoodPopup(false)}
        >
          <button
            className={`flex flex-col items-center justify-center bg-white shadow-md rounded-xl p-6 w-full transition duration-300 hover:bg-gray-100 hover:shadow-lg ${
              activeTab === "mood" ? "bg-blue-200" : ""
            }`}
            onClick={() => setActiveTab("mood")}
          >
            <Image src={mood} alt="Mood Selector" className="w-16 h-16 mb-2" />
            <span className="text-gray-700">
              {selectedMood ? `${selectedMood.emoji} ${selectedMood.label}` : "Mood Selector"}
            </span>
          </button>

          {showMoodPopup && (
            <div className="absolute top-24 bg-white shadow-2xl rounded-2xl p-6 grid grid-cols-4 gap-6 w-64">
              {moodOptions.map((mood, index) => (
                <button
                  key={index}
                  className="flex flex-col items-center p-3 rounded-lg hover:bg-blue-100"
                  onClick={() => {
                    setSelectedMood(mood);
                    setMemeText("");
                    setShowMoodPopup(false);
                  }}
                >
                  <span className="text-3xl">{mood.emoji}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Random Meme */}
        <button
          className={`flex flex-col items-center justify-center bg-white shadow-md rounded-xl p-6 w-full transition duration-300 hover:bg-gray-100 hover:shadow-lg ${
            activeTab === "random" ? "bg-blue-200" : ""
          }`}
          onClick={() => {
            setActiveTab("random");
            setSelectedMood(null);
            setMemeText("");
          }}
        >
          <Image src={dice} alt="Random Meme" className="w-16 h-16 mb-2" />
          <span className="text-gray-700">Random Meme</span>
        </button>
      </div>

      {/* Meme Input Section */}
      <div className="bg-white mt-6 p-4 rounded-xl shadow-md w-full max-w-4xl flex flex-col">
        <textarea
          placeholder={
            selectedMood
              ? `Enter ${selectedMood.label} text`
              : activeTab === "random"
              ? "Enter random meme text"
              : "Enter Meme Text"
          }
          className="w-full focus:outline-none text-gray-700 placeholder-gray-400 resize-none h-32 p-2 rounded-lg"
          value={memeText}
          onChange={(e) => setMemeText(e.target.value)}
        />

        <div className="flex justify-end mt-4">
          <button
            onClick={handleGenerateMeme}
            disabled={loading}
            className="bg-gradient-to-r from-blue-400 to-purple-500 text-white py-2 px-4 rounded-lg hover:opacity-90"
          >
            {loading ? "Generating..." : "✨ Create Meme"}
          </button>
        </div>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Meme Display */}
      <div className="mt-6 grid grid-cols-2 gap-6">
        {generatedMemes.map((meme, index) => (
          <img key={index} src={meme.url} alt="Generated Meme" className="rounded-lg shadow-lg" />
        ))}
      </div>
    </div>
  );
}
