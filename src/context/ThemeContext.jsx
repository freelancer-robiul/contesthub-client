// src/context/ThemeContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  // load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("contestHub-theme");
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
    }
  }, []);

  // save & apply
  useEffect(() => {
    localStorage.setItem("contestHub-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
