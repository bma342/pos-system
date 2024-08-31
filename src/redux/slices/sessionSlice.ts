import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

interface SessionState {
  id: string;
}

const initialState: SessionState = {
  id: localStorage.getItem('sessionId') || uuidv4(),
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSessionId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
      localStorage.setItem('sessionId', action.payload);
    },
  },
});

export const { setSessionId } = sessionSlice.actions;

export default sessionSlice.reducer;