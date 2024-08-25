import axios from 'axios';
import { Client } from '../types';

export const fetchClientId = async (): Promise<number> => {
  const response = await axios.get<number>('/api/clients/get-client-id'); // Update the endpoint as needed
  return response.data;
};

// Update client details
export const updateClientDetails = async (
  clientId: number,
  clientData: Partial<Client>
): Promise<Client> => {
  const response = await axios.put<Client>(
    `/api/clients/${clientId}`,
    clientData
  );
  return response.data;
};

// Delete a client
export const deleteClient = async (clientId: number): Promise<void> => {
  await axios.delete(`/api/clients/${clientId}`);
};
