import axios from 'axios';

const API_URL = 'http://your-backend-url.com/api';

export const login = async (username: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/login`, { username, password });
  return response.data;
};

export const logout = async () => {
  // Implement logout logic
};