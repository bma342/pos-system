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
import { RevenueData } from '../types';

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
    <div>
      <div>
        <label>
          Start Date:
          <input
            type="date"
            value={dateRange.start.toISOString().split('T')[0]}
            onChange={(e) => handleDateChange(e, 'start')}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={dateRange.end.toISOString().split('T')[0]}
            onChange={(e) => handleDateChange(e, 'end')}
          />
        </label>
      </div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default RevenueChart;
