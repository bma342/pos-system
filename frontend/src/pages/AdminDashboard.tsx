import React from 'react';
import RoleBasedAccess from '../components/RoleBasedAccess';
import ReportingDashboard from '../components/ReportingDashboard';

const AdminDashboard: React.FC = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <RoleBasedAccess allowedRoles={['admin', 'manager']}>
        <ReportingDashboard />
      </RoleBasedAccess>
      {/* Other admin components */}
    </div>
  );
};

export default AdminDashboard;
