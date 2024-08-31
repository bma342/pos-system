import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { fetchUsers } from '../../redux/slices/userSlice';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';

const UserManager: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <Box>
      <Typography variant="h5">User Manager</Typography>
      <List>
        {users.map((user) => (
          <ListItem key={user.id}>
            <ListItemText primary={user.name} secondary={user.email} />
            <Button>Edit</Button>
          </ListItem>
        ))}
      </List>
      <Button variant="contained" color="primary">
        Add New User
      </Button>
    </Box>
  );
};

export default UserManager;
