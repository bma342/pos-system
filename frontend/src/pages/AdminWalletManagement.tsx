import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { fetchWalletData } from '../api/walletApi';
import { Wallet, Discount } from '../types';
import { selectGuestProfile } from '../redux/slices/guestSlice';
import { RootState } from '../redux/rootReducer';
import '../styles/AdminWalletManagement.css';

const AdminWalletManagement: React.FC = () => {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const guestProfile = useSelector(selectGuestProfile);
  const guestId = guestProfile?.id;

  const loadWalletData = useCallback(async () => {
    if (!guestId) return;

    try {
      setLoading(true);
      const walletData = await fetchWalletData(guestId);
      setWallet(walletData);
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
    <div className="admin-wallet-management" role="region" aria-label="Admin Wallet Management">
      <h2 id="wallet-heading">Admin Wallet Management</h2>
      {loading && <p aria-live="polite">Loading...</p>}
      {error && <p className="error" aria-live="assertive">{error}</p>}
      {wallet && (
        <div className="wallet-info" aria-labelledby="wallet-heading">
          <p>Guest ID: <span aria-label="Guest ID">{wallet.guestId}</span></p>
          <p>Balance: <span aria-label="Wallet Balance">${wallet.balance.toFixed(2)}</span></p>
          <h3 id="discounts-heading">Discounts:</h3>
          {wallet.discounts && wallet.discounts.length > 0 ? (
            <ul className="discount-list" aria-labelledby="discounts-heading">
              {wallet.discounts.map((discount: Discount) => (
                <li key={discount.id} className="discount-item">
                  {discount.name} - {discount.value}%
                  {discount.endDate && (
                    <span className="expiration-date">
                      {' (Expires: '}
                      {new Date(discount.endDate).toLocaleDateString()}
                      {')'}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No discounts available</p>
          )}
        </div>
      )}
      <button onClick={loadWalletData} className="refresh-button" aria-label="Refresh Wallet Data">
        Refresh Wallet Data
      </button>
    </div>
  );
};

export default AdminWalletManagement;
