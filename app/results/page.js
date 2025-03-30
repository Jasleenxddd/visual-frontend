'use client';

import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Grid2 from '@mui/material/Grid2';
import './result.css';

export default function ResultsPage() {
  const [resultData, setResultData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem('resultData');
    if (storedData) {
      try {
        setResultData(JSON.parse(storedData));
      } catch (err) {
        setError('Error parsing result data');
      }
    }
  }, []);

  const renderOptions = (options, correctAnswer) =>
    options.map((option, i) => (
      <li key={i}>
        <Typography
          className={
            correctAnswer === option.charAt(0)
              ? 'font-bold text-green-600'
              : 'text-gray-900'
          }
        >
          {option}
        </Typography>
      </li>
    ));

  const renderMCQs = (results) =>
    results.map((item, index) => (
      <Box
        key={item.id || index}
        className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50"
      >
        <Typography className="font-bold mb-2">
          {index + 1}. {item.question}
        </Typography>
        <ul className="pl-5 space-y-2">
          {Array.isArray(item.options)
            ? renderOptions(item.options, item.answer)
            : (
              <Typography className="text-gray-600">No options available</Typography>
            )}
        </ul>
        <Typography className="font-bold my-2">Correct Answer: {item.answer}</Typography>
        {item.explanation && (
          <Typography className="mt-2 italic text-gray-600">
            Explanation: {item.explanation}
          </Typography>
        )}
      </Box>
    ));

  const renderFillUps = (results) =>
    results.map((item, index) => (
      <Box
        key={item.id || index}
        sx={{
          marginBottom: 3,
          padding: 2,
          border: '1px solid #ddd',
          borderRadius: 2,
          backgroundColor: '#f9f9f9',
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
          {index + 1}. {item.question}
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: 1 }}>
          Answer: {item.answer}
        </Typography>
        {item.explanation && (
          <Typography
            variant="body2"
            sx={{ marginTop: 1, fontStyle: 'italic', color: 'gray' }}
          >
            Explanation: {item.explanation}
          </Typography>
        )}
      </Box>
    ));

  const renderBoolean = (results) =>
    results.map((item, index) => (
      <Box
        key={item.id || index}
        sx={{
          marginBottom: 3,
          padding: 2,
          border: '1px solid #ddd',
          borderRadius: 2,
          backgroundColor: '#f9f9f9',
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
          {index + 1}. {item.question}
        </Typography>
        <ul className="pl-5 space-y-2">
          {Array.isArray(item.options)
            ? renderOptions(item.options, item.answer)
            : (
              <Typography className="text-gray-600">No options available</Typography>
            )}
        </ul>
        <Typography variant="body2" sx={{ marginBottom: 1 }}>
          Answer: {item.answer}
        </Typography>
        {item.explanation && (
          <Typography
            variant="body2"
            sx={{ marginTop: 1, fontStyle: 'italic', color: 'gray' }}
          >
            Explanation: {item.explanation}
          </Typography>
        )}
      </Box>
    ));

    const renderMatchUp = ([column1, column2, answers]) => {
      if (
        !Array.isArray(column1) ||
        !Array.isArray(column2) ||
        !Array.isArray(answers)
      ) {
        return <Typography color="error">Invalid match-up data format</Typography>;
      }
    
      return (
        <Box sx={{ marginBottom: 3, padding: 2, border: '1px solid #ddd', borderRadius: 2, backgroundColor: '#f9f9f9' }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
            Match the Following
          </Typography>
    
          <Grid2 container spacing={2}>
            <Grid2 item xs={6}>
              <Typography variant="h6">Column 1</Typography>
              <ul>
                {column1.map((item) => (
                  <li key={item.id}>
                    <Typography variant="body2">{item.item}</Typography>
                  </li>
                ))}
              </ul>
            </Grid2>
            <Grid2 item xs={6}>
              <Typography variant="h6">Column 2</Typography>
              <ul>
                {column2.map((item) => (
                  <li key={item.id}>
                    <Typography variant="body2">{item.item}</Typography>
                  </li>
                ))}
              </ul>
            </Grid2>
          </Grid2>
    
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
              Correct Matches:
            </Typography>
            <ul>
              {answers.map((answer) => (
                <li key={`${answer.column1_id}-${answer.column2_id}`}>
                  <Typography variant="body2">
                    {column1.find((c) => c.id === answer.column1_id)?.item} -{' '}
                    {column2.find((c) => c.id === answer.column2_id)?.item}
                  </Typography>
                </li>
              ))}
            </ul>
          </Box>
        </Box>
      );
    };
    
    const renderContent = () => {
      if (!resultData) return <Typography>No data available to display.</Typography>;
    
      const type_of_results = resultData[3] || resultData.type_of_results; // For match-up, get from resultData[3]
    
      switch (type_of_results) {
        case 'mcqs':
          return renderMCQs(resultData.results);  // Assuming 'results' is the key for questions in resultData
        case 'fill_up':
          return renderFillUps(resultData.results);
        case 'boolean':
          return renderBoolean(resultData.results);
        case 'match_up':
          return renderMatchUp([resultData[0], resultData[1], resultData[2]]);
        default:
          return <Typography>Invalid question type : {type_of_results}</Typography>;
      }
    };
    
    

  return (
    <div className="w-full">
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom align="center">
          Generated Questions
        </Typography>
        <Divider sx={{ marginBottom: 3 }} />
        {error ? (
          <Typography color="error" variant="h6" align="center" sx={{ marginBottom: 3 }}>
            {error}
          </Typography>
        ) : (
          renderContent()
        )}
      </Paper>
    </div>
  );
}
