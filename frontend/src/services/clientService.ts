import axios from 'axios';
import { Client } from '../types';

const API_URL = '/api/clients';

export const clientService = {
  getClients: async (): Promise<Client[]> => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  createClient: async (clientData: Partial<Client>): Promise<Client> => {
    const response = await axios.post(API_URL, clientData);
    return response.data;
  },

  updateClient: async (clientData: Client): Promise<Client> => {
    const response = await axios.put(`${API_URL}/${clientData.id}`, clientData);
    return response.data;
  },

  deleteClient: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  },
};
