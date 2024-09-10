import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import {
  fetchPendingReviews,
  approveReview,
  deleteReview,
} from '../redux/slices/reviewSlice';
import { useAuth } from '../hooks/useAuth';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  CircularProgress,
} from '@mui/material';
import { Review } from '../types/reviewTypes';

const ReviewManager: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();
  const pendingReviews = useSelector((state: RootState) => state.review.pendingReviews);
  const loading = useSelector((state: RootState) => state.review.loading);
  const error = useSelector((state: RootState) => state.review.error);

  useEffect(() => {
    if (user?.clientId) {
      dispatch(fetchPendingReviews(user.clientId));
    }
  }, [dispatch, user]);

  const handleApprove = (reviewId: string) => {
    dispatch(approveReview(reviewId));
  };

  const handleDelete = (reviewId: string) => {
    dispatch(deleteReview(reviewId));
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Pending Reviews
      </Typography>
      <List>
        {pendingReviews.map((review: Review) => (
          <ListItem key={review.id}>
            <ListItemText
              primary={review.content}
              secondary={`By: ${review.userName} | Rating: ${review.rating}`}
            />
            <Button onClick={() => handleApprove(review.id)}>Approve</Button>
            <Button onClick={() => handleDelete(review.id)}>Delete</Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ReviewManager;
