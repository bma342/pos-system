import React, { createContext, useContext, useState, useEffect } from 'react';
import { Client } from '../types/clientTypes';
import { fetchClientData } from '../api/clientApi';

interface ClientContextType {
  client: Client | null;
  clientId: string | null;
  setClient: (client: Client | null) => void;
  setClientId: (id: string | null) => void;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export const ClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [client, setClient] = useState<Client | null>(null);
  const [clientId, setClientId] = useState<string | null>(null);

  useEffect(() => {
    const fetchClient = async () => {
      if (clientId) {
        try {
          const clientData = await fetchClientData(clientId);
          setClient(clientData);
        } catch (error) {
          console.error('Error fetching client:', error);
        }
      }
    };

    fetchClient();
  }, [clientId]);

  return (
    <ClientContext.Provider value={{ client, clientId, setClient, setClientId }}>
      {children}
    </ClientContext.Provider>
  );
};

export const useClient = () => {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error('useClient must be used within a ClientProvider');
  }
  return context;
};
