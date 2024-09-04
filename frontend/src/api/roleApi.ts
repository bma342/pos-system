import axios from 'axios';
import { Role, Permission } from '../types/roleTypes';

const BASE_URL = '/api/roles';

export const fetchRoles = async (clientId: string): Promise<Role[]> => {
  const response = await axios.get(`${BASE_URL}`, { params: { clientId } });
  return response.data;
};

export const createRole = async (role: Omit<Role, 'id'>): Promise<Role> => {
  const response = await axios.post(`${BASE_URL}`, role);
  return response.data;
};

export const updateRole = async (roleId: string, role: Partial<Role>): Promise<Role> => {
  const response = await axios.put(`${BASE_URL}/${roleId}`, role);
  return response.data;
};

export const deleteRole = async (roleId: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/${roleId}`);
};

export const fetchPermissions = async (): Promise<Permission[]> => {
  const response = await axios.get(`${BASE_URL}/permissions`);
  return response.data;
};

export const assignRoleToUser = async (userId: string, roleId: string): Promise<void> => {
  await axios.post(`${BASE_URL}/assign`, { userId, roleId });
};

export const removeRoleFromUser = async (userId: string, roleId: string): Promise<void> => {
  await axios.post(`${BASE_URL}/remove`, { userId, roleId });
};