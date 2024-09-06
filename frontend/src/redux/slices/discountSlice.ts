import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { DiscountService } from '../../services/discountService';
import { Discount } from '../../types/discountTypes';

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

export const fetchDiscounts = createAsyncThunk(
  'discounts/fetchDiscounts',
  async (clientId: string) => {
    return await DiscountService.fetchDiscounts(clientId);
  }
);

export const createDiscount = createAsyncThunk(
  'discounts/createDiscount',
  async ({ clientId, discount }: { clientId: string; discount: Omit<Discount, 'id'> }) => {
    return await DiscountService.createDiscount(clientId, discount);
  }
);

export const updateDiscount = createAsyncThunk(
  'discounts/updateDiscount',
  async ({ clientId, discountId, discount }: { clientId: string; discountId: string; discount: Partial<Discount> }) => {
    return await DiscountService.updateDiscount(clientId, discountId, discount);
  }
);

export const deleteDiscount = createAsyncThunk(
  'discounts/deleteDiscount',
  async ({ clientId, discountId }: { clientId: string; discountId: string }) => {
    await DiscountService.deleteDiscount(clientId, discountId);
    return discountId;
  }
);

const discountSlice = createSlice({
  name: 'discounts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiscounts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDiscounts.fulfilled, (state, action: PayloadAction<Discount[]>) => {
        state.status = 'succeeded';
        state.discounts = action.payload;
      })
      .addCase(fetchDiscounts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(createDiscount.fulfilled, (state, action: PayloadAction<Discount>) => {
        state.discounts.push(action.payload);
      })
      .addCase(updateDiscount.fulfilled, (state, action: PayloadAction<Discount>) => {
        const index = state.discounts.findIndex(d => d.id === action.payload.id);
        if (index !== -1) {
          state.discounts[index] = action.payload;
        }
      })
      .addCase(deleteDiscount.fulfilled, (state, action: PayloadAction<string>) => {
        state.discounts = state.discounts.filter(d => d.id !== action.payload);
      });
  },
});

export const selectDiscounts = (state: RootState) => state.discount.discounts;
export const selectDiscountStatus = (state: RootState) => state.discount.status;
export const selectDiscountsError = (state: RootState) => state.discount.error;

export default discountSlice.reducer;
