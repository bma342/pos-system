import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { InventoryItem } from '../../types';
import { fetchInventory } from 'frontend/src/api/inventoryApi';

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

export const fetchInventory = createAsyncThunk(
  'inventory/fetchInventory',
  async () => {
    const response = await inventoryService.getInventory();
    return response;
  }
);

export const updateInventoryItem = createAsyncThunk(
  'inventory/updateItem',
  async (item: InventoryItem) => {
    const response = await inventoryService.updateInventoryItem(item);
    return response;
  }
);

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInventory.fulfilled, (state, action: PayloadAction<InventoryItem[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchInventory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch inventory';
      })
      .addCase(updateInventoryItem.fulfilled, (state, action: PayloadAction<InventoryItem>) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export const selectInventoryItems = (state: RootState) => state.inventory.items;
export const selectInventoryStatus = (state: RootState) => state.inventory.status;
export const selectInventoryError = (state: RootState) => state.inventory.error;

export default inventorySlice.reducer;
