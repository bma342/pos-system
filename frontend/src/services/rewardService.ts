import axios from 'axios';

class RewardService {
  async getGuestRewards(guestId: string, clientId: string) {
    try {
      const response = await axios.get(`/api/rewards/${clientId}/${guestId}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch guest rewards');
    }
  }

  async redeemReward(guestId: string, clientId: string, rewardId: string) {
    try {
      const response = await axios.post(`/api/rewards/${clientId}/${guestId}/redeem`, { rewardId });
      return response.data;
    } catch (error) {
      throw new Error('Failed to redeem reward');
    }
  }

  async getAvailableRewards(clientId: string) {
    try {
      const response = await axios.get(`/api/rewards/${clientId}/available`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch available rewards');
    }
  }

  async createReward(clientId: string, rewardData: any) {
    try {
      const response = await axios.post(`/api/rewards/${clientId}`, rewardData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create reward');
    }
  }
}

export const rewardService = new RewardService();