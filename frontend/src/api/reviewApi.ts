import axios from 'axios';
import { Review, ReviewCreateData } from '../types/reviewTypes';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const createReview = async (
  reviewData: ReviewCreateData
): Promise<Review> => {
  const response = await axios.post<Review>('/api/reviews', reviewData);
  return response.data;
};

export const getReviewsForMenuItem = async (menuItemId: number) => {
  const response = await axios.get(`${API_URL}/reviews/menuItem/${menuItemId}`);
  return response.data;
};

export const getPendingReviews = async () => {
  const response = await axios.get(`${API_URL}/reviews/pending`);
  return response.data;
};

export const approveReview = async (reviewId: number) => {
  const response = await axios.put(`${API_URL}/reviews/approve/${reviewId}`);
  return response.data;
};

export const deleteReview = async (reviewId: number) => {
  await axios.delete(`${API_URL}/reviews/${reviewId}`);
};
