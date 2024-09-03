import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ABTest } from '../../types/abTestTypes';
import { abTestApi } from '../../api/abTestApi';

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

export const fetchABTestsAsync = createAsyncThunk(
  'abTest/fetchABTests',
  async () => {
    const response = await abTestApi.getABTests();
    return response.data;
  }
);

export const createABTestAsync = createAsyncThunk(
  'abTest/createABTest',
  async (abTest: ABTest) => {
    const response = await abTestApi.createABTest(abTest);
    return response.data;
  }
);

export const updateABTestAsync = createAsyncThunk(
  'abTest/updateABTest',
  async (abTest: ABTest) => {
    const response = await abTestApi.updateABTest(abTest);
    return response.data;
  }
);

export const deleteABTestAsync = createAsyncThunk(
  'abTest/deleteABTest',
  async (id: number) => {
    await abTestApi.deleteABTest(id);
    return id;
  }
);

const abTestSlice = createSlice({
  name: 'abTest',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchABTestsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchABTestsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tests = action.payload;
      })
      .addCase(fetchABTestsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(createABTestAsync.fulfilled, (state, action) => {
        state.tests.push(action.payload);
      })
      .addCase(updateABTestAsync.fulfilled, (state, action) => {
        const index = state.tests.findIndex((test) => test.id === action.payload.id);
        if (index !== -1) {
          state.tests[index] = action.payload;
        }
      })
      .addCase(deleteABTestAsync.fulfilled, (state, action) => {
        state.tests = state.tests.filter((test) => test.id !== action.payload);
      });
  },
});

export default abTestSlice.reducer;
