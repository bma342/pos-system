import axios from 'axios';
import { Review, ReviewCreateData, ReviewStats } from '../types/reviewTypes';

export const reviewService = {
  getReviews: async (locationId: string, menuItemId?: string, page = 1, limit = 20): Promise<{ reviews: Review[], total: number }> => {
    try {
      const response = await axios.get(`/api/locations/${locationId}/reviews`, {
        params: { menuItemId, page, limit }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch reviews: ' + (error as Error).message);
    }
  },

  addReview: async (reviewData: ReviewCreateData): Promise<Review> => {
    try {
      const response = await axios.post('/api/reviews', reviewData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to add review: ' + (error as Error).message);
    }
  },

  updateReview: async (reviewId: string, reviewData: Partial<Review>): Promise<Review> => {
    try {
      const response = await axios.put(`/api/reviews/${reviewId}`, reviewData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update review: ' + (error as Error).message);
    }
  },

  deleteReview: async (reviewId: string): Promise<void> => {
    try {
      await axios.delete(`/api/reviews/${reviewId}`);
    } catch (error) {
      throw new Error('Failed to delete review: ' + (error as Error).message);
    }
  },

  getReviewStats: async (locationId: string, menuItemId?: string): Promise<ReviewStats> => {
    try {
      const response = await axios.get(`/api/locations/${locationId}/review-stats`, {
        params: { menuItemId }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch review stats: ' + (error as Error).message);
    }
  },

  markReviewHelpful: async (reviewId: string): Promise<void> => {
    try {
      await axios.post(`/api/reviews/${reviewId}/helpful`);
    } catch (error) {
      throw new Error('Failed to mark review as helpful: ' + (error as Error).message);
    }
  },

  respondToReview: async (reviewId: string, response: string): Promise<Review> => {
    try {
      const result = await axios.post(`/api/reviews/${reviewId}/respond`, { response });
      return result.data;
    } catch (error) {
      throw new Error('Failed to respond to review: ' + (error as Error).message);
    }
  }
};
