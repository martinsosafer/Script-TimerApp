"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

interface PostsContextProviderProps {
  children: React.ReactNode | React.ReactNode[];
}
interface ContextType {
  sessionId: string;
  setSessionId: Dispatch<SetStateAction<string>>;
  productId: string | null;
  setProductId: Dispatch<SetStateAction<string | null>>;
}
const AppContext = createContext({} as ContextType);
export function ContextWrapper({ children }: PostsContextProviderProps) {
  const [sessionId, setSessionId] = useState<string>("default state");
  const [productId, setProductId] = useState<string | null>(null);

  const sharedState = useMemo(() => {
    return {
      sessionId,
      setSessionId,
      productId,
      setProductId,
    };
  }, [sessionId, productId]);

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}
export function useSharedState() {
  return useContext(AppContext);
}
