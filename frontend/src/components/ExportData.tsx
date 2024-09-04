import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { exportToCSV } from '../utils/exportUtils';
import { Button, Typography, Box } from '@mui/material';
import { InventoryItem, Order, RevenueData } from '../types';

const ExportData: React.FC = () => {
  const inventory = useSelector((state: RootState) => state.inventory.items);
  const orders = useSelector((state: RootState) => state.orders.orders);
  const revenue = useSelector((state: RootState) => state.revenue.data);

  const handleExport = (dataType: 'inventory' | 'orders' | 'revenue') => {
    switch (dataType) {
      case 'inventory':
        exportToCSV(inventory as InventoryItem[], 'inventory_report');
        break;
      case 'orders':
        exportToCSV(orders as Order[], 'orders_report');
        break;
      case 'revenue':
        exportToCSV(revenue as RevenueData[], 'revenue_report');
        break;
    }
  };

  return (
    <Box className="export-data">
      <Typography variant="h3" gutterBottom>Export Data</Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        <Button variant="contained" color="primary" onClick={() => handleExport('inventory')}>
          Export Inventory
        </Button>
        <Button variant="contained" color="primary" onClick={() => handleExport('orders')}>
          Export Orders
        </Button>
        <Button variant="contained" color="primary" onClick={() => handleExport('revenue')}>
          Export Revenue
        </Button>
      </Box>
    </Box>
  );
};

export default ExportData;
