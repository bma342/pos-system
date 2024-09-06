import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { updateUserProfile, selectCurrentUser } from '../redux/slices/userSlice';
import { User } from '../types/userTypes';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Snackbar,
} from '@mui/material';
import { Alert } from '@mui/material';

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userProfile = useSelector(selectCurrentUser);
  const [formData, setFormData] = useState<Partial<User>>({});
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (userProfile) {
      setFormData({
        firstName: userProfile.firstName || '',
        lastName: userProfile.lastName || '',
        email: userProfile.email || '',
        restaurantName: userProfile.restaurantName || '',
        cuisineType: userProfile.cuisineType || '',
        phoneNumber: userProfile.phoneNumber || '',
        address: userProfile.address || '',
        timeZone: userProfile.timeZone || '',
      });
    }
  }, [userProfile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdateProfile = async () => {
    try {
      await dispatch(updateUserProfile(formData)).unwrap();
      setError(null);
      setSuccess('Profile updated successfully');
    } catch (err) {
      setError('Failed to update profile. Please try again.');
      setSuccess(null);
    }
  };

  if (!userProfile) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', pt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Restaurant Profile
        </Typography>
        <Grid container spacing={3}>
          {Object.entries(formData).map(([key, value]) => (
            <Grid item xs={12} sm={6} key={key}>
              <TextField
                fullWidth
                label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                name={key}
                value={value}
                onChange={handleInputChange}
              />
            </Grid>
          ))}
        </Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdateProfile}
          sx={{ mt: 3 }}
        >
          Update Profile
        </Button>
      </Paper>
      <Snackbar open={!!error || !!success} autoHideDuration={6000} onClose={() => { setError(null); setSuccess(null); }}>
        <Alert onClose={() => { setError(null); setSuccess(null); }} severity={error ? "error" : "success"} sx={{ width: '100%' }}>
          {error || success}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProfilePage;