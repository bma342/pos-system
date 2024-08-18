import React from 'react';

const Dashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center md:text-left">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <h2 className="text-lg font-semibold">Overview</h2>
          <p className="text-sm text-gray-600">View overall stats and metrics.</p>
        </div>
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <h2 className="text-lg font-semibold">Reports</h2>
          <p className="text-sm text-gray-600">Access detailed reporting features.</p>
        </div>
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <h2 className="text-lg font-semibold">Settings</h2>
          <p className="text-sm text-gray-600">Manage configurations and options.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
