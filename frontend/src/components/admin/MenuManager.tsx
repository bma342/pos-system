import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { fetchMenuItems } from '../../redux/slices/menuSlice';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';
import MenuBuilder from './MenuBuilder';

const MenuManager: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const menuItems = useSelector((state: RootState) => state.menu.items);

  useEffect(() => {
    dispatch(fetchMenuItems());
  }, [dispatch]);

  return (
    <Box>
      <Typography variant="h5">Menu Manager</Typography>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.id}>
            <ListItemText primary={item.name} secondary={`$${item.price}`} />
            <Button>Edit</Button>
          </ListItem>
        ))}
      </List>
      <MenuBuilder />
    </Box>
  );
};

export default MenuManager;
