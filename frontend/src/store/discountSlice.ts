import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '../api/axios';

interface Discount {
  id: number;
  name: string;
  value: number;
  type: string;
}

interface DiscountState {
  list: Discount[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: DiscountState = {
  list: [],
  status: 'idle',
  error: null,
};

export const fetchDiscounts = createAsyncThunk(
  'discounts/fetchDiscounts',
  async () => {
    const response = await axios.get<Discount[]>('/api/discounts');
    return response.data;
  }
);

export const createDiscount = createAsyncThunk(
  'discounts/createDiscount',
  async (discount: Omit<Discount, 'id'>) => {
    const response = await axios.post<Discount>('/api/discounts', discount);
    return response.data;
  }
);

export const updateDiscount = createAsyncThunk(
  'discounts/updateDiscount',
  async (discount: Discount) => {
    const response = await axios.put<Discount>(
      `/api/discounts/${discount.id}`,
      discount
    );
    return response.data;
  }
);

export const scheduleDiscountDrop = createAsyncThunk(
  'discounts/scheduleDiscountDrop',
  async (scheduleData: {
    discountId: number;
    guestIds: number[];
    scheduleTime: string;
  }) => {
    const response = await axios.post(
      '/api/discounts/schedule-drop',
      scheduleData
    );
    return response.data;
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
      .addCase(
        fetchDiscounts.fulfilled,
        (state, action: PayloadAction<Discount[]>) => {
          state.status = 'succeeded';
          state.list = action.payload;
        }
      )
      .addCase(fetchDiscounts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(
        createDiscount.fulfilled,
        (state, action: PayloadAction<Discount>) => {
          state.list.push(action.payload);
        }
      )
      .addCase(
        updateDiscount.fulfilled,
        (state, action: PayloadAction<Discount>) => {
          const index = state.list.findIndex(
            (discount) => discount.id === action.payload.id
          );
          if (index !== -1) {
            state.list[index] = action.payload;
          }
        }
      )
      .addCase(scheduleDiscountDrop.fulfilled, () => {
        // Optionally handle the response from scheduling the discount drop
      });
  },
});

export default discountSlice.reducer;
