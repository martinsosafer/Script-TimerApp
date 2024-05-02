"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

interface PostsContextProviderProps {
  children: JSX.Element | JSX.Element[];
}
interface ContextType {
  sessionId: string;
  setSessionId: Dispatch<SetStateAction<string>>;
}
const AppContext = createContext({} as ContextType);
export function ContextWrapper({ children }: PostsContextProviderProps) {
  const [sessionId, setSessionId] = useState<string>("default state");
  const sharedState = useMemo(() => {
    return {
      sessionId,
      setSessionId,
    };
  }, [sessionId]);
  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}
export function useSharedState() {
  return useContext(AppContext);
}
