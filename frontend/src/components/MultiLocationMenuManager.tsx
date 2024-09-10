import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchMenu, updateMenu } from '../redux/slices/menuSlice';
import { selectSelectedLocation, selectCurrentUser } from '../redux/slices/userSlice';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Typography, Box } from '@mui/material';
import LocationSelector from './LocationSelector';
import { UserRole } from '../types/userTypes';
import { MenuItem, Menu } from '../types/menuTypes'; // Make sure to import or define these types

const MenuDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedLocation = useSelector(selectSelectedLocation);
  const user = useSelector(selectCurrentUser);
  const menu = useSelector((state: RootState) => state.menu.currentMenu) as Menu | null;
  const [editingItem, setEditingItem] = useState<string | null>(null);

  useEffect(() => {
    if (selectedLocation && user?.clientId) {
      dispatch(fetchMenu({ clientId: user.clientId, locationId: selectedLocation }));
    }
  }, [dispatch, selectedLocation, user]);

  const handleUpdateMenuItem = (itemId: string, updatedData: Partial<MenuItem>) => {
    if (selectedLocation && user?.clientId && menu) {
      const updatedMenuGroups = menu.menuGroups.map(group => ({
        ...group,
        items: group.items.map(item => 
          item.id === itemId ? { ...item, ...updatedData } : item
        )
      }));

      dispatch(updateMenu({ 
        clientId: user.clientId,
        locationId: selectedLocation,
        menuData: { 
          ...menu,
          menuGroups: updatedMenuGroups
        }
      }));
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Menu Dashboard</Typography>
      {user?.role === UserRole.GLOBAL_ADMIN && <LocationSelector />}
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Group</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menu?.menuGroups?.flatMap(group => 
              group.items.map((item: MenuItem) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>${item.price.toFixed(2)}</TableCell>
                  <TableCell>{group.name}</TableCell>
                  <TableCell>
                    <Button onClick={() => setEditingItem(item.id)}>Edit</Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MenuDashboard;
