import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { fetchWalletData } from '../api/walletApi';
import { Wallet, Discount } from '../types';
import { selectGuestProfile } from '../redux/slices/guestSlice';

const AdminWalletManagement: React.FC = () => {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const guestProfile = useSelector(selectGuestProfile);
  const guestId = guestProfile.id;

  const loadWalletData = useCallback(async () => {
    try {
      setLoading(true);
      const balance = await fetchWalletData();
      setWallet({
        balance: balance.balance,
        guestId: guestId,
        discounts: balance.discounts || [],
      });
    } catch (err) {
      setError('Failed to load wallet data.');
    } finally {
      setLoading(false);
    }
  }, [guestId]);

  useEffect(() => {
    loadWalletData();
  }, [loadWalletData]);

  return (
    <div>
      <h2>Admin Wallet Management</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {wallet && (
        <div>
          <p>Guest ID: {wallet.guestId}</p>
          <p>Balance: ${wallet.balance.toFixed(2)}</p>
          <h3>Discounts:</h3>
          {wallet.discounts && wallet.discounts.length > 0 ? (
            <ul>
              {wallet.discounts.map((discount: Discount) => (
                <li key={discount.id}>
                  {discount.name} - {discount.value}%{' (Expires: '}
                  {new Date(discount.expirationDate).toLocaleDateString()}
                  {')'}
                </li>
              ))}
            </ul>
          ) : (
            <p>No discounts available</p>
          )}
        </div>
      )}
      <button onClick={loadWalletData}>Refresh Wallet Data</button>
    </div>
  );
};

export default AdminWalletManagement;
