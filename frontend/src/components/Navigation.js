import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navigation = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        {user && (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/order">OrderPage</Link></li>
            <li><Link to="/inventory">Inventory</Link></li>
            <li><Link to="/orders">Orders</Link></li>
            <li><Link to="/reports">Reports</Link></li>
            <li><Link to="/roles">Roles</Link></li>
          </>
        )}
        {!user && <li><Link to="/login">Login</Link></li>}
      </ul>
    </nav>
  );
};

export default Navigation;
