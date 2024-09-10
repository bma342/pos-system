import React, { useState, useEffect } from 'react';
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
import { analyticsService, TopSellingItem } from '../services/analyticsService';
import { useAuth } from '../hooks/useAuth';

const TopSellingItemsChart: React.FC = () => {
  const [topSellingItems, setTopSellingItems] = useState<TopSellingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchTopSellingItems = async () => {
      if (!user?.clientId) return;

      setLoading(true);
      try {
        const endDate = new Date().toISOString();
        const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(); // 30 days ago
        const items = await analyticsService.getTopSellingItems(user.clientId, startDate, endDate);
        setTopSellingItems(items);
      } catch (err) {
        setError('Failed to fetch top selling items');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopSellingItems();
  }, [user]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ width: '100%', height: 300 }}>
      <Typography variant="h6" gutterBottom>
        Top Selling Items
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={topSellingItems}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="itemName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="quantity" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default TopSellingItemsChart;
