import axios from 'axios';
import { Review, ReviewCreateData, ReviewStats } from '../types/reviewTypes';

export const reviewApi = {
  fetchPendingReviews: async (clientId: string): Promise<Review[]> => {
    const response = await axios.get(`/api/reviews/pending/${clientId}`);
    return response.data;
  },

  approveReview: async (reviewId: string): Promise<Review> => {
    const response = await axios.put(`/api/reviews/approve/${reviewId}`);
    return response.data;
  },

  deleteReview: async (reviewId: string): Promise<void> => {
    await axios.delete(`/api/reviews/${reviewId}`);
  },

  getReviewsForMenuItem: async (menuItemId: string): Promise<Review[]> => {
    const response = await axios.get(`/api/reviews/menuItem/${menuItemId}`);
    return response.data;
  },

  createReview: async (reviewData: ReviewCreateData): Promise<Review> => {
    const response = await axios.post('/api/reviews', reviewData);
    return response.data;
  },

  getReviewStats: async (menuItemId: string): Promise<ReviewStats> => {
    const response = await axios.get(`/api/reviews/stats/${menuItemId}`);
    return response.data;
  },
};
