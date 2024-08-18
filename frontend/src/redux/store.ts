import { configureStore, createSlice, PayloadAction, ThunkAction, Action } from '@reduxjs/toolkit';

// Define a type for the slice state
interface PlaceholderState {
  // Define your state properties here
  value: number;
}

// Define the initial state
const initialState: PlaceholderState = {
  value: 0,
};

// Create the slice
const placeholderSlice = createSlice({
  name: 'placeholder',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

// Export the action creators
export const { increment, decrement, incrementByAmount } = placeholderSlice.actions;

// Create the store
export const store = configureStore({
  reducer: {
    placeholder: placeholderSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
