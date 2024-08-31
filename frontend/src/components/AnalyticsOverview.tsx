import React from 'react';
import { RevenueData, CustomerMetrics } from '../types';

interface Props {
  revenue: RevenueData[];
  customerMetrics: CustomerMetrics;
}

const AnalyticsOverview: React.FC<Props> = ({ revenue, customerMetrics }) => {
  const totalRevenue = revenue.reduce((sum, item) => sum + item.amount, 0);
  const averageRevenue = totalRevenue / revenue.length;

  return (
    <div className="analytics-overview">
      <div className="metric">
        <h4>Total Revenue</h4>
        <p>${totalRevenue.toFixed(2)}</p>
      </div>
      <div className="metric">
        <h4>Average Daily Revenue</h4>
        <p>${averageRevenue.toFixed(2)}</p>
      </div>
      <div className="metric">
        <h4>Total Customers</h4>
        <p>{customerMetrics.totalCustomers}</p>
      </div>
      <div className="metric">
        <h4>New Customers</h4>
        <p>{customerMetrics.newCustomers}</p>
      </div>
    </div>
  );
};

export default AnalyticsOverview;
