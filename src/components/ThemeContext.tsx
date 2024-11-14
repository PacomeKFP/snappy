// src/components/ThemeContext.tsx
"use client";

import React, { createContext, useContext, useState } from 'react';

interface Theme {
  bg: string;
  border: string;
}

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

const defaultTheme: Theme = {
  bg: '#ffffff', // Couleur de fond par défaut
  border: '#cccccc', // Couleur de bordure par défaut
};

const darkTheme: Theme = {
  bg: '#333333', // Couleur de fond en mode sombre
  border: '#555555', // Couleur de bordure en mode sombre
};

const ThemeContext = createContext<ThemeContextProps>({
  theme: defaultTheme,
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const theme = isDarkMode ? darkTheme : defaultTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
