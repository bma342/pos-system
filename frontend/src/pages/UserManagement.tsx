import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, updateUserProfile } from '../redux/slices/userSlice';
import { RootState, AppDispatch } from '../redux/store';
import { User, UserRole } from '../types/userTypes';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Snackbar,
  CircularProgress,
} from '@mui/material';
import { Alert } from '@mui/material';

const UserManagement: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.user.users);
  const loading = useSelector((state: RootState) => state.user.loading);
  const error = useSelector((state: RootState) => state.user.error);
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  const [snackbar, setSnackbar] = useState<{
    message: string;
    severity: 'success' | 'error';
  } | null>(null);

  const loadUsers = useCallback(async () => {
    try {
      if (currentUser) {
        let params: { clientId?: string; locationId?: string } = {};
        if (currentUser.role === UserRole.CLIENT_ADMIN) {
          params = { clientId: currentUser.clientId };
        } else if (currentUser.role === UserRole.LOCATION_ADMIN) {
          params = { locationId: currentUser.locationId };
        }
        dispatch(fetchUsers(params));
      }
    } catch (error) {
      setSnackbar({
        message: 'Failed to load users. Please try again.',
        severity: 'error',
      });
    }
  }, [dispatch, currentUser]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleEditUser = (user: User) => {
    // Implement edit user functionality
  };

  const handleDeleteUser = (userId: string) => {
    // Implement delete user functionality
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', pt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        User Management
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditUser(user)}>Edit</Button>
                  <Button onClick={() => handleDeleteUser(user.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar
        open={!!snackbar}
        autoHideDuration={6000}
        onClose={() => setSnackbar(null)}
      >
        <Alert onClose={() => setSnackbar(null)} severity={snackbar?.severity} sx={{ width: '100%' }}>
          {snackbar?.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserManagement;