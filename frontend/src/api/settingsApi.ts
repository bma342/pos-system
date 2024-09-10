import axios from 'axios';
import { Settings } from '../types/settingsTypes';

export const fetchSettings = async (clientId: string): Promise<Settings> => {
  const response = await axios.get(`/api/settings/${clientId}`);
  return response.data;
};

export const updateSettings = async (clientId: string, settings: Settings): Promise<Settings> => {
  const response = await axios.put(`/api/settings/${clientId}`, settings);
  return response.data;
};
