import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PopularItem } from '../types/dashboardTypes';

interface LazyChartProps {
  data: PopularItem[];
}

const LazyChart: React.FC<LazyChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="orderCount" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default LazyChart;