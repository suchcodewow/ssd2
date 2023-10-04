"use client";

import { createContext, useState } from "react";
export const ClientContext = createContext({});

export default function ClientContextProvider({ children }) {
  const [baseUrl, setBaseUrl] = useState("");
  const [generateNav, setGenerateNav] = useState(false);
  // Add any other variables to maintain across app here!
  return (
    <ClientContext.Provider value={{ baseUrl, setBaseUrl, generateNav, setGenerateNav }}>
      {children}
    </ClientContext.Provider>
  );
}
