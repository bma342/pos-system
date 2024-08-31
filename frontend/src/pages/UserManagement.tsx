import React, { useEffect, useState, useMemo } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import { User, UserRole } from '../types/userTypes';
import UserService from '../services/UserService';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [snackbar, setSnackbar] = useState<{
    message: string;
    severity: 'success' | 'error';
  } | null>(null);

  const userService = useMemo(() => new UserService(), []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await userService.getUsers();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load users. Please try again.');
        setLoading(false);
      }
    };

    fetchUsers();
  }, [userService]);

  const handleAddUser = () => {
    setSelectedUser({
      id: 0,
      username: '',
      email: '',
      role: UserRole.STAFF,
      tenantId: '',
    });
    setIsModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleSaveUser = async () => {
    if (!selectedUser) return;

    try {
      let updatedUser;
      if (selectedUser.id === 0) {
        updatedUser = await userService.createUser(selectedUser);
        setUsers([...users, updatedUser]);
      } else {
        updatedUser = await userService.updateUser(
          selectedUser.id,
          selectedUser
        );
        setUsers(
          users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
        );
      }
      setIsModalOpen(false);
      setSnackbar({ message: 'User saved successfully', severity: 'success' });
    } catch (err) {
      setSnackbar({
        message: 'Failed to save user. Please try again.',
        severity: 'error',
      });
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userService.deleteUser(userId);
        setUsers(users.filter((user) => user.id !== userId));
        setSnackbar({
          message: 'User deleted successfully',
          severity: 'success',
        });
      } catch (err) {
        setSnackbar({
          message: 'Failed to delete user. Please try again.',
          severity: 'error',
        });
      }
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddUser}
        style={{ marginBottom: '20px' }}
      >
        Add New User
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditUser(user)}>Edit</Button>
                  <Button
                    onClick={() => handleDeleteUser(user.id)}
                    color="secondary"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Paper
          style={{
            padding: '20px',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '400px',
            width: '100%',
          }}
        >
          {selectedUser && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveUser();
              }}
            >
              <Typography variant="h6" gutterBottom>
                {selectedUser.id === 0 ? 'Add New User' : 'Edit User'}
              </Typography>
              <TextField
                label="Username"
                value={selectedUser.username}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, username: e.target.value })
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Email"
                value={selectedUser.email}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, email: e.target.value })
                }
                fullWidth
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Role</InputLabel>
                <Select
                  value={selectedUser.role}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      role: e.target.value as UserRole,
                    })
                  }
                >
                  {Object.values(UserRole).map((role) => (
                    <MenuItem key={role} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: '20px' }}
              >
                Save User
              </Button>
            </form>
          )}
        </Paper>
      </Modal>
      <Snackbar
        open={!!snackbar}
        autoHideDuration={6000}
        onClose={() => setSnackbar(null)}
      >
        <Alert
          onClose={() => setSnackbar(null)}
          severity={snackbar?.severity}
          sx={{ width: '100%' }}
        >
          {snackbar?.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UserManagement;
