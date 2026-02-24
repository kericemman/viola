import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(
    JSON.parse(localStorage.getItem("admin")) || null
  );
  const [token, setToken] = useState(
    localStorage.getItem("token") || null
  );

  const login = (data) => {
    setAdmin(data.admin);
    setToken(data.token);

    localStorage.setItem("admin", JSON.stringify(data.admin));
    localStorage.setItem("token", data.token);
  };

  const logout = () => {
    setAdmin(null);
    setToken(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{ admin, token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
