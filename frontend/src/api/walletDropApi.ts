import apiClient from './axios';
import { WalletDrop } from '../types/walletTypes';

export const getWalletDropsByUser = async (
  userId: number
): Promise<WalletDrop[]> => {
  const response = await apiClient.get(`/api/wallet-drops/user/${userId}`);
  return response.data;
};

export const createWalletDrop = async (
  userId: number,
  type: 'credit' | 'percentage' | 'fixed' | 'item',
  value: number,
  reason: string,
  itemId?: number,
  expirationDate?: Date
): Promise<WalletDrop> => {
  const response = await apiClient.post('/api/wallet-drops', {
    userId,
    type,
    value,
    reason,
    itemId,
    expirationDate,
  });
  return response.data;
};
