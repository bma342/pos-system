import api from './axios';
import { ClientSettings } from '../types/clientTypes';

export const fetchSettings = async (): Promise<ClientSettings> => {
  const response = await api.get<ClientSettings>('/settings');
  return response.data;
};

export const updateSettings = async (settings: Partial<ClientSettings>): Promise<ClientSettings> => {
  const response = await api.put<ClientSettings>('/settings', settings);
  return response.data;
};