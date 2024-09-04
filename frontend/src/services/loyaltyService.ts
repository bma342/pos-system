import { LoyaltyReward, LoyaltyConfig } from '../types';
import {
  getLoyaltyRewards,
  createLoyaltyReward,
  updateLoyaltyReward,
  deleteLoyaltyReward,
  getLoyaltyConfig,
  updateLoyaltyConfig,
} from '../api/loyaltyApi';

export const loyaltyService = {
  getLoyaltyRewards,
  createLoyaltyReward,
  updateLoyaltyReward,
  deleteLoyaltyReward,
  getLoyaltyConfig,
  updateLoyaltyConfig,
};
