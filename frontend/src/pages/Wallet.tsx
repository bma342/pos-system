import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  loadWalletData,
  fetchWalletBalance,
  selectWalletBalance,
  selectWalletRewards,
  selectWalletDiscounts,
} from '../redux/slices/walletSlice';
import { AppDispatch } from '../redux/store';

interface Reward {
  id: string;
  name: string;
}

interface Discount {
  id: string;
  name: string;
}

const Wallet: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const balance = useSelector(selectWalletBalance);
  const rewards = useSelector(selectWalletRewards);
  const discounts = useSelector(selectWalletDiscounts);

  useEffect(() => {
    dispatch(loadWalletData());
    dispatch(fetchWalletBalance());
  }, [dispatch]);

  return (
    <div>
      <h2>Your Wallet</h2>
      <p>Balance: ${(balance as number).toFixed(2)}</p>

      <h3>Rewards</h3>
      {(rewards as Reward[]).length > 0 ? (
        <ul>
          {(rewards as Reward[]).map((reward: Reward) => (
            <li key={reward.id}>{reward.name}</li>
          ))}
        </ul>
      ) : (
        <p>No rewards available</p>
      )}

      <h3>Discounts</h3>
      {(discounts as Discount[]).length > 0 ? (
        <ul>
          {(discounts as Discount[]).map((discount: Discount) => (
            <li key={discount.id}>{discount.name}</li>
          ))}
        </ul>
      ) : (
        <p>No discounts available</p>
      )}
    </div>
  );
};

export default Wallet;
