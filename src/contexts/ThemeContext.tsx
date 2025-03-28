
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  forceDarkMode: () => void;
  resetThemeForce: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [isForced, setIsForced] = useState(false);
  const [userPreference, setUserPreference] = useState<Theme | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('untaxable-theme') as Theme | null;
    if (savedTheme) {
      setUserPreference(savedTheme);
      if (!isForced) {
        setTheme(savedTheme);
        document.documentElement.className = savedTheme;
      }
    } else {
      // Default to dark theme
      document.documentElement.className = 'dark';
    }
  }, [isForced]);

  const toggleTheme = () => {
    if (isForced) return; // Don't allow toggling if theme is forced
    
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    setUserPreference(newTheme);
    localStorage.setItem('untaxable-theme', newTheme);
    document.documentElement.className = newTheme;
  };

  const forceDarkMode = () => {
    setIsForced(true);
    setTheme('dark');
    document.documentElement.className = 'dark';
  };

  const resetThemeForce = () => {
    setIsForced(false);
    if (userPreference) {
      setTheme(userPreference);
      document.documentElement.className = userPreference;
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, forceDarkMode, resetThemeForce }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
