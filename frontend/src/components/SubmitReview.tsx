import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { createReview } from '../redux/slices/reviewSlice';
import { TextField, Button, Rating, Box, Typography, FormHelperText } from '@mui/material';

interface SubmitReviewProps {
  menuItemId: string;
}

const SubmitReview: React.FC<SubmitReviewProps> = ({ menuItemId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [firstName, setFirstName] = useState('');
  const [lastInitial, setLastInitial] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (firstName && lastInitial && rating && content) {
      dispatch(createReview({
        menuItemId,
        firstName,
        lastInitial,
        rating,
        content
      }));
      // Reset form
      setFirstName('');
      setLastInitial('');
      setRating(null);
      setContent('');
      setError('');
    } else {
      setError('Please fill in all fields and provide a rating.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
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
      <Typography component="legend">Rating</Typography>
      <Rating
        name="rating"
        value={rating}
        onChange={(_, newValue) => setRating(newValue)}
        precision={0.5}
      />
      {!rating && <FormHelperText error>Please provide a rating</FormHelperText>}
      <TextField
        label="Review"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        fullWidth
        multiline
        rows={4}
        margin="normal"
      />
      {error && <FormHelperText error>{error}</FormHelperText>}
      <Button type="submit" variant="contained" color="primary" disabled={!rating}>
        Submit Review
      </Button>
    </Box>
  );
};

export default SubmitReview;
