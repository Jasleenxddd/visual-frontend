import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import InteractiveQuiz from './InteractiveQuiz';
import ResultsPage from '../../app/results/page';

const QuizContainer = ({ resultData, setShowQuizContainer , handleGenerateMore, isGeneratingMore, handleReset }) => {
  const [selectedMode, setSelectedMode] = useState(null);

  if (!selectedMode) {
    return (
      <div className="flex items-center justify-center min-h-[400px] w-full">
        <Card className="w-full max-w-md bg-white rounded-3xl shadow-lg">
          <CardContent className="pt-8 pb-6 px-6">
            <div className="flex flex-col gap-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">
                  How would you like to proceed?
                </h2>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  onClick={() => setSelectedMode('view')}
                  className="h-12 text-base font-semibold bg-[#1565C0] text-white border-2  hover:bg-blue-600"
                  variant="contained"
                >
                  View all Questions
                </Button>
                <Button 
                  onClick={() => setSelectedMode('quiz')}
                  className="h-12 text-base font-semibold bg-[#1565C0] text-white border-2  hover:bg-blue-600"
                  variant="contained"
                >
                  Take A Quiz
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full">
      {selectedMode === 'quiz' ? (
        <div className="space-y-4">
          <Button 
            onClick={() => setSelectedMode(null)}
            variant="outline"
          className="text-white bg-blue-500 hover:bg-blue-600 px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base rounded-lg transition"
          >
            Back to Options
          </Button>
          <InteractiveQuiz resultData={resultData} />
        </div>
      ) : (
        <div className="space-y-4">
          <Button 
            onClick={() => setSelectedMode(null)}
            variant="outline"
          className="text-white bg-blue-500 hover:bg-blue-600 px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base rounded-lg transition"
          >
            Back to Options
          </Button>
          <ResultsPage resultData={resultData} />
        </div>
      )}
      <div className="mt-4 flex justify-between">
        <Button 
          onClick={handleGenerateMore}
          variant="outline"
          className="text-white bg-blue-500 hover:bg-blue-600 px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base rounded-lg transition"
        >
          Generate More
        </Button>
        <Button 
          onClick={handleReset}  
          variant="outline"
          className="text-white bg-blue-500 hover:bg-blue-600 px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base rounded-lg transition"
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default QuizContainer;