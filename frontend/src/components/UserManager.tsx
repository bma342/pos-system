import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchUsers, updateUser, createUser, deleteUser } from '../redux/slices/userSlice';
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
  FormControl,
  InputLabel,
  useMediaQuery,
  useTheme,
  Snackbar,
} from '@mui/material';
import { User, UserRole } from '../types/userTypes';
import { useAuth } from '../hooks/useAuth';

const UserManager: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.user.users);
  const { user: currentUser } = useAuth();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (currentUser?.clientId) {
      dispatch(fetchUsers({ clientId: currentUser.clientId }));
    }
  }, [dispatch, currentUser]);

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedUser(null);
    setIsDialogOpen(false);
  };

  const handleUpdateUser = async () => {
    if (selectedUser) {
      try {
        await dispatch(updateUser(selectedUser)).unwrap();
        setSnackbar({ open: true, message: 'User updated successfully', severity: 'success' });
        handleCloseDialog();
      } catch (error) {
        setSnackbar({ open: true, message: 'Failed to update user', severity: 'error' });
      }
    }
  };

  const handleAddUser = () => {
    setSelectedUser({ id: '', email: '', role: UserRole.GUEST, clientId: currentUser?.clientId || '', firstName: '', lastName: '' });
    setIsDialogOpen(true);
  };

  const handleCreateUser = async () => {
    if (selectedUser && currentUser?.clientId) {
      try {
        await dispatch(createUser({ ...selectedUser, clientId: currentUser.clientId })).unwrap();
        setSnackbar({ open: true, message: 'User created successfully', severity: 'success' });
        handleCloseDialog();
      } catch (error) {
        setSnackbar({ open: true, message: 'Failed to create user', severity: 'error' });
      }
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await dispatch(deleteUser(userId)).unwrap();
        setSnackbar({ open: true, message: 'User deleted successfully', severity: 'success' });
      } catch (error) {
        setSnackbar({ open: true, message: 'Failed to delete user', severity: 'error' });
      }
    }
  };

  return (
    <Box sx={{ p: 2, maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        User Manager
      </Typography>
      <List aria-label="User list">
        {users.map((user) => (
          <ListItem key={user.id} sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <ListItemText
              primary={`${user.firstName} ${user.lastName}`}
              secondary={`${user.email} - ${user.role}`}
              sx={{ flexGrow: 1, minWidth: '200px' }}
            />
            <Box>
              <Button onClick={() => handleEditUser(user)} aria-label={`Edit ${user.firstName} ${user.lastName}`}>
                Edit
              </Button>
              <Button onClick={() => handleDeleteUser(user.id)} aria-label={`Delete ${user.firstName} ${user.lastName}`}>
                Delete
              </Button>
            </Box>
          </ListItem>
        ))}
      </List>
      <Button variant="contained" color="primary" onClick={handleAddUser} sx={{ mt: 2 }}>
        Add New User
      </Button>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog} fullScreen={isMobile} aria-labelledby="user-dialog-title">
        <DialogTitle id="user-dialog-title">
          {selectedUser?.id ? 'Edit User' : 'Add New User'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={selectedUser?.email || ''}
            onChange={(e) => setSelectedUser(prev => prev ? { ...prev, email: e.target.value } : null)}
            required
          />
          <TextField
            margin="dense"
            label="First Name"
            type="text"
            fullWidth
            value={selectedUser?.firstName || ''}
            onChange={(e) => setSelectedUser(prev => prev ? { ...prev, firstName: e.target.value } : null)}
            required
          />
          <TextField
            margin="dense"
            label="Last Name"
            type="text"
            fullWidth
            value={selectedUser?.lastName || ''}
            onChange={(e) => setSelectedUser(prev => prev ? { ...prev, lastName: e.target.value } : null)}
            required
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="user-role-label">Role</InputLabel>
            <Select
              labelId="user-role-label"
              value={selectedUser?.role || ''}
              onChange={(e) => setSelectedUser(prev => prev ? { ...prev, role: e.target.value as UserRole } : null)}
              required
            >
              {Object.values(UserRole).map((role) => (
                <MenuItem key={role} value={role}>{role}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={selectedUser?.id ? handleUpdateUser : handleCreateUser} color="primary">
            {selectedUser?.id ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        message={snackbar.message}
      />
    </Box>
  );
};

export default UserManager;
