import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { InventoryItem } from '../../types/inventoryTypes';
import * as inventoryApi from '../../api/inventoryApi';

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
  async (locationId: string) => {
    return await inventoryApi.getInventory(locationId);
  }
);

export const updateInventoryItem = createAsyncThunk(
  'inventory/updateItem',
  async ({ locationId, itemId, updates }: { locationId: string; itemId: string; updates: Partial<InventoryItem> }) => {
    return await inventoryApi.updateInventoryItem(locationId, itemId, updates);
  }
);

export const syncInventory = createAsyncThunk(
  'inventory/sync',
  async (locationId: string) => {
    return await inventoryApi.syncInventory(locationId);
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
      .addCase(fetchInventory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchInventory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(updateInventoryItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(syncInventory.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export default inventorySlice.reducer;