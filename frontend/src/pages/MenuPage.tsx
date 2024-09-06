import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchMenu, selectMenu, selectMenuLoading } from '../redux/slices/menuSlice';
import { menuService } from '../services/menuService';
import { Menu, MenuItem, MenuStatistics, MenuGroup } from '../types/menuTypes';
import LoadingSpinner from '../components/LoadingSpinner';
import { useSelectedLocation } from '../hooks/useSelectedLocation';
import { useSelectedClient } from '../hooks/useSelectedClient';
import { Typography, Grid, Box, useMediaQuery, useTheme } from '@mui/material';

const LazyMenuItemCard = lazy(() => import('../components/MenuItemCard'));

const MenuPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedLocation } = useSelectedLocation();
  const selectedClient = useSelectedClient();
  const menu = useSelector((state: RootState) => selectMenu(state));
  const loading = useSelector((state: RootState) => selectMenuLoading(state));
  const [menuStatistics, setMenuStatistics] = useState<MenuStatistics | null>(null);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (selectedLocation && selectedClient) {
      dispatch(fetchMenu({ 
        clientId: selectedClient.id.toString(), 
        locationId: selectedLocation.id.toString() 
      }))
        .unwrap()
        .then(() => menuService.getMenuStatistics(selectedClient.id.toString(), selectedLocation.id.toString()))
        .then(stats => setMenuStatistics(stats))
        .catch((err: Error) => console.error('Failed to fetch menu or statistics:', err));
    }
  }, [dispatch, selectedLocation, selectedClient]);

  useEffect(() => {
    if (menu && menu.menuGroups.length > 0) {
      setActiveGroup(menu.menuGroups[0].id);
    }
  }, [menu]);

  const handleItemSelect = (item: MenuItem) => {
    // Implement item selection logic here
    console.log('Selected item:', item);
  };

  const handleGroupChange = (groupId: string) => {
    setActiveGroup(groupId);
  };

  if (loading) return <LoadingSpinner />;
  if (!menu) return <Typography variant="h6">No menu available</Typography>;

  return (
    <Box className="menu-page" sx={{ p: isMobile ? 1 : 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {menu.name}
      </Typography>
      
      {menuStatistics && (
        <Box className="menu-statistics" sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>Menu Statistics</Typography>
          <Typography>Total Items: {menuStatistics.totalItems}</Typography>
          <Typography>Average Price: ${menuStatistics.averagePrice.toFixed(2)}</Typography>
          <Typography>Most Popular Items:</Typography>
          <ul>
            {menuStatistics.mostPopularItems?.map((item: MenuItem) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
          <Typography>Average Order Value: ${menuStatistics.averageOrderValue.toFixed(2)}</Typography>
        </Box>
      )}

      <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
        <Box sx={{ width: isMobile ? '100%' : '200px', mr: isMobile ? 0 : 2, mb: isMobile ? 2 : 0 }}>
          {menu.menuGroups.map((group: MenuGroup) => (
            <Box
              key={group.id}
              onClick={() => handleGroupChange(group.id)}
              sx={{
                p: 1,
                cursor: 'pointer',
                backgroundColor: activeGroup === group.id ? 'primary.main' : 'background.paper',
                color: activeGroup === group.id ? 'primary.contrastText' : 'text.primary',
                '&:hover': {
                  backgroundColor: 'primary.light',
                },
              }}
            >
              <Typography>{group.name}</Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          {menu.menuGroups
            .filter((group: MenuGroup) => activeGroup === group.id)
            .map((group: MenuGroup) => (
              <Box key={group.id} className="menu-group">
                <Typography variant="h5" component="h2" gutterBottom>{group.name}</Typography>
                <Grid container spacing={2}>
                  {group.items.map(item => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                      <Suspense fallback={<div>Loading...</div>}>
                        <LazyMenuItemCard item={item} onSelect={handleItemSelect} />
                      </Suspense>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default MenuPage;
