// components/ThemeContext.tsx
import React, { createContext, useContext, useState } from 'react';

const lightTheme = {
  bg: '#ffffff',
  text: '#171717',
  primary: '#247EE4',
  secondary: '#D9D9D9',
  hover: '#f5f5f5',
  border: '#D9D9D9',
};

const darkTheme = {
  bg: '#171717',
  text: '#ffffff',
  primary: '#247EE4',
  secondary: '#322F44',
  hover: '#2a2a2a',
  border: '#333333',
};

const ThemeContext = createContext({
  theme: lightTheme,
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode ? darkTheme : lightTheme;

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
