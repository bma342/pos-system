import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Typography, Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';
import { TopSellingItem } from '../types/analyticsTypes';
import { AnalyticsService } from '../services/AnalyticsService';

const TopSellingItemsChart: React.FC = () => {
  const [topSellingItems, setTopSellingItems] = useState<TopSellingItem[]>([]);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const analyticsService = useMemo(() => new AnalyticsService(), []);

  const fetchTopSellingItems = useCallback(async () => {
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
      const items = await analyticsService.getTopSellingItems(
        formattedStartDate,
        formattedEndDate
      );
      setTopSellingItems(items);
    } catch (err) {
      setError('Failed to fetch top selling items');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [dateRange, analyticsService]);

  useEffect(() => {
    fetchTopSellingItems();
  }, [fetchTopSellingItems]);

  if (isLoading) return <Typography>Loading top selling items...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Top Selling Items
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <DatePicker
            label="Start Date"
            value={dateRange[0]}
            onChange={(newValue: Date | null) =>
              setDateRange([newValue, dateRange[1]])
            }
          />
          <DatePicker
            label="End Date"
            value={dateRange[1]}
            onChange={(newValue: Date | null) =>
              setDateRange([dateRange[0], newValue])
            }
          />
        </Box>
      </LocalizationProvider>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={topSellingItems}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="quantity" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default TopSellingItemsChart;
