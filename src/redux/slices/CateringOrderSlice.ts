import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

// ... other code

export const selectCateringOrders = (state: RootState) =>
  state.cateringOrder.orders;

// ... rest of the file