import React from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartData } from '../types/dashboardTypes';

interface LazyBarChartProps {
  data: ChartData;
  title: string;
}

const LazyBarChart: React.FC<LazyBarChartProps> = ({ data, title }) => {
  // ... (component implementation)
};

export default LazyBarChart;
