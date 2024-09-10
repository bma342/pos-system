import { reviewApi } from '../api/reviewApi';
import { Review, ReviewCreateData, ReviewStats } from '../types/reviewTypes';

export const reviewService = {
  getReviewsForMenuItem: async (menuItemId: string): Promise<Review[]> => {
    return await reviewApi.getReviewsForMenuItem(menuItemId);
  },

  createReview: async (reviewData: ReviewCreateData): Promise<Review> => {
    return await reviewApi.createReview(reviewData);
  },

  getReviewStats: async (menuItemId: string): Promise<ReviewStats> => {
    return await reviewApi.getReviewStats(menuItemId);
  },

  // Add other review-related service methods here
};
