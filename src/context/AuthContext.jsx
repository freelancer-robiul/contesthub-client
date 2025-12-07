// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // {_id, name, email, photoURL, role}
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // load from localStorage on first render
  useEffect(() => {
    const savedToken = localStorage.getItem("contestHub-token");
    const savedUser = localStorage.getItem("contestHub-user");

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("contestHub-token");
        localStorage.removeItem("contestHub-user");
      }
    }
    setLoading(false);
  }, []);

  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem("contestHub-token", jwtToken);
    localStorage.setItem("contestHub-user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("contestHub-token");
    localStorage.removeItem("contestHub-user");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
