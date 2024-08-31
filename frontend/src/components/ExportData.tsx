import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { exportToCSV } from '../utils/exportUtils';

const ExportData: React.FC = () => {
  const inventory = useSelector((state: RootState) => state.inventory.items);
  const orders = useSelector((state: RootState) => state.orders.orders);
  const revenue = useSelector((state: RootState) => state.revenue.data);

  const handleExport = (dataType: 'inventory' | 'orders' | 'revenue') => {
    switch (dataType) {
      case 'inventory':
        exportToCSV(inventory, 'inventory_report');
        break;
      case 'orders':
        exportToCSV(orders, 'orders_report');
        break;
      case 'revenue':
        exportToCSV(revenue, 'revenue_report');
        break;
    }
  };

  return (
    <div className="export-data">
      <h3>Export Data</h3>
      <button onClick={() => handleExport('inventory')}>
        Export Inventory
      </button>
      <button onClick={() => handleExport('orders')}>Export Orders</button>
      <button onClick={() => handleExport('revenue')}>Export Revenue</button>
    </div>
  );
};

export default ExportData;
