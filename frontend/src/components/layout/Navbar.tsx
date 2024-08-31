import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { RootState, AppDispatch } from '../../redux/store';
import { logout } from '../../redux/slices/authSlice';

const Navbar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  const menuItems = useMemo(() => {
    const items = [
      { label: 'Dashboard', path: '/' },
      { label: 'Locations', path: '/admin/locations' },
      { label: 'Loyalty', path: '/admin/loyalty' },
      { label: 'Branding', path: '/admin/branding' },
      { label: 'AB Tests', path: '/admin/ab-tests' },
      { label: 'Reporting', path: '/admin/reporting' },
    ];

    if (user?.role === 'admin') {
      items.push({ label: 'Global Admin', path: '/global-admin' });
    }

    return items;
  }, [user?.role]);

  if (!isAuthenticated) return null;

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          POS Admin
        </Typography>
        {menuItems.map((item) => (
          <Button
            key={item.path}
            color="inherit"
            component={Link}
            to={item.path}
          >
            {item.label}
          </Button>
        ))}
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default React.memo(Navbar);
