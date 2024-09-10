import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  fetchLoyaltyRewards,
  updateLoyaltyReward,
  selectLoyaltyRewards,
} from '../redux/slices/loyaltySlice';
import { AppDispatch } from '../types';
import { LoyaltyReward } from '../types/loyaltyTypes';
import { createLoyaltyReward } from '../api/loyaltyApi';
import {
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useAuth } from '../hooks/useAuth';
import { selectUserRole } from '../redux/slices/authSlice';
import { UserRole } from '../types/userTypes';

const ITEMS_PER_PAGE = 10;

const AdminLoyaltyRewards: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { clientId, locationId } = useParams<{ clientId: string; locationId?: string }>();
  const loyaltyRewards = useSelector(selectLoyaltyRewards);
  const userRole = useSelector(selectUserRole);
  const { isAuthenticated, isGlobalAdmin, user } = useAuth();
  const [newReward, setNewReward] = useState<Partial<LoyaltyReward>>({
    name: '',
    description: '',
    rewardType: '',
    pointsRequired: 0,
    isActive: true,
    availableDays: [],
    startDate: new Date(),
    endDate: new Date(),
    clientId: clientId || '',
    locationId: locationId,
  });
  const [confirmDialog, setConfirmDialog] = useState({ open: false, rewardId: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filterActive, setFilterActive] = useState<boolean | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (clientId && isAuthenticated) {
      dispatch(fetchLoyaltyRewards({ clientId, locationId }));
    }
  }, [dispatch, clientId, locationId, isAuthenticated]);

  const handleCreateReward = async () => {
    if (clientId) {
      try {
        await createLoyaltyReward(clientId, newReward as LoyaltyReward);
        dispatch(fetchLoyaltyRewards({ clientId, locationId }));
        setNewReward({
          name: '',
          description: '',
          rewardType: '',
          pointsRequired: 0,
          isActive: true,
          availableDays: [],
          startDate: new Date(),
          endDate: new Date(),
          clientId: clientId,
          locationId: locationId,
        });
        setSnackbar({ open: true, message: 'Reward created successfully', severity: 'success' });
      } catch (error) {
        setSnackbar({ open: true, message: 'Failed to create reward', severity: 'error' });
      }
    }
  };

  const handleUpdateReward = useCallback((reward: LoyaltyReward) => {
    setConfirmDialog({ open: true, rewardId: reward.id });
  }, []);

  const confirmUpdate = async () => {
    if (clientId && confirmDialog.rewardId) {
      try {
        await dispatch(updateLoyaltyReward({
          id: confirmDialog.rewardId,
          pointsRequired: 200,
          isActive: true,
          name: '',
          description: '',
          rewardType: '',
          availableDays: [],
          clientId: clientId,
          locationId: locationId,
        }));
        setSnackbar({ open: true, message: 'Reward updated successfully', severity: 'success' });
      } catch (error) {
        setSnackbar({ open: true, message: 'Failed to update reward', severity: 'error' });
      }
    }
    setConfirmDialog({ open: false, rewardId: '' });
  };

  const sortedAndFilteredRewards = loyaltyRewards
    .filter(reward => filterActive === null || reward.isActive === filterActive)
    .sort((a, b) => {
      const aValue = a[sortField as keyof LoyaltyReward];
      const bValue = b[sortField as keyof LoyaltyReward];
      
      // Handle potential undefined values
      if (aValue === undefined && bValue === undefined) return 0;
      if (aValue === undefined) return 1;
      if (bValue === undefined) return -1;

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  const paginatedRewards = sortedAndFilteredRewards.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(sortedAndFilteredRewards.length / ITEMS_PER_PAGE);

  if (!isAuthenticated || (userRole !== UserRole.GLOBAL_ADMIN && userRole !== UserRole.CLIENT_ADMIN)) {
    return <Typography>You don't have permission to access this page.</Typography>;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Loyalty Rewards Management for Client {clientId} {locationId ? `and Location ${locationId}` : ''}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Create New Reward
            </Typography>
            <form onSubmit={(e) => { e.preventDefault(); handleCreateReward(); }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Reward Name"
                    value={newReward.name}
                    onChange={(e) => setNewReward({ ...newReward, name: e.target.value })}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    value={newReward.description}
                    onChange={(e) => setNewReward({ ...newReward, description: e.target.value })}
                    multiline
                    rows={3}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Reward Type</InputLabel>
                    <Select
                      value={newReward.rewardType}
                      onChange={(e) => setNewReward({ ...newReward, rewardType: e.target.value })}
                      required
                    >
                      <MenuItem value="discount">Discount</MenuItem>
                      <MenuItem value="freeItem">Free Item</MenuItem>
                      <MenuItem value="giftCard">Gift Card</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Points Required"
                    value={newReward.pointsRequired}
                    onChange={(e) => setNewReward({ ...newReward, pointsRequired: Number(e.target.value) })}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={newReward.isActive}
                          onChange={(e) => setNewReward({ ...newReward, isActive: e.target.checked })}
                        />
                      }
                      label="Active"
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Available Days</Typography>
                  <FormGroup row>
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                      <FormControlLabel
                        key={day}
                        control={
                          <Checkbox
                            checked={newReward.availableDays?.includes(day)}
                            onChange={(e) => {
                              const updatedDays = e.target.checked
                                ? [...(newReward.availableDays || []), day]
                                : newReward.availableDays?.filter((d) => d !== day);
                              setNewReward({ ...newReward, availableDays: updatedDays });
                            }}
                          />
                        }
                        label={day}
                      />
                    ))}
                  </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="Start Date"
                    value={newReward.startDate}
                    onChange={(date) => setNewReward({ ...newReward, startDate: date || undefined })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="End Date"
                    value={newReward.endDate}
                    onChange={(date) => setNewReward({ ...newReward, endDate: date || undefined })}
                  />
                </Grid>
              </Grid>
              <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                Create Reward
              </Button>
            </form>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Existing Rewards
            </Typography>
            <Box sx={{ mb: 2 }}>
              <FormControl sx={{ mr: 2, minWidth: 120 }}>
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortField}
                  onChange={(e) => setSortField(e.target.value)}
                >
                  <MenuItem value="name">Name</MenuItem>
                  <MenuItem value="pointsRequired">Points</MenuItem>
                  <MenuItem value="startDate">Start Date</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ mr: 2, minWidth: 120 }}>
                <InputLabel>Order</InputLabel>
                <Select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                >
                  <MenuItem value="asc">Ascending</MenuItem>
                  <MenuItem value="desc">Descending</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Filter</InputLabel>
                <Select
                  value={filterActive === null ? 'all' : filterActive ? 'active' : 'inactive'}
                  onChange={(e) => setFilterActive(e.target.value === 'all' ? null : e.target.value === 'active')}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ maxHeight: '500px', overflowY: 'auto' }}>
              {paginatedRewards.map((reward) => (
                <Box key={reward.id} sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
                  <Typography variant="h6">{reward.name}</Typography>
                  <Typography>Points: {reward.pointsRequired}</Typography>
                  <Typography>Type: {reward.rewardType}</Typography>
                  <Typography>Active: {reward.isActive ? 'Yes' : 'No'}</Typography>
                  <Button
                    onClick={() => handleUpdateReward(reward)}
                    variant="outlined"
                    color="primary"
                    sx={{ mt: 1 }}
                  >
                    Update Points to 200
                  </Button>
                </Box>
              ))}
            </Box>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
              <Button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
              >
                Previous
              </Button>
              <Typography sx={{ mx: 2 }}>
                Page {currentPage} of {totalPages}
              </Typography>
              <Button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
              >
                Next
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Dialog
          open={confirmDialog.open}
          onClose={() => setConfirmDialog({ open: false, rewardId: '' })}
        >
          <DialogTitle>Confirm Update</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to update the points for this reward to 200?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmDialog({ open: false, rewardId: '' })}>Cancel</Button>
            <Button onClick={confirmUpdate} color="primary">Confirm</Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          message={snackbar.message}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default AdminLoyaltyRewards;
