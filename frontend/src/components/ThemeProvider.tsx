import React from 'react';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { createTheme, Theme } from '@mui/material/styles';

const theme: Theme = createTheme({
  palette: {
    primary: {
      main: '#0070f3',
    },
    secondary: {
      main: '#ff4081',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
});

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>;

export default ThemeProvider;
