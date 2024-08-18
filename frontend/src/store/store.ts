import { configureStore } from '@reduxjs/toolkit';

// Define a placeholder reducer, you can replace it with your actual reducers
const placeholderReducer = (state = {}, action) => {
  return state;
};

// Create the Redux store
const store = configureStore({
  reducer: {
    placeholder: placeholderReducer,
  },
});

export default store;
