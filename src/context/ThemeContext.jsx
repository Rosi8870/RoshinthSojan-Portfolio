import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'editorial';
  });

  useEffect(() => {
    localStorage.setItem('portfolio-theme', theme);
    document.body.className = theme;
  }, [theme]);

  const themes = ['editorial', 'spatial', 'cyber', 'zen', 'neumorphic', 'retro'];

  const toggleTheme = () => {
    setTheme(prev => {
      const nextIndex = (themes.indexOf(prev) + 1) % themes.length;
      return themes[nextIndex];
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
