import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ABTest {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'inactive' | 'completed';
  variants: ABTestVariant[];
}

interface ABTestVariant {
  id: string;
  name: string;
  description: string;
}

interface ABTestState {
  tests: ABTest[];
  loading: boolean;
  error: string | null;
}

const initialState: ABTestState = {
  tests: [],
  loading: false,
  error: null,
};

const abTestSlice = createSlice({
  name: 'abTest',
  initialState,
  reducers: {
    fetchTestsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchTestsSuccess(state, action: PayloadAction<ABTest[]>) {
      state.tests = action.payload;
      state.loading = false;
    },
    fetchTestsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    createTestStart(state) {
      state.loading = true;
      state.error = null;
    },
    createTestSuccess(state, action: PayloadAction<ABTest>) {
      state.tests.push(action.payload);
      state.loading = false;
    },
    createTestFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updateTestStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateTestSuccess(state, action: PayloadAction<ABTest>) {
      const index = state.tests.findIndex(
        (test) => test.id === action.payload.id
      );
      if (index !== -1) {
        state.tests[index] = action.payload;
      }
      state.loading = false;
    },
    updateTestFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchTestsStart,
  fetchTestsSuccess,
  fetchTestsFailure,
  createTestStart,
  createTestSuccess,
  createTestFailure,
  updateTestStart,
  updateTestSuccess,
  updateTestFailure,
} = abTestSlice.actions;

export default abTestSlice.reducer;
