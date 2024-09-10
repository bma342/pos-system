import React from 'react';
import { useClient } from '../context/ClientContext';

const BusinessAdminDashboard: React.FC = () => {
  const { client } = useClient();

  if (!client) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{client.name} Admin Dashboard</h1>
      {/* Add dashboard content here */}
    </div>
  );
};

export default BusinessAdminDashboard;
