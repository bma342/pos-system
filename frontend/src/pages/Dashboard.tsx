import React, { useEffect, useState } from 'react';
import { useClientContext } from '../context/ClientContext';
import { CateringOrderService } from '../services/CateringOrderService';
import { MenuService } from '../services/MenuService';
import {
  Typography,
  Grid,
  Paper,
  CircularProgress,
  Button,
} from '@mui/material';
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
import { OrderStatistics } from '../types/cateringOrderTypes';
import { MenuStatistics } from '../types/menuTypes';
import { fetchCateringOrders } from 'frontend/src/api/cateringOrderApi';
import { fetchMenuSummary } from 'frontend/src/api/menuApi';

const Dashboard: React.FC = () => {
  const { user } = useClientContext();
  const [orderStats, setOrderStats] = useState<OrderStatistics | null>(null);
  const [menuStats, setMenuStats] = useState<MenuStatistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.clientId) return;

      try {
        const endDate = new Date().toISOString();
        const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(); // Last 30 days
        const [orderStatsData, menuStatsData] = await Promise.all([
          CateringOrderService.getOrderStatistics(user.clientId, startDate, endDate),
          MenuService.getMenuStatistics(user.clientId, startDate, endDate),
        ]);
        setOrderStats(orderStatsData);
        setMenuStats(menuStatsData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load dashboard data. Please try again.');
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.clientId]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  const popularItemsData = menuStats?.mostPopularItems.map((item) => ({
    name: item.name,
    orders: item.orderCount,
  })) || [];

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h6">Total Orders</Typography>
            <Typography variant="h4">{orderStats?.totalOrders}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h6">Total Revenue</Typography>
            <Typography variant="h4">
              ${orderStats?.totalRevenue.toFixed(2)}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h6">Average Order Value</Typography>
            <Typography variant="h4">
              ${orderStats?.averageOrderValue.toFixed(2)}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h6">Total Menu Items</Typography>
            <Typography variant="h4">{menuStats?.totalItems}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Most Popular Items
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={popularItemsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="orders" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
      <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
        View Detailed Reports
      </Button>
    </div>
  );
};

export default Dashboard;
