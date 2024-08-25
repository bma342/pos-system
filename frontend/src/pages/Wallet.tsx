import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  loadWalletData,
  selectWalletBalance,
  selectWalletRewards,
  selectWalletDiscounts,
} from '../redux/slices/walletSlice';
import { AppDispatch } from '../redux/store';

const Wallet: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const balance = useSelector(selectWalletBalance);
  const rewards = useSelector(selectWalletRewards);
  const discounts = useSelector(selectWalletDiscounts);

  useEffect(() => {
    dispatch(loadWalletData());
  }, [dispatch]);

  return (
    <div>
      <h2>Your Wallet</h2>
      <p>Balance: ${balance.toFixed(2)}</p>

      <h3>Rewards</h3>
      {rewards.length > 0 ? (
        <ul>
          {rewards.map((reward) => (
            <li key={reward.id}>
              {reward.name}: {reward.description} - {reward.pointsRequired}{' '}
              points
            </li>
          ))}
        </ul>
      ) : (
        <p>No rewards available</p>
      )}

      <h3>Discounts</h3>
      {discounts.length > 0 ? (
        <ul>
          {discounts.map((discount) => (
            <li key={discount.id}>
              {discount.name}: {discount.value}% (Expires:{' '}
              {new Date(discount.expirationDate).toLocaleDateString()})
            </li>
          ))}
        </ul>
      ) : (
        <p>No discounts available</p>
      )}
    </div>
  );
};

export default Wallet;
