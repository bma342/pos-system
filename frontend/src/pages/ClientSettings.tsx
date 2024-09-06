import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { updateClient } from '../redux/slices/clientSlice';
import { AppDispatch } from '../redux/store';
import { Client } from '../types/clientTypes';

const ClientSettings: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const clients = useSelector((state: RootState) => state.clients);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const selectedClient = selectedClientId ? clients.clients.find(c => c.id === selectedClientId) : null;

  const handleUpdateClient = () => {
    if (selectedClient) {
      dispatch(updateClient(selectedClient));
    }
  };

  return (
    <div>
      <h2>Client Settings</h2>
      <select
        value={selectedClientId || ''}
        onChange={(e) => setSelectedClientId(e.target.value)}
      >
        <option value="">Select a client</option>
        {clients.clients.map((client: Client) => (
          <option key={client.id} value={client.id}>{client.name}</option>
        ))}
      </select>
      {selectedClient && (
        <>
          <h3>Settings for {selectedClient.name}</h3>
          {/* Add more client settings here */}
          <button onClick={handleUpdateClient}>Update Client</button>
        </>
      )}
      <p>Clients Status: {clients.status}</p>
    </div>
  );
};

export default ClientSettings;
