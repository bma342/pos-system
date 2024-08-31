import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Discount } from '../../types/discountTypes';
import * as discountApi from '../../api/discountApi';

interface DiscountState {
  discounts: Discount[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: DiscountState = {
  discounts: [],
  status: 'idle',
  error: null,
};

export const fetchDiscountsByLocation = createAsyncThunk(
  'discounts/fetchByLocation',
  async (locationId: string) => {
    return await discountApi.fetchDiscountsByLocation(locationId);
  }
);

const discountSlice = createSlice({
  name: 'discounts',
  initialState,
  reducers: {
    addDiscount: (state, action: PayloadAction<Discount>) => {
      state.discounts.push(action.payload);
    },
    updateDiscount: (state, action: PayloadAction<Discount>) => {
      const index = state.discounts.findIndex((d) => d.id === action.payload.id);
      if (index !== -1) {
        state.discounts[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiscountsByLocation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDiscountsByLocation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.discounts = action.payload;
      })
      .addCase(fetchDiscountsByLocation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export const { addDiscount, updateDiscount } = discountSlice.actions;

export const selectDiscounts = (state: RootState) => state.discount.discounts;
export const selectDiscountsStatus = (state: RootState) => state.discount.status;
export const selectDiscountsError = (state: RootState) => state.discount.error;

export default discountSlice.reducer;