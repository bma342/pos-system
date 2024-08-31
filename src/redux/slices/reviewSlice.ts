import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Review } from '../../types/reviewTypes';
import * as reviewApi from '../../api/reviewApi';

interface ReviewState {
  itemReviews: { [menuItemId: string]: Review[] };
  pendingReviews: Review[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ReviewState = {
  itemReviews: {},
  pendingReviews: [],
  status: 'idle',
  error: null,
};

export const fetchReviewsForMenuItem = createAsyncThunk(
  'reviews/fetchForMenuItem',
  async (menuItemId: string) => {
    const response = await reviewApi.getReviewsForMenuItem(menuItemId);
    return { menuItemId, reviews: response };
  }
);

export const fetchPendingReviews = createAsyncThunk(
  'reviews/fetchPending',
  async () => {
    const response = await reviewApi.getPendingReviews();
    return response;
  }
);

export const approveReview = createAsyncThunk(
  'reviews/approve',
  async (reviewId: string) => {
    const response = await reviewApi.approveReview(reviewId);
    return response;
  }
);

export const deleteReview = createAsyncThunk(
  'reviews/delete',
  async (reviewId: string) => {
    await reviewApi.deleteReview(reviewId);
    return reviewId;
  }
);

const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewsForMenuItem.fulfilled, (state, action) => {
        state.itemReviews[action.payload.menuItemId] = action.payload.reviews;
      })
      .addCase(fetchPendingReviews.fulfilled, (state, action) => {
        state.pendingReviews = action.payload;
      })
      .addCase(approveReview.fulfilled, (state, action) => {
        state.pendingReviews = state.pendingReviews.filter(
          (review) => review.id !== action.payload.id
        );
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.pendingReviews = state.pendingReviews.filter(
          (review) => review.id !== action.payload
        );
      });
  },
});

export default reviewSlice.reducer;