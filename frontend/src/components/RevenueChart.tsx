import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { TextField, Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRevenueData } from '../redux/slices/revenueSlice';
import { AppDispatch, RootState } from '../redux/store';
import { useAuth } from '../hooks/useAuth';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const RevenueChart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();
  const revenueData = useSelector((state: RootState) => state.revenue.data);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  useEffect(() => {
    if (user?.clientId && startDate && endDate) {
      dispatch(fetchRevenueData({ clientId: user.clientId, startDate, endDate }));
    }
  }, [dispatch, user, startDate, endDate]);

  const chartData = {
    labels: revenueData.map((item) => item.date),
    datasets: [
      {
        label: 'Revenue',
        data: revenueData.map((item) => item.revenue),
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Revenue Chart',
      },
    },
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'start' | 'end') => {
    const date = e.target.value;
    if (type === 'start') {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Revenue Chart
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDateChange(e, 'start')}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDateChange(e, 'end')}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box>
      <Line options={options} data={chartData} />
    </Box>
  );
};

export default RevenueChart;
