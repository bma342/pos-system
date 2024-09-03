import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { getSubdomain } from '../utils/subdomain';
import { fetchClientBySubdomain } from '../api/clientApi';

interface Client {
  id: number;
  name: string;
  // Add other client properties
}

interface ClientContextType {
  client: Client | null;
  clientId: number | null;
  subdomain: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  setClientId: (id: number | null) => void;
  setIsAuthenticated: (value: boolean) => void;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export const ClientProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [client, setClient] = useState<Client | null>(null);
  const [subdomain, setSubdomain] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [clientId, setClientId] = useState<number | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loadClient = async () => {
      const detectedSubdomain = getSubdomain();
      setSubdomain(detectedSubdomain);

      if (detectedSubdomain) {
        try {
          const clientData = await fetchClientBySubdomain(detectedSubdomain);
          setClient(clientData);
        } catch (err) {
          setError('Failed to load client data');
          console.error(err);
        }
      } else {
        setError('Invalid subdomain');
      }
      setIsLoading(false);
    };

    loadClient();
  }, []);

  return (
    <ClientContext.Provider
      value={{
        client,
        clientId,
        subdomain,
        isAuthenticated,
        isLoading,
        error,
        setClientId,
        setIsAuthenticated,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export const useClientContext = () => {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error('useClientContext must be used within a ClientProvider');
  }
  return context;
};
