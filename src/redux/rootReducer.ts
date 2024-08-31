import { combineReducers } from '@reduxjs/toolkit';
import orderReducer from './slices/orderSlice';
import userReducer from './slices/userSlice';
import challengeReducer from './slices/challengeSlice';
// Import other reducers

const rootReducer = combineReducers({
  order: orderReducer,
  user: userReducer,
  challenges: challengeReducer,
  // Add other reducers
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;