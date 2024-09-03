import axios from 'axios';
import { Settings } from '../types/settingsTypes';

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

export const fetchSettings = async (clientId: number): Promise<Settings> => {
  const response = await axios.get(`${API_BASE_URL}/settings/${clientId}`);
  return response.data;
};

export const updateSettings = async (
  clientId: number,
  settings: Partial<Settings>
): Promise<Settings> => {
  const response = await axios.put(
    `${API_BASE_URL}/settings/${clientId}`,
    settings
  );
  return response.data;
};

export const fetchSettingsByKey = async (
  clientId: number,
  key: string
): Promise<any> => {
  const response = await axios.get(
    `${API_BASE_URL}/settings/${clientId}/${key}`
  );
  return response.data;
};

export const updateSettingByKey = async (
  clientId: number,
  key: string,
  value: any
): Promise<any> => {
  const response = await axios.put(
    `${API_BASE_URL}/settings/${clientId}/${key}`,
    { value }
  );
  return response.data;
};
