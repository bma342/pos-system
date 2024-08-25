import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from '../redux/slices/authSlice';
import menuReducer from '../redux/slices/menuSlice';
import locationReducer from '../redux/slices/locationSlice';
import discountReducer from '../redux/slices/discountSlice';
import serviceFeeReducer from '../redux/slices/serviceFeeSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  menu: menuReducer,
  locations: locationReducer,
  discounts: discountReducer,
  serviceFees: serviceFeeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;

export default store;
