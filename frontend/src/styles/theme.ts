import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: 'var(--primary-color, #007bff)',
    },
    secondary: {
      main: 'var(--secondary-color, #6c757d)',
    },
  },
  typography: {
    fontFamily: 'var(--font-family, "Roboto", "Helvetica", "Arial", sans-serif)',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 'var(--button-border-radius, 4px)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'var(--card-background-color, #ffffff)',
        },
      },
    },
  },
});