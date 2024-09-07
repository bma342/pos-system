import { configureStore } from '@reduxjs/toolkit';
import rootReducer, { RootState } from './rootReducer';

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type { RootState };

export default store;
