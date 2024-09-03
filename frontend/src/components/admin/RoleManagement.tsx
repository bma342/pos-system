import React, { useState, useEffect } from 'react';
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
  Checkbox,
  FormControlLabel,
} from '@mui/material';

interface Role {
  id: string;
  name: string;
  permissions: string[];
}

const RoleManagement: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    // Fetch roles from API
    // setRoles(fetchedRoles);
  }, []);

  const handleEditRole = (role: Role) => {
    setSelectedRole(role);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedRole(null);
    setIsDialogOpen(false);
  };

  const handleUpdateRole = () => {
    // Implement role update logic here
    handleCloseDialog();
  };

  const handleAddRole = () => {
    setSelectedRole({ id: '', name: '', permissions: [] });
    setIsDialogOpen(true);
  };

  return (
    <Box>
      <Typography variant="h5">Role Management</Typography>
      <List>
        {roles.map((role) => (
          <ListItem key={role.id}>
            <ListItemText
              primary={role.name}
              secondary={`Permissions: ${role.permissions.join(', ')}`}
            />
            <Button onClick={() => handleEditRole(role)}>Edit</Button>
          </ListItem>
        ))}
      </List>
      <Button variant="contained" color="primary" onClick={handleAddRole}>
        Add New Role
      </Button>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          {selectedRole?.id ? 'Edit Role' : 'Add New Role'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Role Name"
            type="text"
            fullWidth
            value={selectedRole?.name || ''}
            onChange={(e) =>
              setSelectedRole({ ...selectedRole!, name: e.target.value })
            }
          />
          <Typography variant="subtitle1">Permissions:</Typography>
          {/* Add checkboxes for permissions */}
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedRole?.permissions.includes('read') || false}
                onChange={(e) => {
                  const newPermissions = e.target.checked
                    ? [...selectedRole!.permissions, 'read']
                    : selectedRole!.permissions.filter((p) => p !== 'read');
                  setSelectedRole({
                    ...selectedRole!,
                    permissions: newPermissions,
                  });
                }}
              />
            }
            label="Read"
          />
          {/* Add more permission checkboxes as needed */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleUpdateRole} color="primary">
            {selectedRole?.id ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RoleManagement;
