import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchRoles, createRole, updateRole, deleteRole } from '../redux/slices/roleSlice';
import { Role } from '../types/roleTypes';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

const RoleManagement: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const roles = useSelector((state: RootState) => state.role.roles);
  const [open, setOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState<Role | null>(null);
  const [roleName, setRoleName] = useState('');

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  const handleOpen = (role?: Role) => {
    if (role) {
      setCurrentRole(role);
      setRoleName(role.name);
    } else {
      setCurrentRole(null);
      setRoleName('');
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentRole(null);
    setRoleName('');
  };

  const handleSubmit = () => {
    if (currentRole) {
      dispatch(updateRole({ ...currentRole, name: roleName }));
    } else {
      dispatch(createRole({ name: roleName }));
    }
    handleClose();
  };

  const handleDelete = (roleId: string) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      dispatch(deleteRole(roleId));
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Role Management
      </Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Add New Role
      </Button>
      <List>
        {roles.map((role: Role) => (
          <ListItem key={role.id}>
            <ListItemText primary={role.name} />
            <Button onClick={() => handleOpen(role)}>Edit</Button>
            <Button onClick={() => handleDelete(role.id)}>Delete</Button>
          </ListItem>
        ))}
      </List>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentRole ? 'Edit Role' : 'Add New Role'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Role Name"
            type="text"
            fullWidth
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>{currentRole ? 'Update' : 'Create'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RoleManagement;
