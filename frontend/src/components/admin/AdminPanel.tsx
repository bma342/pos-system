import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Link } from 'react-router-dom';

const AdminPanel: React.FC = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4">Global Admin Dashboard</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper>
          <List>
            <ListItem button component={Link} to="/admin/clients">
              <ListItemText primary="Client Management" />
            </ListItem>
            <ListItem button component={Link} to="/admin/users">
              <ListItemText primary="User Management" />
            </ListItem>
            <ListItem button component={Link} to="/admin/roles">
              <ListItemText primary="Role Management" />
            </ListItem>
            <ListItem button component={Link} to="/admin/permissions">
              <ListItemText primary="Permission Management" />
            </ListItem>
            <ListItem button component={Link} to="/admin/pos-integrations">
              <ListItemText primary="POS Integrations" />
            </ListItem>
          </List>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper>
          <Typography variant="h6" padding={2}>
            Quick Stats
          </Typography>
          {/* Add quick statistics here */}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AdminPanel;
