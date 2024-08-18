import { configureStore } from '@reduxjs/toolkit';
import ordersReducer from './slices/ordersSlice';
import menuReducer from './slices/menuSlice';
import cartReducer from './slices/cartSlice';

const store = configureStore({
  reducer: {
    orders: ordersReducer,
    menu: menuReducer,
    cart: cartReducer,
  },
});

export default store;
