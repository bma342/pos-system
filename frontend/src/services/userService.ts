import axios from 'axios';
import { User } from '../types/userTypes';
import { AuthResponse } from '../types';

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';

export class UserService {
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  }

  async register(user: Omit<User, 'id'>): Promise<AuthResponse> {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, user);
    return response.data;
  }

  async getCurrentUser(): Promise<User> {
    const response = await axios.get(`${API_BASE_URL}/users/me`);
    return response.data;
  }

  async updateUser(userId: number, user: Partial<User>): Promise<User> {
    const response = await axios.put(`${API_BASE_URL}/users/${userId}`, user);
    return response.data;
  }
}
