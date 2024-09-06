import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Review, ReviewStats, ReviewCreateData } from '../../types/reviewTypes';
import { reviewService } from '../../services/reviewService';

interface ReviewState {
  reviews: Review[];
  stats: ReviewStats | null;
  loading: boolean;
  error: string | null;
  total: number;
}

const initialState: ReviewState = {
  reviews: [],
  stats: null,
  loading: false,
  error: null,
  total: 0,
};

export const fetchReviews = createAsyncThunk<
  { reviews: Review[], total: number },
  { locationId: string; menuItemId?: string; page?: number; limit?: number },
  { rejectValue: string }
>(
  'review/fetchReviews',
  async ({ locationId, menuItemId, page, limit }, { rejectWithValue }) => {
    try {
      return await reviewService.getReviews(locationId, menuItemId, page, limit);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const addReview = createAsyncThunk<Review, ReviewCreateData, { rejectValue: string }>(
  'review/addReview',
  async (reviewData, { rejectWithValue }) => {
    try {
      return await reviewService.addReview(reviewData);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateReview = createAsyncThunk<Review, { reviewId: string; reviewData: Partial<Review> }, { rejectValue: string }>(
  'review/updateReview',
  async ({ reviewId, reviewData }, { rejectWithValue }) => {
    try {
      return await reviewService.updateReview(reviewId, reviewData);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const deleteReview = createAsyncThunk<string, string, { rejectValue: string }>(
  'review/deleteReview',
  async (reviewId, { rejectWithValue }) => {
    try {
      await reviewService.deleteReview(reviewId);
      return reviewId;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchReviewStats = createAsyncThunk<ReviewStats, { locationId: string; menuItemId?: string }, { rejectValue: string }>(
  'review/fetchReviewStats',
  async ({ locationId, menuItemId }, { rejectWithValue }) => {
    try {
      return await reviewService.getReviewStats(locationId, menuItemId);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload.reviews;
        state.total = action.payload.total;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An unknown error occurred';
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.reviews.unshift(action.payload);
        state.total += 1;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        const index = state.reviews.findIndex(review => review.id === action.payload.id);
        if (index !== -1) {
          state.reviews[index] = action.payload;
        }
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter(review => review.id !== action.payload);
        state.total -= 1;
      })
      .addCase(fetchReviewStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      });
  },
});

export const selectReviews = (state: RootState) => state.review.reviews;
export const selectReviewsLoading = (state: RootState) => state.review.loading;
export const selectReviewsError = (state: RootState) => state.review.error;
export const selectReviewStats = (state: RootState) => state.review.stats;
export const selectReviewsTotal = (state: RootState) => state.review.total;

export default reviewSlice.reducer;
