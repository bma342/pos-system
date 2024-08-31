import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { ClientBrandingService } from '../services/ClientBrandingService';
import { ClientBranding } from '../types/clientTypes';

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

  if (!branding) {
    return null; // Or a loading component
  }

  return (
    <div
      style={{
        backgroundColor: branding.primaryColor,
        color: branding.textColor,
        fontFamily: branding.fontFamily,
      }}
    >
      {children}
    </div>
  );
};

export default ClientBrandingProvider;
