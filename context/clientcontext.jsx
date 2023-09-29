"use client";

import { createContext, useState } from "react";
const ClientContext = createContext({});

export default function ClientContextProvider({ children }) {
  const [baseUrl, setbaseUrl] = useState("");
  // Add any other variables to maintain across app here!
  return <ClientContext.Provider value={{ baseUrl, setbaseUrl }}>{children}</ClientContext.Provider>;
}
