import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as reviewApi from '../../api/reviewApi';
import { Review } from '../../types/reviewTypes';

interface ReviewState {
  itemReviews: { [key: number]: Review[] };
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
  async (menuItemId: number) => {
    const reviews = await reviewApi.getReviewsForMenuItem(menuItemId);
    return { menuItemId, reviews };
  }
);

export const fetchPendingReviews = createAsyncThunk(
  'reviews/fetchPending',
  async () => {
    return await reviewApi.getPendingReviews();
  }
);

export const approveReview = createAsyncThunk(
  'reviews/approve',
  async (reviewId: number) => {
    return await reviewApi.approveReview(reviewId);
  }
);

export const deleteReview = createAsyncThunk(
  'reviews/delete',
  async (reviewId: number) => {
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
