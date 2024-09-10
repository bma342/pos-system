import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchMenu } from '../redux/slices/menuSlice';
import { selectSelectedLocation, selectCurrentUser } from '../redux/slices/userSlice';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Box } from '@mui/material';
import { MenuItem, Menu } from '../types/menuTypes';

const MenuManager: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedLocation = useSelector(selectSelectedLocation);
  const user = useSelector(selectCurrentUser);
  const menu = useSelector((state: RootState) => state.menu.currentMenu) as Menu | null;

  useEffect(() => {
    if (selectedLocation && user?.clientId) {
      dispatch(fetchMenu({ clientId: user.clientId, locationId: selectedLocation }));
    }
  }, [dispatch, selectedLocation, user]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Menu Manager</Typography>
      
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
                    <Button>Edit</Button>
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

export default MenuManager;
