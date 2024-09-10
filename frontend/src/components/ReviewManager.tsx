import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import {
  fetchPendingReviews,
  approveReview,
  deleteReview,
} from '../redux/slices/reviewSlice';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  CircularProgress,
  Rating,
} from '@mui/material';
import { Check as CheckIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Review } from '../types/reviewTypes';
import { selectCurrentUser } from '../redux/slices/userSlice';

const ReviewManager: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const pendingReviews = useSelector((state: RootState) => state.review.pendingReviews);
  const status = useSelector((state: RootState) => state.review.status);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    if (currentUser?.clientId) {
      dispatch(fetchPendingReviews(currentUser.clientId));
    }
  }, [dispatch, currentUser]);

  const handleApprove = (reviewId: string) => {
    dispatch(approveReview(reviewId));
  };

  const handleDelete = (reviewId: string) => {
    dispatch(deleteReview(reviewId));
  };

  if (status === 'loading') {
    return <CircularProgress />;
  }

  return (
    <div>
      <Typography variant="h4">Pending Reviews</Typography>
      <List>
        {pendingReviews.map((review: Review) => (
          <ListItem key={review.id}>
            <ListItemText
              primary={
                <>
                  <Typography variant="body1">{review.content}</Typography>
                  <Rating value={review.rating} readOnly precision={0.5} />
                </>
              }
              secondary={`By: ${review.firstName} ${review.lastInitial}`}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="approve" onClick={() => handleApprove(review.id)}>
                <CheckIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(review.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ReviewManager;
