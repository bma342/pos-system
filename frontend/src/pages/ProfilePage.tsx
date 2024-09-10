import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { updateUserProfile } from '../redux/slices/userSlice';
import { TextField, Button, Grid, Typography } from '@mui/material';

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userProfile = useSelector((state: RootState) => state.user.currentUser);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    restaurantName: '',
    cuisineType: '',
    phoneNumber: '',
    address: '',
    timeZone: '',
  });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateUserProfile(formData));
  };

  if (!userProfile) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">Profile</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </Grid>
        {/* Add other fields here */}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Update Profile
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ProfilePage;