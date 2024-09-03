import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchMenuItemsAsync } from '../redux/slices/menuItemsSlice';
import MenuItemCard from '../components/MenuItemCard';
import MenuItemModal from '../components/MenuItemModal';
import LoadingSpinner from '../components/LoadingSpinner';
import { MenuItem } from '../types';
import useClientBranding from '../components/ClientBrandingProvider';
import { Typography, Box, Alert } from '@mui/material';

const GuestMenuPage: React.FC = () => {
  const { locationId } = useParams<{ locationId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const menuItems = useSelector((state: RootState) => state.menu.items);
  const status = useSelector((state: RootState) => state.menu.status);
  const error = useSelector((state: RootState) => state.menu.error);
  const clientBranding = useClientBranding();

  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    if (locationId) {
      dispatch(fetchMenuItemsAsync(locationId));
    }
  }, [dispatch, locationId]);

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (status === 'failed') {
    return <Alert severity="error">Error loading menu: {error}</Alert>;
  }

  return (
    <Box
      className="guest-menu-page"
      sx={{ backgroundColor: clientBranding.backgroundColor }}
    >
      <Typography variant="h1" sx={{ color: clientBranding.primaryColor }}>
        {clientBranding.restaurantName} Menu
      </Typography>
      <div className="menu-items-grid">
        {menuItems.map((item) => (
          <MenuItemCard
            key={item.id}
            item={item}
            onSelect={() => setSelectedItem(item)}
          />
        ))}
      </div>
      {selectedItem && (
        <MenuItemModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </Box>
  );
};

export default GuestMenuPage;
