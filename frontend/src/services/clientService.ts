import axios from 'axios';
import { Client } from '../types/clientTypes';

export const clientService = {
  getAllClients: async (): Promise<Client[]> => {
    const response = await axios.get('/api/clients');
    return response.data;
  },

  getClientById: async (id: string): Promise<Client> => {
    const response = await axios.get(`/api/clients/${id}`);
    return response.data;
  },

  createClient: async (clientData: Partial<Client>): Promise<Client> => {
    const response = await axios.post('/api/clients', clientData);
    return response.data;
  },

  updateClient: async (id: string, clientData: Partial<Client>): Promise<Client> => {
    const response = await axios.put(`/api/clients/${id}`, clientData);
    return response.data;
  },

  deleteClient: async (id: string): Promise<void> => {
    await axios.delete(`/api/clients/${id}`);
  },
};
