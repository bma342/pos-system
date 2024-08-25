import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface GuestState {
  profile: {
    id: number;
    firstName: string;
    lastName: string;
    loyaltyPoints: number;
  };
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: GuestState = {
  profile: {
    id: 0,
    firstName: '',
    lastName: '',
    loyaltyPoints: 0,
  },
  status: 'idle',
  error: null,
};

const guestSlice = createSlice({
  name: 'guest',
  initialState,
  reducers: {
    setGuestProfile(state, action: PayloadAction<GuestState['profile']>) {
      state.profile = action.payload;
    },
    setGuestStatus(state, action: PayloadAction<GuestState['status']>) {
      state.status = action.payload;
    },
    setGuestError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setGuestProfile, setGuestStatus, setGuestError } =
  guestSlice.actions;

export const selectGuestProfile = (state: RootState) => state.guest.profile;
export const selectGuestStatus = (state: RootState) => state.guest.status;
export const selectGuestError = (state: RootState) => state.guest.error;

export default guestSlice.reducer;
