import axios from 'axios';
import { User, UserProfile } from '../types/userTypes';

const BASE_URL = '/api/users';

export const fetchUsers = async (clientId: string): Promise<User[]> => {
  const response = await axios.get(`${BASE_URL}`, { params: { clientId } });
  return response.data;
};

export const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
  const response = await axios.post(`${BASE_URL}`, user);
  return response.data;
};

export const updateUser = async (userId: string, user: Partial<User>): Promise<User> => {
  const response = await axios.put(`${BASE_URL}/${userId}`, user);
  return response.data;
};

export const deleteUser = async (userId: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/${userId}`);
};

export const fetchUserProfile = async (userId: string): Promise<UserProfile> => {
  const response = await axios.get(`${BASE_URL}/${userId}/profile`);
  return response.data;
};

export const updateUserProfile = async (userId: string, profile: Partial<UserProfile>): Promise<UserProfile> => {
  const response = await axios.put(`${BASE_URL}/${userId}/profile`, profile);
  return response.data;
};

export const changeUserPassword = async (userId: string, currentPassword: string, newPassword: string): Promise<void> => {
  await axios.post(`${BASE_URL}/${userId}/change-password`, { currentPassword, newPassword });
};

export const resetUserPassword = async (email: string): Promise<void> => {
  await axios.post(`${BASE_URL}/reset-password`, { email });
};