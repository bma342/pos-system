import apiClient from '../api/apiClient';
import { User } from '../types/userTypes';

export class userService {
  async getUsers(): Promise<User[]> {
    const response = await apiClient.get('/users');
    return response.data;
  }

  async createUser(user: User): Promise<User> {
    const response = await apiClient.post('/users', user);
    return response.data;
  }

  async updateUser(id: string, user: User): Promise<User> {
    const response = await apiClient.put(`/users/${id}`, user);
    return response.data;
  }

  async deleteUser(id: string): Promise<void> {
    await apiClient.delete(`/users/${id}`);
  }
}
