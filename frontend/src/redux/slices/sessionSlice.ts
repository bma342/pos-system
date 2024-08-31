import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  id: localStorage.getItem('sessionId') || uuidv4(),
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {},
});

export default sessionSlice.reducer;
