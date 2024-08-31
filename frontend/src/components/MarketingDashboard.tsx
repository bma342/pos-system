import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchMarketingMetricsAsync } from '../redux/slices/marketingSlice';
import ABTestManager from './ABTestManager';

const MarketingDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { metrics, status, error } = useSelector(
    (state: RootState) => state.marketing
  );

  useEffect(() => {
    dispatch(fetchMarketingMetricsAsync());
  }, [dispatch]);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div className="marketing-dashboard">
      <h2>Marketing Dashboard</h2>
      <div className="metrics-overview">
        <div className="metric">
          <h3>Customer Acquisition Cost</h3>
          <p>${metrics.customerAcquisitionCost.toFixed(2)}</p>
        </div>
        <div className="metric">
          <h3>Customer Lifetime Value</h3>
          <p>${metrics.customerLifetimeValue.toFixed(2)}</p>
        </div>
        <div className="metric">
          <h3>Conversion Rate</h3>
          <p>{(metrics.conversionRate * 100).toFixed(2)}%</p>
        </div>
        <div className="metric">
          <h3>Average Order Value</h3>
          <p>${metrics.averageOrderValue.toFixed(2)}</p>
        </div>
      </div>
      <ABTestManager />
    </div>
  );
};

export default MarketingDashboard;
