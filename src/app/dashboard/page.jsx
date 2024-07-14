import React from "react";
import { DataProvider } from "../_lib/Components/context/DataContext";

import AppLayout from "../_lib/Components/Dashboard/dashboard";
export default function page() {
  return (
    <DataProvider>
      <AppLayout />
    </DataProvider>
  );
}
