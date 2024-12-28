import React, { createContext, useState, ReactNode, useEffect } from "react";

interface AppContextType {
  token: string | null;
  userId: string | null;
  userRole: string | null;
  setToken: (token: string | null) => void;
  setUserId: (id: string | null) => void;
  setUserRole: (role: string | null) => void;
}

const AppContext = createContext<AppContextType>({
  token: null,
  userId: null,
  userRole: null,
  setToken: () => {},
  setUserId: () => {},
  setUserRole: () => {},
});

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [userId, setUserId] = useState<string | null>(
    localStorage.getItem("id")
  );
  const [userRole, setUserRole] = useState<string | null>(
    localStorage.getItem("role")
  );

  // Update localStorage whenever the context state changes
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");

    if (userId) localStorage.setItem("id", userId);
    else localStorage.removeItem("id");

    if (userRole) localStorage.setItem("role", userRole);
    else localStorage.removeItem("role");
  }, [token, userId, userRole]);

  return (
    <AppContext.Provider
      value={{ token, userId, userRole, setToken, setUserId, setUserRole }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
