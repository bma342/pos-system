import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: 'var(--primary-color, #1976d2)',
    },
    secondary: {
      main: 'var(--secondary-color, #dc004e)',
    },
    // Add more color variables as needed
  },
  typography: {
    fontFamily: 'var(--font-family, "Roboto", "Helvetica", "Arial", sans-serif)',
    // Add more typography variables as needed
  },
  // Add more theme customizations as needed
});

export default theme;
