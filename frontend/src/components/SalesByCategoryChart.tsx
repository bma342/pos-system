import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchSalesByCategory } from '../redux/slices/analyticsSlice';
import { useAuth } from '../hooks/useAuth';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Typography, Box, CircularProgress } from '@mui/material';

const SalesByCategoryChart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();
  const { salesByCategory, loading, error } = useSelector((state: RootState) => state.analytics);

  useEffect(() => {
    if (user?.clientId) {
      dispatch(fetchSalesByCategory(user.clientId));
    }
  }, [dispatch, user]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  const chartData = salesByCategory.map((item) => ({
    name: item.category,
    value: item.sales,
  }));

  return (
    <Box sx={{ width: '100%', height: 300 }}>
      <Typography variant="h6" gutterBottom>
        Sales by Category
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default SalesByCategoryChart;
