import apiClient from '../api/apiClient';

class WalletService {
  async getBalance(): Promise<number> {
    const response = await apiClient.get('/wallet/balance');
    return response.data.balance;
  }

  async addFunds(amount: number): Promise<number> {
    const response = await apiClient.post('/wallet/add-funds', { amount });
    return response.data.balance;
  }

  // Add other wallet-related methods here
}

export const walletService = new WalletService();
