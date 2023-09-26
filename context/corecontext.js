"use client";

import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";

const CoreContext = createContext({
  uri: "",
  setUri: () => "",
  //   data: [],
  //   setData: () => [],
});

export const CoreContextProvider = ({ children }) => {
  const [uri, setUri] = useState("");
  //   const [data, setData] = useState([]);

  return <CoreContext.Provider value={{ uri, setUri }}>{children}</CoreContext.Provider>;
};

export const useCoreContext = () => useContext(CoreContext);
