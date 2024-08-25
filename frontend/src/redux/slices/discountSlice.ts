import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { fetchDiscountsByLocation } from '../../api/discountApi';

interface DiscountState {
  discounts: { id: string; name: string; value: number }[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: DiscountState = {
  discounts: [],
  status: 'idle',
  error: null,
};

export const fetchDiscounts = createAsyncThunk(
  'discounts/fetchDiscounts',
  async (clientId: number) => {
    const response = await fetchDiscountsByLocation(clientId);
    return response;
  }
);

const discountSlice = createSlice({
  name: 'discounts',
  initialState,
  reducers: {
    addDiscount: (
      state,
      action: PayloadAction<{ id: string; name: string; value: number }>
    ) => {
      state.discounts.push(action.payload);
    },
    updateDiscount: (
      state,
      action: PayloadAction<{ id: string; value: number }>
    ) => {
      const discount = state.discounts.find((d) => d.id === action.payload.id);
      if (discount) {
        discount.value = action.payload.value;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiscounts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDiscounts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.discounts = action.payload;
      })
      .addCase(fetchDiscounts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export const selectDiscounts = (state: RootState) => state.discounts.discounts;
export const selectDiscountsStatus = (state: RootState) =>
  state.discounts.status;
export const selectDiscountsError = (state: RootState) => state.discounts.error;

export const { addDiscount, updateDiscount } = discountSlice.actions;

export default discountSlice.reducer;
