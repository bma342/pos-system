import { createTheme } from '@mui/material/styles';
import { DefaultTheme } from 'styled-components';

const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const styledTheme: DefaultTheme = {
  colors: {
    primary: muiTheme.palette.primary.main,
    secondary: muiTheme.palette.secondary.main,
    background: muiTheme.palette.background.default,
    text: muiTheme.palette.text.primary,
  },
  fontSizes: {
    small: '0.8rem',
    medium: '1rem',
    large: '1.2rem',
  },
};

export { muiTheme as default, styledTheme };
