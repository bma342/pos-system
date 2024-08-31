import { createTheme as createMuiTheme } from '@mui/material/styles';
import { ClientBranding } from '../types';

export const createTheme = (branding: ClientBranding) => {
  return createMuiTheme({
    palette: {
      primary: {
        main: branding.primaryColor,
      },
      secondary: {
        main: branding.secondaryColor,
      },
    },
    typography: {
      fontFamily: branding.fontFamily,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: branding.buttonStyle === 'rounded' ? '20px' : '0px',
          },
        },
      },
    },
  });
};
