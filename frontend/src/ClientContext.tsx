import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ClientContextType {
  clientId: string | null;
  setClientId: (id: string | null) => void;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export const ClientProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [clientId, setClientId] = useState<string | null>(null);

  const value = React.useMemo(() => ({ clientId, setClientId }), [clientId]);

  return (
    <ClientContext.Provider value={value}>{children}</ClientContext.Provider>
  );
};

export const useClient = (): ClientContextType => {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error('useClient must be used within a ClientProvider');
  }
  return context;
};
