import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState, InventoryItem } from '../../types';
import axios from 'axios';

interface InventoryState {
  items: InventoryItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: InventoryState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchInventoryItems = createAsyncThunk(
  'inventory/fetchItems',
  async () => {
    const response = await axios.get<InventoryItem[]>('/api/inventory');
    return response.data;
  }
);

export const updateInventoryItem = createAsyncThunk(
  'inventory/updateItem',
  async (item: InventoryItem) => {
    const response = await axios.put<InventoryItem>(
      `/api/inventory/${item.id}`,
      item
    );
    return response.data;
  }
);

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventoryItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchInventoryItems.fulfilled,
        (state, action: PayloadAction<InventoryItem[]>) => {
          state.status = 'succeeded';
          state.items = action.payload;
        }
      )
      .addCase(fetchInventoryItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch inventory items';
      })
      .addCase(
        updateInventoryItem.fulfilled,
        (state, action: PayloadAction<InventoryItem>) => {
          const index = state.items.findIndex(
            (item) => item.id === action.payload.id
          );
          if (index !== -1) {
            state.items[index] = action.payload;
          }
        }
      );
  },
});

export const selectInventoryItems = (state: RootState) => state.inventory.items;
export const selectInventoryStatus = (state: RootState) =>
  state.inventory.status;
export const selectInventoryError = (state: RootState) => state.inventory.error;

export default inventorySlice.reducer;
