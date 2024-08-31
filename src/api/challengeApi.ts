import apiClient from './axios';
import { Challenge } from '../types/challengeTypes';

export const getChallenges = async (): Promise<Challenge[]> => {
  const response = await apiClient.get<Challenge[]>('/api/challenges');
  return response.data;
};

export const createChallenge = async (challenge: Omit<Challenge, 'id'>): Promise<Challenge> => {
  const response = await apiClient.post<Challenge>('/api/challenges', challenge);
  return response.data;
};

export const updateChallenge = async (id: string, challenge: Partial<Challenge>): Promise<Challenge> => {
  const response = await apiClient.put<Challenge>(`/api/challenges/${id}`, challenge);
  return response.data;
};

export const deleteChallenge = async (id: string): Promise<void> => {
  await apiClient.delete(`/api/challenges/${id}`);
};