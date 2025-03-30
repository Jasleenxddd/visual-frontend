import React, { useState } from 'react';
import Image from 'next/image';
import './step1.css';
import textBlack from '@/assets/text-black.png';
import topicBlack from '@/assets/topic-black.png';
import urlBlack from '@/assets/url-black.png';
import youtubeBlack from '@/assets/youtube-black.png';
import fileBlack from '@/assets/file-black.png';
import imageBlack from '@/assets/image-black.png';
import audioBlack from '@/assets/audio-black.png';
import videoBlack from '@/assets/video-black.png';
import textWhite from '@/assets/text-white.png';
import topicWhite from '@/assets/topic-white.png';
import urlWhite from '@/assets/url-white.png';
import youtubeWhite from '@/assets/youtube-white.png';
import fileWhite from '@/assets/file-white.png';
import imageWhite from '@/assets/image-white.png';
import audioWhite from '@/assets/audio-white.png';
import videoWhite from '@/assets/video-white.png';

const Step1 = ({ setCanContinue, setSelectedStep1 }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const boxes = [
    { 
      id: 1, 
      title: 'Text', 
      text: 'Enter your text, and Prashna AI will generate insightful questions.',
      whiteIcon: textWhite,
      blackIcon: textBlack
    },
    { 
      id: 2, 
      title: 'Topic', 
      text: 'Define your topic, and get precise, relevant questions tailored to it.',
      whiteIcon: topicWhite,
      blackIcon: topicBlack
    },
    { 
      id: 3, 
      title: 'URL', 
      text: 'Paste a webpage link, and extract key questions from its content.',
      whiteIcon: urlWhite,
      blackIcon: urlBlack
    },
    { 
      id: 4, 
      title: 'YouTube URL', 
      text: 'Provide a YouTube video link, and get AI-generated questions.',
      whiteIcon: youtubeWhite,
      blackIcon: youtubeBlack
    },
    { 
      id: 5, 
      title: 'File', 
      text: 'Upload documents, and let AI generate structured questions.',
      whiteIcon: fileWhite,
      blackIcon: fileBlack
    },
    { 
      id: 6, 
      title: 'Image', 
      text: 'Upload an image, and get AI-powered question generation from it.',
      whiteIcon: imageWhite,
      blackIcon: imageBlack
    },
    // { 
    //   id: 7, 
    //   title: 'Audio', 
    //   text: 'Convert speech to text and generate questions from audio insights.',
    //   whiteIcon: audioWhite,
    //   blackIcon: audioBlack
    // },
    // { 
    //   id: 8, 
    //   title: 'Video', 
    //   text: 'Extract content from videos and generate relevant questions.',
    //   whiteIcon: videoWhite,
    //   blackIcon: videoBlack
    // },
  ];

  const handleSelection = (box) => {
    setSelectedOption(box.id);
    setSelectedStep1({ id: box.id, title: box.title });
    setCanContinue(true);
  };

  return (
    <div className="step1">
      <div className="small-grid-container mobile-grid ">
        {boxes.map((box) => (
          <div
            className={`small-grid-box ${selectedOption === box.id ? 'selected' : ''}`}
            key={box.id}
            onClick={() => handleSelection(box)}
          >
            <div className="small-box-icon-container">
              {selectedOption === box.id ? (
                <Image 
                  src={box.blackIcon} 
                  alt={`${box.title} icon`} 
                  width={32} 
                  height={32} 
                />
              ) : (
                <Image 
                  src={box.whiteIcon} 
                  alt={`${box.title} icon`} 
                  width={32} 
                  height={32} 
                />
              )}
            </div>
            <div className="small-box-text-container">
              <h3 className="small-box-title">{box.title}</h3>
              <p className="small-box-text">{box.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Step1;