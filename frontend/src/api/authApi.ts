import axiosInstance from './axios';
import { AuthResponse } from '../types';

export const loginUser = async (credentials: {
  email: string;
  password: string;
  subdomain: string;
}): Promise<AuthResponse> => {
  const { subdomain, ...loginData } = credentials;
  const response = await axiosInstance.post<AuthResponse>(
    `/auth/${subdomain}/login`,
    loginData
  );
  return response.data;
};

export const registerUser = async (userData: {
  email: string;
  password: string;
  name: string;
  role?: UserRole; // Use UserRole type instead of string
}): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>(
    '/auth/register',
    userData
  );
  return response.data;
};

export const refreshToken = async (): Promise<{ token: string }> => {
  const response = await axiosInstance.post<{ token: string }>(
    '/auth/refresh-token'
  );
  return response.data;
};

// Add this function to use the User type
export const getCurrentUser = async (): Promise<User> => {
  const response = await axiosInstance.get<User>('/auth/me');
  return response.data;
};
