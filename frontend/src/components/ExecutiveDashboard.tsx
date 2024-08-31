import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchRevenueAsync } from '../redux/slices/revenueSlice';
import { fetchCustomerMetricsAsync } from '../redux/slices/customerSlice';
import {
  fetchSalesByCategoryAsync,
  fetchTopSellingItemsAsync,
} from '../redux/slices/salesReportSlice';
import { fetchRealtimeMetricsAsync } from '../redux/slices/realtimeMetricsSlice';
import RevenueChart from './RevenueChart';
import CustomerMetricsDisplay from './CustomerMetricsDisplay';
import SalesByCategoryChart from './SalesByCategoryChart';
import TopSellingItemsChart from './TopSellingItemsChart';
import InventoryAlerts from './InventoryAlerts';
import RealtimeMetricsTicker from './RealtimeMetricsTicker';

const ExecutiveDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const revenue = useSelector((state: RootState) => state.revenue.data);
  const customerMetrics = useSelector(
    (state: RootState) => state.customer.metrics
  );
  const inventory = useSelector((state: RootState) => state.inventory.items);
  const { salesByCategory, topSellingItems } = useSelector(
    (state: RootState) => state.salesReport
  );
  const realtimeMetrics = useSelector(
    (state: RootState) => state.realtimeMetrics.data
  );

  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    end: new Date(),
  });

  useEffect(() => {
    dispatch(fetchRevenueAsync(dateRange));
    dispatch(fetchCustomerMetricsAsync());
    dispatch(fetchSalesByCategoryAsync(dateRange));
    dispatch(fetchTopSellingItemsAsync(dateRange));
  }, [dispatch, dateRange]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchRealtimeMetricsAsync());
    }, 60000); // Fetch realtime metrics every minute

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className="executive-dashboard">
      <h2>Executive Dashboard</h2>
      <RealtimeMetricsTicker metrics={realtimeMetrics} />
      <div className="dashboard-grid">
        <div className="dashboard-item">
          <h3>Revenue</h3>
          <RevenueChart
            data={revenue}
            dateRange={dateRange}
            setDateRange={setDateRange}
          />
        </div>
        <div className="dashboard-item">
          <h3>Customer Metrics</h3>
          <CustomerMetricsDisplay metrics={customerMetrics} />
        </div>
        <div className="dashboard-item">
          <h3>Sales by Category</h3>
          <SalesByCategoryChart data={salesByCategory} />
        </div>
        <div className="dashboard-item">
          <h3>Top Selling Items</h3>
          <TopSellingItemsChart data={topSellingItems} />
        </div>
        <div className="dashboard-item">
          <h3>Inventory Alerts</h3>
          <InventoryAlerts
            items={inventory.filter(
              (item) => item.quantity <= item.reorderPoint
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default ExecutiveDashboard;
