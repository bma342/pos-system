import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Review, ReviewCreateData } from '../../types/reviewTypes';
import { reviewApi } from '../../api/reviewApi'; // Make sure this import exists

interface ReviewState {
  reviews: {
    [menuItemId: string]: Review[];
  };
  pendingReviews: Review[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ReviewState = {
  reviews: {},
  pendingReviews: [],
  status: 'idle',
  error: null,
};

export const fetchReviewsForMenuItem = createAsyncThunk(
  'review/fetchReviewsForMenuItem',
  async (menuItemId: string) => {
    const response = await reviewApi.getReviewsForMenuItem(menuItemId);
    return { menuItemId, reviews: response };
  }
);

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

export const createReview = createAsyncThunk(
  'review/createReview',
  async (reviewData: ReviewCreateData) => {
    return await reviewApi.createReview(reviewData);
  }
);

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewsForMenuItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReviewsForMenuItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reviews[action.payload.menuItemId] = action.payload.reviews;
      })
      .addCase(fetchReviewsForMenuItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(fetchPendingReviews.fulfilled, (state, action) => {
        state.pendingReviews = action.payload;
      })
      .addCase(approveReview.fulfilled, (state, action) => {
        state.pendingReviews = state.pendingReviews.filter(review => review.id !== action.payload.id);
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.pendingReviews = state.pendingReviews.filter(review => review.id !== action.payload);
      })
      .addCase(createReview.fulfilled, (state, action) => {
        const { menuItemId } = action.payload;
        if (!state.reviews[menuItemId]) {
          state.reviews[menuItemId] = [];
        }
        state.reviews[menuItemId].push(action.payload);
      });
  },
});

export default reviewSlice.reducer;
