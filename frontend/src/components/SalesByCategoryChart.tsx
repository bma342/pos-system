import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Typography, Box, Paper } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSalesByCategory } from '../redux/slices/analyticsSlice';
import { AppDispatch, RootState } from '../redux/store';
import { SalesByCategory } from '../types/analyticsTypes';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const SalesByCategoryChart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { salesByCategory, loading, error } = useSelector((state: RootState) => state.analytics);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    new Date(new Date().setDate(new Date().getDate() - 30)),
    new Date(),
  ]);

  const fetchSalesData = useCallback(() => {
    const [startDate, endDate] = dateRange;
    if (startDate && endDate) {
      const formattedStartDate = format(startDate, 'yyyy-MM-dd');
      const formattedEndDate = format(endDate, 'yyyy-MM-dd');
      dispatch(fetchSalesByCategory({ startDate: formattedStartDate, endDate: formattedEndDate }));
    }
  }, [dateRange, dispatch]);

  useEffect(() => {
    fetchSalesData();
  }, [fetchSalesData]);

  const chartData = useMemo(() => {
    return salesByCategory.map((item: SalesByCategory) => ({
      name: item.category,
      value: item.sales,
    }));
  }, [salesByCategory]);

  if (loading) return <Typography>Loading sales data...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Paper elevation={3}>
      <Box p={3}>
        <Typography variant="h5" gutterBottom>
          Sales by Category
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <DatePicker
              label="Start Date"
              value={dateRange[0]}
              onChange={(newValue: Date | null) => setDateRange([newValue, dateRange[1]])}
            />
            <DatePicker
              label="End Date"
              value={dateRange[1]}
              onChange={(newValue: Date | null) => setDateRange([dateRange[0], newValue])}
            />
          </Box>
        </LocalizationProvider>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default SalesByCategoryChart;
