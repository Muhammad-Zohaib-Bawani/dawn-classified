"use client";
import React, { createContext, useState } from "react";

// Create a context
export const DataContext = createContext();

// Create a provider component
export const DataProvider = ({ children }) => {
  // states
  const [locationData, setLocationData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [wordPrice, setWordPrice] = useState([]);
  return (
    <DataContext.Provider
      value={{
        locationData,
        setLocationData,
        categoryData,
        setCategoryData,
        subCategoryData,
        setSubCategoryData,
        cityData,
        setCityData,
        wordPrice,
        setWordPrice,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
