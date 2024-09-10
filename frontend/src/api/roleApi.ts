import axios from 'axios';
import { Role } from '../types/roleTypes';

export const roleApi = {
  getRoles: async (): Promise<Role[]> => {
    const response = await axios.get('/api/roles');
    return response.data;
  },

  createRole: async (role: Omit<Role, 'id'>): Promise<Role> => {
    const response = await axios.post('/api/roles', role);
    return response.data;
  },

  updateRole: async (role: Role): Promise<Role> => {
    const response = await axios.put(`/api/roles/${role.id}`, role);
    return response.data;
  },

  deleteRole: async (roleId: string): Promise<void> => {
    await axios.delete(`/api/roles/${roleId}`);
  },
};