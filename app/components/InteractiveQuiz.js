import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { X } from 'lucide-react';
import Image from "next/image";
import elements from '@/assets/elements.png';
import elements1 from '@/assets/elements1.png';

const InteractiveQuiz = ({ resultData }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showAnswer, setShowAnswer] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [matchUpSelections, setMatchUpSelections] = useState({
    column1: null,
    column2: null
  });
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    if (!resultData) return;

    let allQuestions = [];

    if (Array.isArray(resultData) && resultData[3] === 'match_up') {
      const matchQuestion = {
        type: 'match_up',
        question: resultData[4] || 'Match the following',
        column1: resultData[0]?.map(item => ({
          id: item.id,
          text: item.item
        })) || [],
        column2: resultData[1]?.map(item => ({
          id: item.id,
          text: item.item
        })) || [],
        answers: resultData[2] || [],
        explanation: resultData[6] || ''
      };
      allQuestions.push(matchQuestion);
    } else if (Array.isArray(resultData)) {
      allQuestions = resultData.map((q, index) => ({
        ...q,
        type: index === 3 ? 'match_up' : q.type_of_results
      }));
    } else if (resultData.results) {
      allQuestions = resultData.results.map(q => ({
        ...q,
        type: resultData.type_of_results
      }));
    }

    setQuestions(allQuestions.filter(q => q !== null));
  }, [resultData]);

  const exitQuiz = () => {
    const remainingQuestions = questions.slice(currentQuestionIndex);
    const wrongAnswers = remainingQuestions.reduce((acc, _, index) => {
      acc[currentQuestionIndex + index] = { 
        answer: null, 
        isCorrect: false 
      };
      return acc;
    }, {});

    setUserAnswers(prev => ({
      ...prev,
      ...wrongAnswers
    }));

    const correctAnswersCount = Object.values(userAnswers)
      .filter(answer => answer.isCorrect).length;

    setScore(correctAnswersCount);
    setQuizComplete(true);
  };

  const handleAnswer = (answer) => {
    if (showAnswer) return;

    const currentQuestion = questions[currentQuestionIndex];
    let isCorrect = false;

    setSelectedAnswer(answer);

    switch (currentQuestion.type) {
      case 'mcqs':
        isCorrect = answer === currentQuestion.answer;
        break;
      case 'boolean':
        isCorrect = answer.toString().toLowerCase().split('.')[0].trim() === currentQuestion.answer.toString().toLowerCase();
        break;
      case 'fill_up':
        isCorrect = answer.toLowerCase().trim() === currentQuestion.answer.toLowerCase().trim();
        break;
      case 'match_up':
        isCorrect = matchedPairs.every((pair) => {
          const correctPair = currentQuestion.answers.find(
            (ans) => ans.column1_id === pair.column1_id
          );
          return correctPair && correctPair.column2_id === pair.column2_id;
        });
        break;
      default:
        break;
    }

    setUserAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: { answer, isCorrect }
    }));

    setShowAnswer(true);
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleMatchUpSelection = (columnType, item) => {
    if (showAnswer) return;

    setMatchUpSelections(prev => ({
      ...prev,
      [columnType]: item
    }));

    if (columnType === 'column2' && matchUpSelections.column1) {
      const newPair = {
        column1_id: matchUpSelections.column1.id,
        column2_id: item.id
      };

      setMatchedPairs(prev => [...prev, newPair]);
      setMatchUpSelections({ column1: null, column2: null });
    }
  };

  const renderMatchUpQuestion = (question) => {
    if (!question.column1 || !question.column2 ||
      !Array.isArray(question.column1) || !Array.isArray(question.column2)) {
      return (
        <div className="text-red-500">
          Error: Invalid match-up question format
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          {question.column1.map((item) => (
            <Button
              key={item.id}
              onClick={() => handleMatchUpSelection('column1', item)}
              variant={matchUpSelections.column1?.id === item.id ? "primary" : "outline"}
              className="w-full justify-start"
              disabled={showAnswer || matchedPairs.some(pair => pair.column1_id === item.id)}
            >
              {item.text}
            </Button>
          ))}
        </div>
        <div className="space-y-2">
          {question.column2.map((item) => (
            <Button
              key={item.id}
              onClick={() => handleMatchUpSelection('column2', item)}
              variant={matchUpSelections.column2?.id === item.id ? "primary" : "outline"}
              className="w-full justify-start"
              disabled={showAnswer || matchedPairs.some(pair => pair.column2_id === item.id)}
            >
              {item.text}
            </Button>
          ))}
        </div>
      </div>
    );
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowAnswer(false);
      setInputValue('');
      setSelectedAnswer(null);
      setMatchUpSelections({ column1: null, column2: null });
      setMatchedPairs([]);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setShowAnswer(false);
    setQuizComplete(false);
    setInputValue('');
    setScore(0);
    setSelectedAnswer(null);
    setMatchUpSelections({ column1: null, column2: null });
    setMatchedPairs([]);
  };

  if (!questions.length) return null;

  if (quizComplete) {
    return (
      <div className="flex items-center justify-center min-h-[400px] w-full">
        <Card className="w-full max-w-md bg-white rounded-3xl shadow-lg">
          <CardContent className="pt-12 pb-8 px-6">
            <div className="flex flex-col items-center text-center gap-6">
              <div className="text-4xl mb-2">
                🎉
              </div>

              <h2 className="text-3xl font-bold">
                Congratulations!
              </h2>

              <p className="text-gray-600 text-lg">
                You've completed the questionnaire!
              </p>

              <div className="flex items-center gap-2 text-xl font-bold">
                <span>Your Score:</span>
                <span>{score}/{questions.length}</span>
              </div>

              <p className="text-gray-600 text-lg mb-4">
                Keep up the great work! What would you like to do next?
              </p>

              <Button
                onClick={resetQuiz}
                className="h-12 text-base font-semibold bg-[#1565C0] text-white border-2 hover:bg-blue-600"
                variant="contained"
              >
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  const getButtonVariant = (option) => {
    if (!showAnswer) return "outline";
    
    if (currentQuestion.type === 'mcqs' || currentQuestion.type === 'boolean') {
      if (option === currentQuestion.answer) return "success";
      
      if (option === selectedAnswer) return "contained";
      
      return "outline";
    }
    return "outline";
  };

  return (
    <Card className="w-full bg-white rounded-3xl shadow-lg relative">
        <Button
        variant="ghost"
        size="icon"
        onClick={exitQuiz}
        className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-800"
        title="Exit Quiz"
      >
        <X className="h-6 w-6" />
      </Button>
      <CardHeader>
        <CardTitle>Question {currentQuestionIndex + 1} of {questions.length}</CardTitle>
        <Progress value={(currentQuestionIndex / questions.length) * 100} className="mb-4" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-lg font-medium mb-4">
          {currentQuestion.question}
        </div>

        <div className="space-y-2">
        {currentQuestion.type === 'mcqs' && (
            <div className="grid grid-cols-1 gap-2">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(option.charAt(0))}
                  variant={getButtonVariant(option.charAt(0))}
                  className={`flex items-center justify-center px-8 py-4 rounded-lg transition-all 
                    ${showAnswer ? 'opacity-100' : ''}
                    ${option === getButtonVariant(option) ? 'ring-2 ring-primary' : ''}`}
                  disabled={showAnswer}
                >
                  {option}
                </Button>
              ))}
            </div>
          )}

          {currentQuestion.type === 'boolean' && (
            <div className="flex gap-4 justify-center flex-wrap">
              {['A. True', 'B. False'].map((option) => (
                <Button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  variant={getButtonVariant(option)}
                  disabled={showAnswer}
                  className={`flex items-center justify-center px-8 py-4 rounded-lg transition-all 
                    ${showAnswer ? 'opacity-100' : ''}
                    ${getButtonVariant(option)==='outline' ? 'bg-white' : 'bg-slate-300'}`}
                >
                  {option}
                </Button>
              ))}
            </div>
          )}

          {currentQuestion.type === 'fill_up' && (
            <div className="space-y-2">
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Type your answer..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !showAnswer) {
                    handleAnswer(e.target.value);
                  }
                }}
                disabled={showAnswer}
              />
              <Button
                onClick={() => handleAnswer(inputValue)}
                disabled={showAnswer}
              >
                Submit Answer
              </Button>
            </div>
          )}

          {currentQuestion.type === 'match_up' && (
            <>
              {renderMatchUpQuestion(currentQuestion)}
              {matchedPairs.length === currentQuestion.column1.length && !showAnswer && (
                <Button
                  onClick={() => handleAnswer(matchedPairs)}
                  className="w-full mt-4"
                >
                  Check Answers
                </Button>
              )}
            </>
          )}
        </div>

        {showAnswer && (
          <div className="mt-4 space-y-2">
            <div
              className={`p-4 rounded flex items-center ${
                userAnswers[currentQuestionIndex].isCorrect ? 'bg-green-100' : 'bg-red-100'
              }`}
            >
              <Image 
                src={userAnswers[currentQuestionIndex].isCorrect ? elements : elements1} 
                alt={userAnswers[currentQuestionIndex].isCorrect ? "Correct" : "Incorrect"} 
                className="w-12 h-12 mr-4"
              />
              <div>
                <p className="font-bold">
                  {userAnswers[currentQuestionIndex].isCorrect ? 'Correct!' : 'Incorrect!'}
                </p>
                {!userAnswers[currentQuestionIndex].isCorrect && currentQuestion.answer && (
                  <p className="mt-2">
                    <strong>Correct Answer:</strong> {currentQuestion.answer}
                  </p>
                )}
              </div>
            </div>
            {currentQuestion.explanation && (
              <div className="mt-4 p-4 bg-blue-100 rounded">
                <strong>Explanation:</strong>
                <p>{currentQuestion.explanation}</p>
              </div>
            )}
            <Button onClick={nextQuestion} className="w-full mt-4">
              {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InteractiveQuiz;