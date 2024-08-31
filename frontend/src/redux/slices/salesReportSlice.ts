import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SalesData {
  date: string;
  totalSales: number;
  orderCount: number;
  averageOrderValue: number;
}

interface SalesReportState {
  dailySales: SalesData[];
  monthlySales: SalesData[];
  loading: boolean;
  error: string | null;
}

const initialState: SalesReportState = {
  dailySales: [],
  monthlySales: [],
  loading: false,
  error: null,
};

const salesReportSlice = createSlice({
  name: 'salesReport',
  initialState,
  reducers: {
    fetchSalesReportStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDailySalesSuccess(state, action: PayloadAction<SalesData[]>) {
      state.dailySales = action.payload;
      state.loading = false;
    },
    fetchMonthlySalesSuccess(state, action: PayloadAction<SalesData[]>) {
      state.monthlySales = action.payload;
      state.loading = false;
    },
    fetchSalesReportFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchSalesReportStart,
  fetchDailySalesSuccess,
  fetchMonthlySalesSuccess,
  fetchSalesReportFailure,
} = salesReportSlice.actions;

export default salesReportSlice.reducer;
