import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Typography, Box } from '@mui/material';
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
import { AnalyticsService } from '../services/analyticsService';
import { SalesByCategory } from '../types/analyticsTypes';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const SalesByCategoryChart: React.FC = () => {
  const [salesData, setSalesData] = useState<SalesByCategory[]>([]);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const analyticsService = useMemo(() => new AnalyticsService(), []);

  const fetchSalesData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [startDate, endDate] = dateRange;
      const formattedStartDate = startDate
        ? format(startDate, 'yyyy-MM-dd')
        : undefined;
      const formattedEndDate = endDate
        ? format(endDate, 'yyyy-MM-dd')
        : undefined;
      const data = await analyticsService.getSalesByCategory(
        formattedStartDate,
        formattedEndDate
      );
      setSalesData(data);
    } catch (err) {
      setError('Failed to fetch sales data');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [dateRange, analyticsService]);

  useEffect(() => {
    fetchSalesData();
  }, [fetchSalesData]);

  if (isLoading) return <Typography>Loading sales data...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
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
            data={salesData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {salesData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default SalesByCategoryChart;
