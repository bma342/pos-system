import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../types';
import { UserRole } from '../types/userTypes';
import LoyaltyChallengeManager from '../components/LoyaltyChallengeManager';
import WalletDrop from '../components/WalletDrop';
import DiscountBuilder from '../components/DiscountBuilder';
import POSDiscountSync from '../components/POSDiscountSync';

const LoyaltyAdminPage: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const isClientAdmin = user?.role === UserRole.CLIENT_ADMIN;

  return (
    <div>
      <h1>Loyalty Admin Page</h1>
      {isClientAdmin && (
        <>
          <LoyaltyChallengeManager />
          <WalletDrop />
          <DiscountBuilder />
          <POSDiscountSync />
        </>
      )}
    </div>
  );
};

export default LoyaltyAdminPage;