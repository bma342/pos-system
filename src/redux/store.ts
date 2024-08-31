import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import challengeReducer from './slices/challengeSlice';

const store = configureStore({
  reducer: {
    ...rootReducer,
    challenges: challengeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;