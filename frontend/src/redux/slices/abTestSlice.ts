import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ABTest } from '../../types/abTestTypes';
import { ABTestService } from '../../services/abTestService';
import { RootState } from '../store';

interface ABTestState {
  tests: ABTest[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ABTestState = {
  tests: [],
  status: 'idle',
  error: null,
};

export const fetchABTests = createAsyncThunk<ABTest[], { clientId: string, locationId?: string }, { rejectValue: string }>(
  'abTest/fetchABTests',
  async ({ clientId, locationId }, { rejectWithValue }) => {
    try {
      return await ABTestService.fetchABTests(clientId, locationId);
    } catch (error) {
      return rejectWithValue('Failed to fetch AB tests');
    }
  }
);

export const createABTest = createAsyncThunk<ABTest, { clientId: string, locationId: string, abTest: Omit<ABTest, 'id'> }, { rejectValue: string }>(
  'abTest/createABTest',
  async ({ clientId, locationId, abTest }, { rejectWithValue }) => {
    try {
      return await ABTestService.createABTest(clientId, locationId, abTest);
    } catch (error) {
      return rejectWithValue('Failed to create AB test');
    }
  }
);

export const updateABTest = createAsyncThunk<ABTest, { clientId: string, locationId: string, abTestId: string, abTest: Partial<ABTest> }, { rejectValue: string }>(
  'abTest/updateABTest',
  async ({ clientId, locationId, abTestId, abTest }, { rejectWithValue }) => {
    try {
      return await ABTestService.updateABTest(clientId, locationId, abTestId, abTest);
    } catch (error) {
      return rejectWithValue('Failed to update AB test');
    }
  }
);

const abTestSlice = createSlice({
  name: 'abTest',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchABTests.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchABTests.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tests = action.payload;
      })
      .addCase(fetchABTests.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Unknown error occurred';
      })
      .addCase(createABTest.fulfilled, (state, action) => {
        state.tests.push(action.payload);
      })
      .addCase(updateABTest.fulfilled, (state, action) => {
        const index = state.tests.findIndex(test => test.id === action.payload.id);
        if (index !== -1) {
          state.tests[index] = action.payload;
        }
      });
  },
});

export const selectABTests = (state: RootState) => state.abTest.tests;
export const selectABTestStatus = (state: RootState) => state.abTest.status;
export const selectABTestError = (state: RootState) => state.abTest.error;

export default abTestSlice.reducer;
