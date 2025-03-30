import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Button } from '@/components/ui/button';
import "./step2.css";
import { CircularProgress } from "@mui/material";

const useSubscriptionStatus = () => {
  const [subscriptionStatus, setSubscriptionStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [teamMemberStatus, setTeamMemberStatus] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const subscriptionStatus = localStorage.getItem('subscribed');
      const teamMemberStatus = localStorage.getItem('isTeamMember') === 'true';
      setTeamMemberStatus(teamMemberStatus);
      setSubscriptionStatus(subscriptionStatus);
      setLoading(false);
    }
  }, []);

  return { subscriptionStatus, teamMemberStatus, loading };
};

const Step2 = ({ selectedStep1, setCanContinue, setSelectedStep2, selectedStep2 }) => {
  const [inputValue, setInputValue] = useState(selectedStep2 || "");
  const [fileData, setFileData] = useState(null);
  const [fileUploadSuccess, setFileUploadSuccess] = useState(false);
  const { subscriptionStatus, teamMemberStatus, loading: subscriptionLoading } = useSubscriptionStatus();

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setSelectedStep2(value);
  };

  const handleFileChange = (event) => {
    try {
      if ([7, 8].includes(selectedStep1) && subscriptionStatus === "free" && teamMemberStatus === false) {
        toast.error("Please subscribe or join a team to upload audio and video files.");
        setTimeout(() => {
          if (typeof window !== 'undefined') {
            window.location.href = '/pricing'
          }
        }, 1000);
        return;
      }

      const file = event.target.files[0];
      if (!file) {
        throw new Error("No file selected. Please upload a valid file.");
      }

      setFileData(file);
      setSelectedStep2(file);
      setFileUploadSuccess(true);
      
      toast.success("File uploaded successfully!");
    } catch (error) {
      console.error("File upload failed:", error.message);
      toast.error(`Error: ${error.message}`);
      setFileUploadSuccess(false);
    }
  };

  useEffect(() => {
    const isFileInput = [5, 6, 7, 8].includes(selectedStep1);
    const isValidInput = isFileInput ? fileUploadSuccess : inputValue.trim() !== "";
    setCanContinue(isValidInput);
  }, [inputValue, fileUploadSuccess, selectedStep1, setCanContinue]);

  const renderInput = () => {
    if ([7, 8].includes(selectedStep1) && subscriptionStatus === "free" && teamMemberStatus === false) {
      return (
        <div className="subscription-required">
          <p className="text-red-700 py-5">This feature requires a subscription or team membership.</p>
          <Button 
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.location.href = '/pricing';
              }
            }}
            variant="contained"
          >
            Upgrade Now
          </Button>
        </div>
      );
    }

    switch (selectedStep1) {
      case 1:
        return (
          <textarea
            style={{ height: "200px" }}
            placeholder="Enter text"
            className="step2-input text-input"
            value={inputValue}
            onChange={handleInputChange}
          />
        );
      case 2:
        return (
          <input
            type="text"
            placeholder="Enter topic"
            className="step2-textarea text-input"
            value={inputValue}
            onChange={handleInputChange}
          />
        );
      case 3:
        return (
          <input
            type="url"
            placeholder="Enter URL"
            className="step2-input text-input"
            value={inputValue}
            onChange={handleInputChange}
          />
        );
      case 4:
        return (
          <input
            type="url"
            placeholder="Enter URL"
            className="step2-input text-input"
            value={inputValue}
            onChange={handleInputChange}
          />
        );
      case 5:
        return (
          <input
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            className="step2-input file-input"
            onChange={handleFileChange}
          />
        );
      case 6:
        return (
          <input
            type="file"
            accept="image/*"
            className="step2-input file-input"
            onChange={handleFileChange}
          />
        );
      case 7:
        return (
          <input
            type="file"
            accept="audio/*"
            className="step2-input file-input"
            onChange={handleFileChange}
          />
        );
      case 8:
        return (
          <input
            type="file"
            accept="video/*"
            className="step2-input file-input"
            onChange={handleFileChange}
          />
        );
      default:
        return <p>Invalid option selected. Please try again.</p>;
    }
  };

  if (subscriptionLoading) {
    return <CircularProgress />;
  }

  return (
    <div className="step2-container">
      {renderInput()}
    </div>
  );
};

export default Step2;