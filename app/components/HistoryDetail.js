"use client";

import React, { useState, useRef } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";

const HistoryDetail = ({ historyId }) => {
  const [historyData, setHistoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const contentRef = useRef();

  useEffect(() => {
    if (!historyId) {
      console.error("No historyId provided.");
      return;
    }
  
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
  
    if (!token) {
      setError("No authentication token found");
      setLoading(false);
      return;
    }
  
    fetch(`${process.env.NEXT_PUBLIC_API_URL}api/history/get-history?id=${historyId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Unauthorized access");
          }
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setHistoryData(data.history);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching history data:", error);
        setError(error.message || "Failed to fetch history data. Please try again later.");
        setLoading(false);
      });
  }, [historyId]);

  const generatePDF = () => {
    import("html2pdf.js").then((module) => {
      const html2pdf = module.default;
      const element = contentRef.current;
      const opt = {
        margin: 1,
        filename: `history-details-${historyId}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      };

      html2pdf().set(opt).from(element).save();
    });
  };

  const generateQuestionsOnlyPDF = () => {
    import("html2pdf.js").then((module) => {
      const html2pdf = module.default;
      
      const tempDiv = document.createElement('div');
      tempDiv.className = 'p-6';

      const title = document.createElement('h1');
      title.className = 'text-3xl font-bold mb-6';
      title.textContent = 'Questions';
      tempDiv.appendChild(title);

      historyData.results.forEach((result, index) => {
        if (result?.resultObject) {
          const questionSet = document.createElement('div');
          questionSet.className = 'mb-8';
          
          if (Array.isArray(result.resultObject) && result.resultObject.length >= 2) {
            const matchQuestion = document.createElement('div');
            matchQuestion.className = 'mb-4 p-4 bg-gray-50 rounded';
            
            const questionTitle = document.createElement('h3');
            questionTitle.className = 'font-bold mb-4';
            questionTitle.textContent = 'Match the Following:';
            matchQuestion.appendChild(questionTitle);

            const columnsDiv = document.createElement('div');
            columnsDiv.className = 'flex gap-8';

            const column1Div = document.createElement('div');
            column1Div.className = 'flex-1';
            const column1Title = document.createElement('h4');
            column1Title.className = 'font-semibold mb-2';
            column1Title.textContent = 'Column 1';
            column1Div.appendChild(column1Title);

            const column1List = document.createElement('ul');
            column1List.className = 'list-disc pl-5';
            result.resultObject[0].forEach(item => {
              const listItem = document.createElement('li');
              listItem.textContent = item.item;
              column1List.appendChild(listItem);
            });
            column1Div.appendChild(column1List);

            const column2Div = document.createElement('div');
            column2Div.className = 'flex-1';
            const column2Title = document.createElement('h4');
            column2Title.className = 'font-semibold mb-2';
            column2Title.textContent = 'Column 2';
            column2Div.appendChild(column2Title);

            const column2List = document.createElement('ul');
            column2List.className = 'list-disc pl-5';
            result.resultObject[1].forEach(item => {
              const listItem = document.createElement('li');
              listItem.textContent = item.item;
              column2List.appendChild(listItem);
            });
            column2Div.appendChild(column2List);

            columnsDiv.appendChild(column1Div);
            columnsDiv.appendChild(column2Div);
            matchQuestion.appendChild(columnsDiv);
            questionSet.appendChild(matchQuestion);

          } else if (result.resultObject.results) {
            result.resultObject.results.forEach((item, i) => {
              const questionDiv = document.createElement('div');
              questionDiv.className = 'mb-4 p-4 bg-gray-50 rounded';
              
              const questionText = document.createElement('p');
              questionText.innerHTML = `<strong>Question ${i + 1}:</strong> ${item.question}`;
              questionDiv.appendChild(questionText);

              if (Array.isArray(item.options)) {
                const optionsDiv = document.createElement('div');
                optionsDiv.className = 'ml-4 mt-2';
                const optionsTitle = document.createElement('p');
                optionsTitle.innerHTML = '<strong>Options:</strong>';
                optionsDiv.appendChild(optionsTitle);

                const optionsList = document.createElement('ul');
                optionsList.className = 'list-disc pl-5';
                item.options.forEach(option => {
                  const optionItem = document.createElement('li');
                  optionItem.textContent = option;
                  optionsList.appendChild(optionItem);
                });
                optionsDiv.appendChild(optionsList);
                questionDiv.appendChild(optionsDiv);
              }

              questionSet.appendChild(questionDiv);
            });
          }
          
          tempDiv.appendChild(questionSet);
        }
      });

      const opt = {
        margin: 1,
        filename: `questions-only-${historyId}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      };

      html2pdf().set(opt).from(tempDiv).save();
    });
  };

  const generateAnswersOnlyPDF = () => {
    import("html2pdf.js").then((module) => {
      const html2pdf = module.default;
      
      const tempDiv = document.createElement('div');
      tempDiv.className = 'p-6';
  
      const title = document.createElement('h1');
      title.className = 'text-3xl font-bold mb-6';
      title.textContent = 'Answers';
      tempDiv.appendChild(title);
  
      historyData.results.forEach((result, index) => {
        if (result?.resultObject) {
          const answerSet = document.createElement('div');
          answerSet.className = 'mb-8';
          
          if (Array.isArray(result.resultObject) && result.resultObject.length >= 3) {
            const matchAnswer = document.createElement('div');
            matchAnswer.className = 'mb-4 p-4 bg-gray-50 rounded';
            
            const questionTitle = document.createElement('h3');
            questionTitle.className = 'font-bold mb-4';
            questionTitle.textContent = 'Match the Following - Answers:';
            matchAnswer.appendChild(questionTitle);

            const answersDiv = document.createElement('div');
            answersDiv.className = 'mt-4';
            
            const answers = result.resultObject[2];
            const column1Items = result.resultObject[0];
            const column2Items = result.resultObject[1];

            const answersList = document.createElement('ul');
            answersList.className = 'list-disc pl-5';
            
            answers.forEach(answer => {
              const listItem = document.createElement('li');
              const col1Item = column1Items.find(item => item.id === answer.column1_id)?.item;
              const col2Item = column2Items.find(item => item.id === answer.column2_id)?.item;
              listItem.textContent = `${col1Item} ➔ ${col2Item}`;
              answersList.appendChild(listItem);
            });

            answersDiv.appendChild(answersList);
            matchAnswer.appendChild(answersDiv);
            answerSet.appendChild(matchAnswer);

          } else if (result.resultObject.results) {
            result.resultObject.results.forEach((item, i) => {
              const answerDiv = document.createElement('div');
              answerDiv.className = 'mb-4 p-4 bg-gray-50 rounded';
              
              const questionText = document.createElement('p');
              questionText.innerHTML = `<strong>Question ${i + 1}:</strong> ${item.question}`;
              answerDiv.appendChild(questionText);
  
              if (Array.isArray(item.options)) {
                const optionsDiv = document.createElement('div');
                optionsDiv.className = 'ml-4 mt-2';
                const optionsTitle = document.createElement('p');
                optionsTitle.innerHTML = '<strong>Options:</strong>';
                optionsDiv.appendChild(optionsTitle);
  
                const optionsList = document.createElement('ul');
                optionsList.className = 'list-disc pl-5';
                item.options.forEach(option => {
                  const optionItem = document.createElement('li');
                  optionItem.textContent = option;
                  optionsList.appendChild(optionItem);
                });
                optionsDiv.appendChild(optionsList);
                answerDiv.appendChild(optionsDiv);
              }
  
              const answerText = document.createElement('p');
              answerText.className = 'mt-2';
              answerText.innerHTML = `<strong>Correct Answer:</strong> ${item.answer}`;
              answerDiv.appendChild(answerText);
  
              const explanationText = document.createElement('p');
              explanationText.className = 'mt-2';
              explanationText.innerHTML = `<strong>Explanation:</strong> ${item.explanation}`;
              answerDiv.appendChild(explanationText);
  
              answerSet.appendChild(answerDiv);
            });
          }
          
          tempDiv.appendChild(answerSet);
        }
      });
  
      const opt = {
        margin: 1,
        filename: `answers-only-${historyId}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      };
  
      html2pdf().set(opt).from(tempDiv).save();
    });
  };
  

  const renderTrueFalseQuestions = (results) => (
    <div className="bg-gray-100 p-4 rounded-lg mb-2 overflow-x-auto">
      <h4 className="font-semibold">True/False Questions:</h4>
      {results.map((tfQuestion, tfIndex) => (
        <div key={tfIndex} className="p-4 mb-2">
          <p><strong>Question:</strong> {tfQuestion.question}</p>
          <p><strong>Answer:</strong> {tfQuestion.answer}</p>
          <p><strong>Options:</strong></p>
          <ul className="list-disc pl-5">
            {Array.isArray(tfQuestion.options) ? (
              tfQuestion.options.map((option, optionIndex) => (
                <li 
                  key={optionIndex}
                  className={tfQuestion.answer === option.charAt(0) ? "text-green-600 font-semibold" : ""}
                >
                  {option}
                </li>
              ))
            ) : (
              <li className="text-gray-600">No options available</li>
            )}
          </ul>
          <p><strong>Explanation:</strong> {tfQuestion.explanation}</p>
        </div>
      ))}
    </div>
  );

  const renderMatchUpQuestions = (resultObject) => {
    if (!Array.isArray(resultObject) || resultObject.length < 3) {
      return <p>Invalid match-up data format</p>;
    }

    const column1 = resultObject[0];
    const column2 = resultObject[1];
    const answers = resultObject[2];

    return (
      <div className="bg-gray-100 p-4 rounded-lg mb-2 overflow-x-auto">
        <h4 className="font-semibold">Match the Following:</h4>
        <div className="p-4 mb-2">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 mb-4 md:mb-0">
              <h5 className="font-semibold mb-2">Column 1</h5>
              <ul className="list-disc pl-5">
                {column1.map((item) => (
                  <li key={item.id} className="mb-2">{item.item}</li>
                ))}
              </ul>
            </div>
            <div className="w-full md:w-1/2">
              <h5 className="font-semibold mb-2">Column 2</h5>
              <ul className="list-disc pl-5">
                {column2.map((item) => (
                  <li key={item.id} className="mb-2">{item.item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-4">
            <h5 className="font-semibold mb-2">Correct Matches:</h5>
            <ul className="list-disc pl-5">
              {answers.map((answer, index) => (
                <li key={index} className="mb-2">
                  {column1.find((col1) => col1.id === answer.column1_id)?.item}{" "}
                  ➔{" "}
                  {column2.find((col2) => col2.id === answer.column2_id)?.item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const renderMCQs = (results) => (
    <div>
      <h4 className="font-semibold">Questions:</h4>
      {results.map((mcq, index) => (
        <div key={mcq.id} className="bg-gray-100 p-4 rounded-lg mb-2 overflow-x-auto">
          <h5 className="font-semibold">Question {index + 1}:</h5>
          <p className="break-words"><strong>Question:</strong> {mcq.question}</p>
          <p><strong>Options:</strong></p>
          <ul className="list-disc pl-5">
            {Array.isArray(mcq.options) ? (
              mcq.options.map((option, optionIndex) => (
                <li 
                  key={optionIndex}
                  className={`${mcq.answer === option.charAt(0) ? "text-green-600 font-semibold" : ""} break-words`}
                >
                  {option}
                </li>
              ))
            ) : (
              <li className="text-gray-600">No options available</li>
            )}
          </ul>
          <p className="break-words"><strong>Correct Answer:</strong> {mcq.answer}</p>
          <p className="break-words"><strong>Explanation:</strong> {mcq.explanation}</p>
        </div>
      ))}
    </div>
  );

  const renderFillInTheBlanks = (results) => (
    <div>
      <h4 className="font-semibold">Fill in the Blanks:</h4>
      {results.map((fib, index) => (
        <div key={fib.id} className="bg-gray-100 p-4 rounded-lg mb-2">
          <h5 className="font-semibold">Question {index + 1}:</h5>
          <p className="break-words"><strong>Question:</strong> {fib.question}</p>
          <p className="break-words"><strong>Correct Answer:</strong> {fib.answer}</p>
          <p className="break-words"><strong>Explanation:</strong> {fib.explanation}</p>
        </div>
      ))}
    </div>
  );

  const renderResultContent = (result, typeOfResults) => {
    if (!result?.resultObject) return null;

    switch (typeOfResults.toLowerCase()) {
      case 'boolean':
        return renderTrueFalseQuestions(result.resultObject.results || []);
      case 'mcqs':
        return renderMCQs(result.resultObject.results || []);
      case 'match_up':
        return renderMatchUpQuestions(result.resultObject || []);
      case 'fill_up':
        return renderFillInTheBlanks(result.resultObject.results || []);
      default:
        return <p>Unsupported result type</p>;
    }
  };

  if (loading) {
    <CircularProgress></CircularProgress>
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!historyData) {
    return <p className="text-center">No data available.</p>;
  }

  const combinedData = historyData.questions.map((question, index) => ({
    question,
    result: historyData.results?.[index] || null,
  }));

  return (
    <div className="w-full max-w-5xl mx-auto p-3 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">History Details</h1>
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <button
            onClick={generateQuestionsOnlyPDF}
            className="flex-1 md:flex-none bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-sm md:text-base"
          >
            Download Questions
          </button>
          <button
            onClick={generateAnswersOnlyPDF}
            className="flex-1 md:flex-none bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded text-sm md:text-base"
          >
            Download Answers
          </button>
          <button
            onClick={generatePDF}
            className="flex-1 md:flex-none bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm md:text-base"
          >
            Download All
          </button>
        </div>
      </div>

      <div ref={contentRef}>
        {combinedData.map(({ question, result }, index) => (
          <div key={index} className="mb-8">
            <div className="bg-white shadow-md rounded-lg p-3 md:p-4 mb-4">
              <h2 className="text-xl md:text-2xl font-semibold mb-4">Question {index + 1}</h2>
              <div className="space-y-2">
                <p className="break-words"><strong>Input:</strong> {question.typeOfQuestion}</p>
                <p className="break-words"><strong>Question:</strong> {JSON.parse(question.questionInput)}</p>
                <p><strong>Difficulty:</strong> {question.difficulty}</p>
                <p><strong>Number of Questions:</strong> {question.numberOfQuestions}</p>
                <p><strong>Type of Results:</strong> {question.typeOfResults}</p>
              </div>
            </div>

            {result ? (
              <div className="bg-white shadow-md rounded-lg p-3 md:p-4">
                <h3 className="text-lg md:text-xl font-semibold mb-4">Result for Question {index + 1}</h3>
                {renderResultContent(result, question.typeOfResults)}
              </div>
            ) : (
              <p className="text-red-500">No result available for this question.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryDetail;