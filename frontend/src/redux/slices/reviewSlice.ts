import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { reviewService } from '../../services/reviewService';
import { Review } from '../../types/reviewTypes'; // Import the Review type from your types file

interface ReviewState {
  reviews: Review[];
  loading: boolean;
  error: string | null;
}

const initialState: ReviewState = {
  reviews: [],
  loading: false,
  error: null,
};

export const fetchReviews = createAsyncThunk<
  Review[],
  string,
  { rejectValue: string }
>(
  'review/fetchReviews',
  async (itemId, { rejectWithValue }) => {
    try {
      const reviews = await reviewService.getReviews(itemId);
      return reviews;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    addReview: (state, action: PayloadAction<Review>) => {
      state.reviews.push(action.payload);
    },
    updateReview: (state, action: PayloadAction<Review>) => {
      const index = state.reviews.findIndex(review => review.id === action.payload.id);
      if (index !== -1) {
        state.reviews[index] = action.payload;
      }
    },
    deleteReview: (state, action: PayloadAction<string>) => {
      state.reviews = state.reviews.filter(review => review.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An unknown error occurred';
      });
  },
});

export const { addReview, updateReview, deleteReview } = reviewSlice.actions;

export const selectReviews = (state: RootState) => state.review.reviews;
export const selectReviewsLoading = (state: RootState) => state.review.loading;
export const selectReviewsError = (state: RootState) => state.review.error;

export default reviewSlice.reducer;
