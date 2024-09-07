import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: 'var(--primary-color, #1976d2)',
    },
    secondary: {
      main: 'var(--secondary-color, #dc004e)',
    },
  },
  typography: {
    fontFamily: 'var(--font-family, "Roboto", "Helvetica", "Arial", sans-serif)',
  },
});