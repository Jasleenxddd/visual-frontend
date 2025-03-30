'use client';

import React, { createContext, useState } from 'react';

export const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
  const [historyUpdate, setHistoryUpdate] = useState(0);

  const refreshHistory = () => {
    setHistoryUpdate(prev => prev + 1);
  };

  return (
    <HistoryContext.Provider value={{ historyUpdate, refreshHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};