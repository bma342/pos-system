import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchReviewsForMenuItem } from '../redux/slices/reviewSlice';
import { MenuItem as MenuItemType } from '../types/menuTypes';
import MenuItemDisplay from './MenuItemDisplay';
import SubmitReview from './SubmitReview';
import { Review } from '../types/reviewTypes';

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const dispatch = useDispatch<AppDispatch>();
  const reviews = useSelector(
    (state: RootState) => state.review.reviews[item.id] || []
  );

  useEffect(() => {
    if (item.reviewsEnabled) {
      dispatch(fetchReviewsForMenuItem(item.id));
    }
  }, [dispatch, item.id, item.reviewsEnabled]);

  return (
    <div>
      <MenuItemDisplay item={item} />
      {item.reviewsEnabled && (
        <>
          <h3>Reviews</h3>
          {reviews.map((review: Review) => (
            <div key={review.id}>{review.content}</div>
          ))}
          <SubmitReview menuItemId={item.id} />
        </>
      )}
    </div>
  );
};

export default MenuItem;
