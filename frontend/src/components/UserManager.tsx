import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchUsers, updateUser } from 'frontend/src/api/userApi';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
} from '@mui/material';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  clientId?: string;
}

const UserManager: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users.users);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedUser(null);
    setIsDialogOpen(false);
  };

  const handleUpdateUser = () => {
    // Implement user update logic here
    handleCloseDialog();
  };

  const handleAddUser = () => {
    setSelectedUser({ id: '', name: '', email: '', role: '' });
    setIsDialogOpen(true);
  };

  return (
    <Box>
      <Typography variant="h5">User Manager</Typography>
      <List>
        {users.map((user) => (
          <ListItem key={user.id}>
            <ListItemText primary={user.name} secondary={user.email} />
            <Button onClick={() => handleEditUser(user)}>Edit</Button>
          </ListItem>
        ))}
      </List>
      <Button variant="contained" color="primary" onClick={handleAddUser}>
        Add New User
      </Button>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          {selectedUser?.id ? 'Edit User' : 'Add New User'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={selectedUser?.name || ''}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser!, name: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={selectedUser?.email || ''}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser!, email: e.target.value })
            }
          />
          <Select
            margin="dense"
            fullWidth
            value={selectedUser?.role || ''}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser!, role: e.target.value })
            }
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="user">User</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleUpdateUser} color="primary">
            {selectedUser?.id ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManager;
