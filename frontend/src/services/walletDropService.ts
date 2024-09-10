import axios from 'axios';
import { WalletDrop } from '../types/walletTypes';

export class WalletDropService {
  async createWalletDrop(walletDrop: Partial<WalletDrop>): Promise<WalletDrop> {
    const response = await axios.post<WalletDrop>('/api/wallet-drops', walletDrop);
    return response.data;
  }

  async fetchWalletDrops(): Promise<WalletDrop[]> {
    const response = await axios.get<WalletDrop[]>('/api/wallet-drops');
    return response.data;
  }
}