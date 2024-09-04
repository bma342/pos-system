import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from '../redux/slices/authSlice'; // Change to default import
import menuReducer from '../redux/slices/menuSlice';
import locationReducer from '../redux/slices/locationSlice';
import discountReducer from '../redux/slices/discountSlice';
import serviceFeeReducer from '../redux/slices/serviceFeeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer, // Use authReducer directly
    menu: menuReducer,
    locations: locationReducer,
    discounts: discountReducer,
    serviceFees: serviceFeeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

