import apiClient from './axios';
import { Challenge } from '../types';

export const getChallenges = async (): Promise<Challenge[]> => {
  const response = await apiClient.get<Challenge[]>('/api/challenges');
  return response.data;
};

export const createChallenge = async (
  challengeData: Omit<Challenge, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Challenge> => {
  const response = await apiClient.post<Challenge>(
    '/api/challenges',
    challengeData
  );
  return response.data;
};

export const updateChallenge = async (
  id: number,
  challengeData: Partial<Challenge>
): Promise<Challenge> => {
  const response = await apiClient.put<Challenge>(
    `/api/challenges/${id}`,
    challengeData
  );
  return response.data;
};

export const deleteChallenge = async (id: number): Promise<void> => {
  await apiClient.delete(`/api/challenges/${id}`);
};

export const getChallengesByLocation = async (
  locationId: number
): Promise<Challenge[]> => {
  const response = await apiClient.get<Challenge[]>(
    `/api/challenges/location/${locationId}`
  );
  return response.data;
};

export const getChallengesByClient = async (
  clientId: number
): Promise<Challenge[]> => {
  const response = await apiClient.get<Challenge[]>(
    `/api/challenges/client/${clientId}`
  );
  return response.data;
};
