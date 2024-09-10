import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchMenuItemsAsync, setSelectedGroup } from '../redux/slices/menuItemsSlice';
import LoadingSpinner from '../components/LoadingSpinner';
import { MenuItem, MenuGroup } from '../types/menuTypes';
import { useClientBranding } from '../hooks/useClientBranding';
import { Typography, Box, Alert, Grid, Select, MenuItem as MuiMenuItem, FormControl, InputLabel } from '@mui/material';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import '../styles/variables.css';

const LazyMenuItemCard = lazy(() => import('../components/MenuItemCard'));
const LazyMenuItemModal = lazy(() => import('../components/MenuItemModal'));

const GuestMenuPage: React.FC = () => {
  const { clientId, locationId } = useParams<{ clientId: string; locationId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const menuItems = useSelector((state: RootState) => state.menuItems.items);
  const status = useSelector((state: RootState) => state.menuItems.status);
  const error = useSelector((state: RootState) => state.menuItems.error);
  const selectedGroupId = useSelector((state: RootState) => state.menuItems.selectedGroupId);
  const { branding } = useClientBranding();

  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    if (clientId && locationId) {
      dispatch(fetchMenuItemsAsync({ clientId, locationId }));
    }
  }, [dispatch, clientId, locationId]);

  const handleAddToCart = (item: MenuItem, quantity: number) => {
    console.log(`Added ${quantity} ${item.name} to cart`);
    setSelectedItem(null);
  };

  const groupedMenuItems = useMemo(() => {
    const groups: Record<string, MenuItem[]> = { all: [] };
    menuItems.forEach((item: MenuItem) => {
      groups.all.push(item);
      if (!groups[item.groupName]) {
        groups[item.groupName] = [];
      }
      groups[item.groupName].push(item);
    });
    return groups;
  }, [menuItems]);

  const sortedMenuItems = useMemo(() => {
    const items = groupedMenuItems[selectedGroupId || 'all'] || [];
    return items.sort((a: MenuItem, b: MenuItem) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
  }, [groupedMenuItems, selectedGroupId, sortOrder]);

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const item = sortedMenuItems[index];
    return (
      <div style={style}>
        <Suspense fallback={<LoadingSpinner />}>
          <LazyMenuItemCard
            item={item}
            onSelect={() => setSelectedItem(item)}
          />
        </Suspense>
      </div>
    );
  };

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (status === 'failed') {
    return (
      <Alert severity="error" aria-live="assertive">
        Error loading menu: {error}. Please try again later or contact support.
      </Alert>
    );
  }

  return (
    <Box
      className="guest-menu-page"
      sx={{ 
        backgroundColor: 'var(--background-color)',
        padding: { xs: 2, sm: 3, md: 4 },
        fontFamily: 'var(--font-family)',
      }}
    >
      <Typography variant="h1" sx={{ color: 'var(--primary-color)', marginBottom: 3 }}>
        {branding?.restaurantName} Menu
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="menu-group-select-label">Menu Group</InputLabel>
          <Select
            labelId="menu-group-select-label"
            value={selectedGroupId || ''}
            onChange={(e) => dispatch(setSelectedGroup(e.target.value as string))}
            label="Menu Group"
            aria-label="Select menu group"
          >
            <MuiMenuItem value="">All Groups</MuiMenuItem>
            {Object.keys(groupedMenuItems).map((group) => (
              <MuiMenuItem key={group} value={group}>
                {group}
              </MuiMenuItem>
            ))}
          </Select>
        </FormControl>
        
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="sort-order-select-label">Sort Order</InputLabel>
          <Select
            labelId="sort-order-select-label"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            label="Sort Order"
            aria-label="Select sort order"
          >
            <MuiMenuItem value="asc">A-Z</MuiMenuItem>
            <MuiMenuItem value="desc">Z-A</MuiMenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ height: 'calc(100vh - 300px)', width: '100%' }} role="region" aria-label="Menu items list">
        <AutoSizer>
          {({ height, width }: { height: number; width: number }) => (
            <List
              height={height}
              itemCount={sortedMenuItems.length}
              itemSize={200}
              width={width}
              itemData={sortedMenuItems}
            >
              {Row}
            </List>
          )}
        </AutoSizer>
      </Box>

      {selectedItem && (
        <Suspense fallback={<LoadingSpinner />}>
          <LazyMenuItemModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
            onAddToCart={handleAddToCart}
          />
        </Suspense>
      )}
    </Box>
  );
};

export default GuestMenuPage;
