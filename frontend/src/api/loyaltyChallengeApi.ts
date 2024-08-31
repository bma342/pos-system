import apiClient from './axios';
import { LoyaltyChallenge } from '../types';

export const getLoyaltyChallenges = async (): Promise<LoyaltyChallenge[]> => {
  const response = await apiClient.get('/api/loyalty-challenges');
  return response.data;
};

export const createLoyaltyChallenge = async (
  challenge: Omit<LoyaltyChallenge, 'id'>
): Promise<LoyaltyChallenge> => {
  const response = await apiClient.post('/api/loyalty-challenges', challenge);
  return response.data;
};

export const updateLoyaltyChallenge = async (
  id: number,
  challenge: Partial<LoyaltyChallenge>
): Promise<LoyaltyChallenge> => {
  const response = await apiClient.put(
    `/api/loyalty-challenges/${id}`,
    challenge
  );
  return response.data;
};

export const deleteLoyaltyChallenge = async (id: number): Promise<void> => {
  await apiClient.delete(`/api/loyalty-challenges/${id}`);
};

export const getGuestChallengeProgress = async (
  guestId: number
): Promise<LoyaltyChallengeProgress[]> => {
  const response = await apiClient.get(
    `/api/loyalty-challenges/progress/${guestId}`
  );
  return response.data;
};
