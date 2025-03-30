"use client";

import React from "react";
import "./readOnlyStep.css";

const ReadOnlyStep = ({ title, options, selectedOption }) => {
  return (
    <div className="read-only-step-container">
      <h2 className="read-only-step-title">{title}</h2>
      <div className="read-only-step-options">
        {options.map((option) => (
          <div
            key={option.id}
            className={`read-only-step-option ${
              selectedOption === option.title ? "selected" : ""
            }`}
          >
            <img
              src={option.image}
              alt={option.title}
              className="read-only-step-option-image"
            />
            <div className="read-only-step-option-details">
              <h3>{option.title}</h3>
              <p>{option.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadOnlyStep;
