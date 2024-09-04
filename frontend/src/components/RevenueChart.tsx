import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { RevenueData } from '../types/revenueTypes';
import { Box, Paper, Typography, TextField } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  data: RevenueData[];
  dateRange: { start: Date; end: Date };
  setDateRange: (dateRange: { start: Date; end: Date }) => void;
}

const RevenueChart: React.FC<Props> = ({ data, dateRange, setDateRange }) => {
  const chartData = {
    labels: data.map((item) => new Date(item.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Revenue',
        data: data.map((item) => item.amount),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
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
        text: 'Revenue Over Time',
      },
    },
  };

  const handleDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'start' | 'end'
  ) => {
    setDateRange({
      ...dateRange,
      [type]: new Date(e.target.value),
    });
  };

  return (
    <Paper elevation={3}>
      <Box p={3}>
        <Typography variant="h5" gutterBottom>
          Revenue Chart
        </Typography>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <TextField
            label="Start Date"
            type="date"
            value={dateRange.start.toISOString().split('T')[0]}
            onChange={(e) => handleDateChange(e, 'start')}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="End Date"
            type="date"
            value={dateRange.end.toISOString().split('T')[0]}
            onChange={(e) => handleDateChange(e, 'end')}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
        <Box height={400}>
          <Line data={chartData} options={options} />
        </Box>
      </Box>
    </Paper>
  );
};

export default RevenueChart;
