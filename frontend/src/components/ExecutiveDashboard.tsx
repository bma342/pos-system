import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import {
  fetchRevenue,
  fetchCustomerMetrics,
  fetchSalesByCategory,
  fetchTopSellingItems,
  fetchRealtimeMetrics
} from '../redux/slices/dashboardSlice';
import RevenueChart from './RevenueChart';
import CustomerMetricsDisplay from './CustomerMetricsDisplay';
import SalesByCategoryChart from './SalesByCategoryChart';
import TopSellingItemsChart from './TopSellingItemsChart';
import InventoryAlerts from './InventoryAlerts';
import RealtimeMetricsTicker from './RealtimeMetricsTicker';
import { DateRange } from '../types/dateTypes';

const ExecutiveDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { revenue, customerMetrics, inventory, salesReport, realtimeMetrics } = useSelector((state: RootState) => state.dashboard);

  const [dateRange, setDateRange] = useState<DateRange>({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    end: new Date(),
  });

  useEffect(() => {
    dispatch(fetchRevenue(dateRange));
    dispatch(fetchCustomerMetrics());
    dispatch(fetchSalesByCategory(dateRange));
    dispatch(fetchTopSellingItems(dateRange));
  }, [dispatch, dateRange]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchRealtimeMetrics());
    }, 60000); // Fetch realtime metrics every minute

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div>
      <h1>Executive Dashboard</h1>
      <RevenueChart data={revenue} dateRange={dateRange} setDateRange={setDateRange} />
      <CustomerMetricsDisplay metrics={customerMetrics} />
      <SalesByCategoryChart data={salesReport.salesByCategory} />
      <TopSellingItemsChart data={salesReport.topSellingItems} />
      <InventoryAlerts inventory={inventory} />
      <RealtimeMetricsTicker metrics={realtimeMetrics} />
    </div>
  );
};

export default ExecutiveDashboard;
