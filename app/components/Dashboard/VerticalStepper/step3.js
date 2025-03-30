import React, { useState, useEffect } from 'react';

const Step3 = ({ setCanContinue, step3Data, setStep3Data }) => {
  const { questionType, difficulty, numQuestions } = step3Data;

  const validateSelections = () => {
    setCanContinue(questionType && difficulty && numQuestions);
  };

  useEffect(() => {
    validateSelections();
  }, [questionType, difficulty, numQuestions, setCanContinue]);

  return (
    <div className="w-full py-4">
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 min-w-[275px]">
          <div className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col ">
            <label className="text-gray-700 font-semibold mb-2 ">
              Question Type
            </label>
            <select
              value={questionType}
              onChange={(e) => setStep3Data({ ...step3Data, questionType: e.target.value })}
              className="w-full h-10 px-3  rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 mb-2"
            >
              <option value="">Question Type</option>
              <option value="mcqs">MCQs</option>
              <option value="boolean">True or False</option>
              <option value="fill_up">Fill in the Blanks</option>
              <option value="match_up">Match the Following</option>
            </select>
            {/* {questionType && (
              <div className="text-blue-600 text-sm font-medium mt-auto">
                {questionType.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </div>
            )} */}
          </div>
        </div>

        <div className="flex-1 min-w-[275px]">
          <div className="bg-white rounded-lg border border-gray-200 p-4  flex flex-col">
            <label className="text-gray-700 font-semibold mb-2">
              Difficulty Level
            </label>
            <select
              value={difficulty}
              onChange={(e) => setStep3Data({ ...step3Data, difficulty: e.target.value })}
              className="w-full h-10 px-3  rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 mb-2"
            >
              <option value="">Difficulty Level</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            {/* {difficulty && (
              <div className="text-blue-600 text-sm font-medium mt-auto">
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </div>
            )} */}
          </div>
        </div>

        <div className="flex-1 min-w-[275px]">
          <div className="bg-white rounded-lg border border-gray-200 p-4  flex flex-col">
            <label className="text-gray-700 font-semibold mb-2">
              Number of Questions
            </label>
            <select
              value={numQuestions}
              onChange={(e) => setStep3Data({ ...step3Data, numQuestions: e.target.value })}
              className="w-full h-10 px-3  rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 mb-2"
            >
              <option value="">Number of Questions</option>
              <option value="5">5 Questions</option>
              <option value="10">10 Questions</option>
              <option value="15">15 Questions</option>
            </select>
            {/* {numQuestions && (
              <div className="text-blue-600 text-sm font-medium mt-auto">
                {numQuestions} Questions
              </div>
            )} */}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Step3;