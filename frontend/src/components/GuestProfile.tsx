import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchGuestProfile } from '../redux/slices/guestSlice';
import { GuestProfile as GuestProfileType } from '../types/guestTypes';
import { Typography, Box, CircularProgress } from '@mui/material';

const GuestProfile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const guestProfile = useSelector((state: RootState) => state.guest.profile as GuestProfileType);
  const loading = useSelector((state: RootState) => state.guest.loading);
  const error = useSelector((state: RootState) => state.guest.error);

  useEffect(() => {
    dispatch(fetchGuestProfile());
  }, [dispatch]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!guestProfile) {
    return <Typography>No guest profile found.</Typography>;
  }

  return (
    <Box>
      <Typography variant="h2">Guest Profile</Typography>
      <Typography variant="body1">
        Name: {guestProfile.firstName} {guestProfile.lastName}
      </Typography>
      <Typography variant="body1">
        Email: {guestProfile.email}
      </Typography>
      <Typography variant="body1">
        Phone: {guestProfile.phoneNumber}
      </Typography>
      <Typography variant="body1">
        Loyalty Points: {guestProfile.loyaltyPoints}
      </Typography>
      {guestProfile.loyaltyTier && (
        <Typography variant="body1">
          Loyalty Tier: {guestProfile.loyaltyTier}
        </Typography>
      )}
    </Box>
  );
};

export default GuestProfile;
