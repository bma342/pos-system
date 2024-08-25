import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchClientId } from '../api/clientApi';

interface ClientContextType {
  clientId: number | null;
  isLoading: boolean;
  error: string | null;
}

const ClientContext = createContext<ClientContextType>({
  clientId: null,
  isLoading: true,
  error: null,
});

export const useClientContext = () => useContext(ClientContext);

export const ClientProvider: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [clientId, setClientId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadClientId = async () => {
      try {
        const id = await fetchClientId();
        setClientId(id);
      } catch (err) {
        setError('Failed to fetch client ID');
      } finally {
        setIsLoading(false);
      }
    };

    loadClientId();
  }, []);

  return (
    <ClientContext.Provider value={{ clientId, isLoading, error }}>
      {children}
    </ClientContext.Provider>
  );
};
