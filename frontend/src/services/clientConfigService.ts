import axios from 'axios';
import { ClientConfig } from '../types/clientTypes';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';

export const clientConfigService = {
  async getClientConfig(clientId: string): Promise<ClientConfig> {
    const response = await axios.get<ClientConfig>(`${API_BASE_URL}/clients/${clientId}/config`);
    return response.data;
  },

  async updateClientConfig(clientId: string, config: Partial<ClientConfig>): Promise<ClientConfig> {
    const response = await axios.put<ClientConfig>(`${API_BASE_URL}/clients/${clientId}/config`, config);
    return response.data;
  },
};
