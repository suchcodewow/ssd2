"use client";

import { createContext } from "react";

const userContext = createContext();
import { useSelectedLayoutSegments } from "next/navigation";

// export default UserContext;
export default function UserContext({ children }) {
  const useSegment = useSelectedLayoutSegments();
  const segment = useSegment ? `/${useSegment.join("/")}` : "";
  // console.log("context:", segment);
  return <userContext.Provider value={segment}>{children}</userContext.Provider>;
}
