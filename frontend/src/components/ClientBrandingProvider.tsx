import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { ClientBrandingService } from '../services/ClientBrandingService';
import { ClientBranding } from '../types/clientTypes';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { fetchClientBranding } from 'frontend/src/api/clientApi';

const ClientBrandingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [branding, setBranding] = useState<ClientBranding | null>(null);
  const clientId = useSelector(
    (state: RootState) => state.client.currentClient?.id
  );
  const clientBrandingService = useMemo(() => new ClientBrandingService(), []);

  useEffect(() => {
    const fetchBranding = async () => {
      if (clientId) {
        try {
          const fetchedBranding =
            await clientBrandingService.getClientBranding(clientId);
          setBranding(fetchedBranding);
        } catch (error) {
          console.error('Failed to fetch client branding:', error);
        }
      }
    };

    fetchBranding();
  }, [clientId, clientBrandingService]);

  const theme = useMemo(() => {
    if (!branding) return createTheme();

    return createTheme({
      palette: {
        primary: {
          main: branding.primaryColor,
        },
        secondary: {
          main: branding.secondaryColor,
        },
        text: {
          primary: branding.fontColor,
          secondary: branding.secondaryFontColor,
        },
      },
      typography: {
        fontFamily: branding.fontFamily,
      },
    });
  }, [branding]);

  if (!branding) {
    return null; // Or a loading component
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="min-h-screen" style={{ backgroundColor: branding.primaryColor }}>
        {children}
      </div>
    </ThemeProvider>
  );
};

export default ClientBrandingProvider;
