import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const response = await axios.get('/api/clients/theme');
        setTheme(response.data);
        applyTheme(response.data);
      } catch (error) {
        console.error('Failed to fetch theme:', error);
      }
    };

    fetchTheme();
  }, []);

  const applyTheme = (theme) => {
    document.documentElement.style.setProperty('--color-primary', theme.primaryColor);
    document.documentElement.style.setProperty('--color-secondary', theme.secondaryColor);
    document.documentElement.style.setProperty('--color-accent', theme.accentColor);
    document.documentElement.style.setProperty('--font-primary', theme.primaryFont);
    document.documentElement.style.setProperty('--font-secondary', theme.secondaryFont);
  };

  if (!theme) return null;

  return <>{children}</>;
};

export default ThemeProvider;

