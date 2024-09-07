import apiClient from './axios';
import { Wallet, Discount, LoyaltyReward } from '../types';

// Fetch wallet balance
export const fetchWalletBalance = async (): Promise<{ balance: number }> => {
  const response = await apiClient.get<{ balance: number }>(
    '/api/wallet/balance'
  );
  return response.data;
};

// Fetch wallet discounts
export const fetchWalletDiscounts = async (): Promise<Discount[]> => {
  const response = await apiClient.get<Discount[]>('/api/wallet/discounts');
  return response.data;
};

// Fetch loyalty rewards
export const fetchLoyaltyRewards = async (): Promise<LoyaltyReward[]> => {
  const response = await apiClient.get<LoyaltyReward[]>(
    '/api/wallet/loyalty-rewards'
  );
  return response.data;
};

// Add a discount to the wallet
export const addDiscountToWallet = async (
  discountId: number
): Promise<void> => {
  await apiClient.post('/api/wallet/add-discount', { discountId });
};

// Fetch all wallet data (balance, discounts, rewards)
export const fetchWalletData = async (guestId: string): Promise<Wallet> => {
  // Implement the API call to fetch wallet data
  // This is a placeholder implementation
  const response = await fetch(`/api/wallet/${guestId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch wallet data');
  }
  return await response.json();
};
