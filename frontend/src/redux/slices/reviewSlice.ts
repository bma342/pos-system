import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Review, ReviewCreateData, ReviewStats } from '../../types/reviewTypes';
import { reviewApi } from '../../api/reviewApi';

interface ReviewState {
  pendingReviews: Review[];
  menuItemReviews: Review[];
  reviewStats: ReviewStats | null;
  loading: boolean;
  error: string | null;
}

const initialState: ReviewState = {
  pendingReviews: [],
  menuItemReviews: [],
  reviewStats: null,
  loading: false,
  error: null,
};

export const fetchPendingReviews = createAsyncThunk(
  'review/fetchPendingReviews',
  async (clientId: string) => {
    return await reviewApi.fetchPendingReviews(clientId);
  }
);

export const approveReview = createAsyncThunk(
  'review/approveReview',
  async (reviewId: string) => {
    return await reviewApi.approveReview(reviewId);
  }
);

export const deleteReview = createAsyncThunk(
  'review/deleteReview',
  async (reviewId: string) => {
    await reviewApi.deleteReview(reviewId);
    return reviewId;
  }
);

export const fetchReviewsForMenuItem = createAsyncThunk(
  'review/fetchReviewsForMenuItem',
  async (menuItemId: string) => {
    return await reviewApi.getReviewsForMenuItem(menuItemId);
  }
);

export const createReview = createAsyncThunk(
  'review/createReview',
  async (reviewData: ReviewCreateData) => {
    return await reviewApi.createReview(reviewData);
  }
);

export const fetchReviewStats = createAsyncThunk(
  'review/fetchReviewStats',
  async (menuItemId: string) => {
    return await reviewApi.getReviewStats(menuItemId);
  }
);

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPendingReviews.fulfilled, (state, action) => {
        state.pendingReviews = action.payload;
      })
      .addCase(approveReview.fulfilled, (state, action) => {
        state.pendingReviews = state.pendingReviews.filter(review => review.id !== action.payload.id);
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.pendingReviews = state.pendingReviews.filter(review => review.id !== action.payload);
      })
      .addCase(fetchReviewsForMenuItem.fulfilled, (state, action) => {
        state.menuItemReviews = action.payload;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.menuItemReviews.push(action.payload);
      })
      .addCase(fetchReviewStats.fulfilled, (state, action) => {
        state.reviewStats = action.payload;
      });
  },
});

export default reviewSlice.reducer;
