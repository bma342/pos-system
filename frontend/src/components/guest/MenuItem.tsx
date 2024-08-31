import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { fetchReviewsForMenuItem } from '../../redux/slices/reviewSlice';
import { Typography, Box, Button } from '@mui/material';
import ItemReviews from './ItemReviews';
import SubmitReview from './SubmitReview';

interface MenuItemProps {
  id: number;
  name: string;
  description: string;
  price: number;
  addToCart: (itemId: number) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  id,
  name,
  description,
  price,
  addToCart,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const reviews = useSelector(
    (state: RootState) => state.reviews.itemReviews[id] || []
  );

  useEffect(() => {
    dispatch(fetchReviewsForMenuItem(id));
  }, [dispatch, id]);

  return (
    <Box>
      <Typography variant="h6">{name}</Typography>
      <Typography variant="body1">{description}</Typography>
      <Typography variant="body2">${price.toFixed(2)}</Typography>
      <Button onClick={() => addToCart(id)}>Add to Cart</Button>
      <ItemReviews reviews={reviews} />
      <SubmitReview menuItemId={id} />
    </Box>
  );
};

export default MenuItem;
