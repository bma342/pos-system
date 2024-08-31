import React from 'react';
import { CustomerMetrics } from '../types';

interface Props {
  metrics: CustomerMetrics;
}

const CustomerMetricsDisplay: React.FC<Props> = ({ metrics }) => {
  return (
    <div className="customer-metrics-display">
      <div className="metric">
        <h4>Total Customers</h4>
        <p>{metrics.totalCustomers}</p>
      </div>
      <div className="metric">
        <h4>New Customers</h4>
        <p>{metrics.newCustomers}</p>
      </div>
      <div className="metric">
        <h4>Repeat Customers</h4>
        <p>{metrics.repeatCustomers}</p>
      </div>
      <div className="metric">
        <h4>Average Order Value</h4>
        <p>${metrics.averageOrderValue.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CustomerMetricsDisplay;
