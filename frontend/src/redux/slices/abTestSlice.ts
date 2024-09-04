import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ABTestService } from '../../services/abTestService';
import { ABTest } from '../../types/abTestTypes';
import { RootState } from '../rootReducer'; // Update this import if necessary

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

export const fetchABTests = createAsyncThunk<ABTest[], void, { rejectValue: string }>(
  'abTest/fetchABTests',
  async (_, { rejectWithValue }) => {
    try {
      return await ABTestService.fetchABTests();
    } catch (error) {
      return rejectWithValue('Failed to fetch AB tests');
    }
  }
);

export const createABTest = createAsyncThunk<ABTest, Omit<ABTest, 'id'>, { rejectValue: string }>(
  'abTest/createABTest',
  async (abTest, { rejectWithValue }) => {
    try {
      return await ABTestService.createABTest(abTest);
    } catch (error) {
      return rejectWithValue('Failed to create AB test');
    }
  }
);

export const updateABTest = createAsyncThunk<ABTest, { id: string; abTest: Partial<ABTest> }, { rejectValue: string }>(
  'abTest/updateABTest',
  async ({ id, abTest }, { rejectWithValue }) => {
    try {
      return await ABTestService.updateABTest(id, abTest);
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
        state.error = action.payload || 'An unknown error occurred';
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

export default abTestSlice.reducer;

// Selectors
export const selectABTests = (state: RootState) => state.abTest.tests;
export const selectABTestStatus = (state: RootState) => state.abTest.status;
export const selectABTestError = (state: RootState) => state.abTest.error;
