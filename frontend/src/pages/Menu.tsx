import React, { useEffect, useCallback, useState, lazy, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchMenu } from '../redux/slices/menuSlice';
import { useSelectedLocation } from '../hooks/useSelectedLocation';
import { useSelectedClient } from '../hooks/useSelectedClient';
import { Typography, CircularProgress, Box, Grid, TextField, useMediaQuery, useTheme } from '@mui/material';
import { MenuItem, MenuGroup } from '../types/menuTypes';
import { addToCart } from '../redux/slices/cartSlice';

// Remove the socket-related code if it's not being used

const LazyMenuItemDisplay = lazy(() => import('../components/MenuItemDisplay'));

const Menu: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedLocation } = useSelectedLocation();
  const selectedClient = useSelectedClient();
  const menu = useSelector((state: RootState) => state.menu.currentMenu);
  const status = useSelector((state: RootState) => state.menu.status);
  const [searchTerm, setSearchTerm] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (selectedClient && selectedLocation) {
      dispatch(fetchMenu({
        clientId: selectedClient.id.toString(),
        locationId: selectedLocation.id
      }));
    }
  }, [dispatch, selectedClient, selectedLocation]);

  const handleAddToCart = (menuItem: MenuItem) => {
    if (selectedClient && selectedLocation) {
      dispatch(addToCart({
        id: `${Date.now()}-${menuItem.id}`,
        clientId: selectedClient.id.toString(),
        locationId: selectedLocation.id,
        name: menuItem.name,
        price: menuItem.price,
        quantity: 1,
        modifiers: [],
        menuItem // Add this line
      }));
    }
  };

  const filterMenuItems = useCallback((group: MenuGroup) => {
    return group.items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  if (status === 'loading') {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress aria-label="Loading menu" />
      </Box>
    );
  }

  if (!menu) {
    return <Typography role="alert">No menu available</Typography>;
  }

  return (
    <Box className="menu-page" role="main" aria-label="Menu" sx={{ p: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>{menu.name}</Typography>
      <TextField
        fullWidth
        variant="outlined"
        label="Search menu items"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        margin="normal"
        aria-label="Search menu items"
      />
      <Grid container spacing={2}>
        {menu.menuGroups?.map((group) => (
          <Grid item xs={12} md={6} key={group.id}>
            <Box mb={4}>
              <Typography variant="h5" component="h2" gutterBottom>{group.name}</Typography>
              <Grid container spacing={2}>
                {filterMenuItems(group).map((item) => (
                  <Grid item xs={12} sm={isMobile ? 12 : 6} key={item.id}>
                    <Suspense fallback={<CircularProgress />}>
                      <LazyMenuItemDisplay item={item} onAddToCart={handleAddToCart} />
                    </Suspense>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Menu;
