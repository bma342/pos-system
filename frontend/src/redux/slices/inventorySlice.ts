import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { InventoryItem } from '../../types';
import {
  fetchInventoryItems,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  updateInventoryQuantity,
} from '../../api/inventoryApi';

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
    const response = await fetchInventoryItems();
    return response;
  }
);

export const addInventoryItem = createAsyncThunk(
  'inventory/addInventoryItem',
  async (itemData: Partial<InventoryItem>) => {
    const response = await createInventoryItem(itemData);
    return response;
  }
);

export const editInventoryItem = createAsyncThunk(
  'inventory/editInventoryItem',
  async ({
    id,
    itemData,
  }: {
    id: number;
    itemData: Partial<InventoryItem>;
  }) => {
    const response = await updateInventoryItem(id, itemData);
    return response;
  }
);

export const removeInventoryItem = createAsyncThunk(
  'inventory/removeInventoryItem',
  async (id: number) => {
    await deleteInventoryItem(id);
    return id;
  }
);

export const updateQuantity = createAsyncThunk(
  'inventory/updateQuantity',
  async ({ id, quantity }: { id: number; quantity: number }) => {
    const response = await updateInventoryQuantity(id, quantity);
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
      .addCase(fetchInventory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchInventory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(addInventoryItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(editInventoryItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(removeInventoryItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index].quantity = action.payload.quantity;
        }
      });
  },
});

export default inventorySlice.reducer;
