import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import {
  fetchPendingReviews,
  approveReview,
  deleteReview,
} from '../../redux/slices/reviewSlice';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
  Rating,
} from '@mui/material';

const ReviewManager: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const pendingReviews = useSelector(
    (state: RootState) => state.reviews.pendingReviews
  );

  useEffect(() => {
    dispatch(fetchPendingReviews());
  }, [dispatch]);

  const handleApprove = (reviewId: number) => {
    dispatch(approveReview(reviewId));
  };

  const handleDelete = (reviewId: number) => {
    dispatch(deleteReview(reviewId));
  };

  return (
    <Box>
      <Typography variant="h5">Pending Reviews</Typography>
      <List>
        {pendingReviews.map((review) => (
          <ListItem key={review.id}>
            <ListItemText
              primary={`${review.firstName} ${review.lastInitial}. - ${review.MenuItem.name}`}
              secondary={
                <>
                  <Rating value={review.rating} readOnly size="small" />
                  <Typography variant="body2">{review.comment}</Typography>
                </>
              }
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
