import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Interfaces for the hierarchical structure
interface Modifier {
  id: number;
  name: string;
  price: number;
}

interface MenuItem {
  id: number;
  name: string;
  price: number;
  modifiers: Modifier[];
}

interface MenuGroup {
  id: number;
  name: string;
  items: MenuItem[];
}

interface Menu {
  id: number;
  name: string;
  groups: MenuGroup[];
}

interface MenuState {
  menus: Menu[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MenuState = {
  menus: [],
  status: 'idle',
  error: null,
};

// Async thunk for fetching menu data
export const fetchMenus = createAsyncThunk('menu/fetchMenus', async () => {
  const response = await fetch('/api/menu'); // Adjust the endpoint as needed
  if (!response.ok) throw new Error('Failed to fetch menu data');
  return await response.json();
});

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMenus.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.menus = action.payload;
      })
      .addCase(fetchMenus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export default menuSlice.reducer;
