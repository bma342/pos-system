import axios from 'axios';
import { Client } from '../types';

export const fetchClientId = async (): Promise<number | null> => {
  try {
    const response = await axios.get<number>('/api/clients/get-client-id');
    return response.data;
  } catch (error) {
    console.error('Error fetching client ID:', error);
    return null;
  }
};

export const updateClientDetails = async (
  clientId: number,
  clientData: Partial<Client>
): Promise<Client | null> => {
  try {
    const response = await axios.put<Client>(
      `/api/clients/${clientId}`,
      clientData
    );
    return response.data;
  } catch (error) {
    console.error('Error updating client details:', error);
    return null;
  }
};

export const deleteClient = async (clientId: number): Promise<boolean> => {
  try {
    await axios.delete(`/api/clients/${clientId}`);
    return true;
  } catch (error) {
    console.error('Error deleting client:', error);
    return false;
  }
};
