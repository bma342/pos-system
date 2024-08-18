import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import ordersReducer from './features/ordersSlice';
import rolesReducer from './features/rolesSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  orders: ordersReducer,
  roles: rolesReducer,
  // Add any other reducers here
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
