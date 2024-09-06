import axios from 'axios';
import { WalletTransaction, Reward, Discount } from '../types/walletTypes';

export const walletService = {
  getBalance: async (clientId: string): Promise<number> => {
    try {
      const response = await axios.get(`/api/clients/${clientId}/wallet/balance`);
      return response.data.balance;
    } catch (error) {
      throw new Error('Failed to get wallet balance: ' + (error as Error).message);
    }
  },

  addFunds: async (clientId: string, amount: number): Promise<number> => {
    try {
      const response = await axios.post(`/api/clients/${clientId}/wallet/add-funds`, { amount });
      return response.data.balance;
    } catch (error) {
      throw new Error('Failed to add funds to wallet: ' + (error as Error).message);
    }
  },

  getTransactions: async (clientId: string, locationId?: string, page = 1, limit = 20): Promise<WalletTransaction[]> => {
    try {
      const response = await axios.get(`/api/clients/${clientId}/wallet/transactions`, {
        params: { locationId, page, limit }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to get wallet transactions: ' + (error as Error).message);
    }
  },

  getRewards: async (clientId: string, locationId?: string): Promise<Reward[]> => {
    try {
      const response = await axios.get(`/api/clients/${clientId}/wallet/rewards`, {
        params: { locationId }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to get wallet rewards: ' + (error as Error).message);
    }
  },

  getDiscounts: async (clientId: string, locationId?: string): Promise<Discount[]> => {
    try {
      const response = await axios.get(`/api/clients/${clientId}/wallet/discounts`, {
        params: { locationId }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to get wallet discounts: ' + (error as Error).message);
    }
  }
};
