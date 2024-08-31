import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { MenuItem } from '../types';
import { getVariantForUser } from '../utils/abTestUtils';
import { trackABTestMetric } from '../redux/slices/abTestSlice';
import { useLazyImage } from '../hooks/useLazyImage';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

interface Props {
  item: MenuItem;
  onSelect: () => void;
}

const MenuItemCard: React.FC<Props> = ({ item, onSelect }) => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const sessionId = useSelector((state: RootState) => state.session.id);
  const activeTests = useSelector((state: RootState) =>
    state.abTest.tests.filter(
      (test) => test.status === 'active' && test.itemId === item.id
    )
  );

  const getVariant = (field: keyof MenuItem) => {
    const test = activeTests.find((t) => t.field === field);
    if (test) {
      return getVariantForUser(
        userId,
        sessionId,
        test.id,
        test.variantA,
        test.variantB
      );
    }
    return item[field];
  };

  const imageSrc = useLazyImage(getVariant('image'), '/placeholder.jpg');

  const handleClick = () => {
    activeTests.forEach((test) => {
      const variant = getVariantForUser(userId, sessionId, test.id, 'A', 'B');
      dispatch(
        trackABTestMetric({
          testId: test.id,
          variant,
          metricType: 'click',
          value: 1,
        })
      );
    });
    onSelect();
  };

  return (
    <Card onClick={handleClick}>
      <CardMedia
        component="img"
        height="140"
        image={imageSrc}
        alt={item.name}
        loading="lazy"
      />
      <CardContent>
        <Typography variant="h6">{getVariant('name')}</Typography>
        <Typography variant="body2">{getVariant('description')}</Typography>
        <Typography variant="body1">${item.price.toFixed(2)}</Typography>
        {item.reviewsEnabled && (
          <Typography variant="body2">
            Rating: {item.averageRating} ({item.reviewCount} reviews)
          </Typography>
        )}
        {item.showQuantityAvailable && (
          <Typography variant="body2">
            Available: {item.quantityAvailable}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default React.memo(MenuItemCard);
