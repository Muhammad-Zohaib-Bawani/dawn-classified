"use client";
import React, { useState } from "react";
import { HeaderApp, Main, Footer } from "./_lib/Components";
import { DataProvider } from "./_lib/Components/context/DataContext";
import App from "./_lib/Components/Content/practice";
export default function Home() {
  const [selectedDates, setSelectedDates] = useState(new Set());

  return (
    <DataProvider>
      <HeaderApp />
      <Main selectedDates={selectedDates} setSelectedDates={setSelectedDates} />
      <App />
      <Footer />
    </DataProvider>
  );
}
