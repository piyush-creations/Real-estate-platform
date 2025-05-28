import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const ComparisonContext = createContext();

// Create a provider component
export const ComparisonProvider = ({ children }) => {
  const [comparisonList, setComparisonList] = useState(() => {
    // Check if comparison list exists in localStorage
    const savedList = localStorage.getItem('comparisonList');
    return savedList ? JSON.parse(savedList) : [];
  });

  useEffect(() => {
    // Persist comparison list to localStorage
    localStorage.setItem('comparisonList', JSON.stringify(comparisonList));
  }, [comparisonList]);

  // Function to add or remove properties from the comparison list
  const toggleComparison = (property) => {
    setComparisonList((prevList) => {
      if (prevList.some(item => item.id === property.id)) {
        return prevList.filter(item => item.id !== property.id); // Remove if already in list
      }
      return [...prevList, property]; // Add to list
    });
  };

  return (
    <ComparisonContext.Provider value={{ comparisonList, setComparisonList, toggleComparison }}>
      {children}
    </ComparisonContext.Provider>
  );
};

// Custom hook to use the ComparisonContext
export const useComparison = () => {
  return useContext(ComparisonContext);
};