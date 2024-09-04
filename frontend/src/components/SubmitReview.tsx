import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { createReview } from '../api/reviewApi';
import { fetchReviewsForMenuItem } from '../redux/slices/reviewSlice';
import { TextField, Button, Rating, Box, Typography } from '@mui/material';

interface SubmitReviewProps {
  menuItemId: number;
}

const SubmitReview: React.FC<SubmitReviewProps> = ({ menuItemId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [firstName, setFirstName] = useState('');
  const [lastInitial, setLastInitial] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === null) return;

    try {
      await createReview({
        menuItemId,
        firstName,
        lastInitial,
        rating,
        comment,
      });
      dispatch(fetchReviewsForMenuItem(menuItemId));
      // Reset form
      setFirstName('');
      setLastInitial('');
      setRating(null);
      setComment('');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6">Submit a Review</Typography>
      <TextField
        label="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Last Initial"
        value={lastInitial}
        onChange={(e) => setLastInitial(e.target.value)}
        required
        fullWidth
        margin="normal"
      />
      <Box my={2}>
        <Typography component="legend">Rating</Typography>
        <Rating
          name="rating"
          value={rating}
          onChange={(_, newValue) => setRating(newValue)}
        />
      </Box>
      <TextField
        label="Comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        multiline
        rows={4}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Submit Review
      </Button>
    </Box>
  );
};

export default SubmitReview;
