import React from 'react';
import { Typography, Box, Rating } from '@mui/material';

interface Review {
  id: number;
  firstName: string;
  lastInitial: string;
  rating: number;
  comment?: string;
  orderAgainPercentage?: number;
}

interface ItemReviewsProps {
  reviews: Review[];
}

const ItemReviews: React.FC<ItemReviewsProps> = ({ reviews }) => {
  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const orderAgainPercentage =
    reviews.reduce(
      (sum, review) => sum + (review.orderAgainPercentage || 0),
      0
    ) / reviews.length;

  return (
    <Box>
      <Typography variant="h6">Customer Reviews</Typography>
      <Box display="flex" alignItems="center">
        <Rating value={averageRating} readOnly precision={0.1} />
        <Typography variant="body2" ml={1}>
          ({averageRating.toFixed(1)})
        </Typography>
      </Box>
      {orderAgainPercentage > 0 && (
        <Typography variant="body2">
          {orderAgainPercentage.toFixed(0)}% of customers would order this again
        </Typography>
      )}
      {reviews.map((review) => (
        <Box key={review.id} mt={2}>
          <Typography variant="subtitle2">
            {review.firstName} {review.lastInitial}.
          </Typography>
          <Rating value={review.rating} readOnly size="small" />
          {review.comment && (
            <Typography variant="body2">{review.comment}</Typography>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default ItemReviews;
