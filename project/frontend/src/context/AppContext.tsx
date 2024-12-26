import React, { createContext, ReactNode, useState } from "react";
interface ContextProviderProps {
  children: ReactNode;
}
const AppContext = createContext<{
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  userId: string | null;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
}>({
  token: null,
  setToken: () => {},
  userId: null,
  setUserId: () => {},
});

function ContextProvider({ children }: ContextProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const values = {
    token,
    setToken,
    userId,
    setUserId,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}

export { AppContext, ContextProvider };
