import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import LoyaltyChallengeManager from '../components/LoyaltyChallengeManager';
import WalletDrop from '../components/WalletDrop';
import DiscountBuilder from '../components/DiscountBuilder';
import POSDiscountSync from '../components/POSDiscountSync';
import ClientAdminHub from '../components/ClientAdminHub';

const LoyaltyAdminPage: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const isClientAdmin = user?.roles.includes(UserRole.CLIENT_ADMIN);

  return (
    <div>
      <h1>Loyalty Program Administration</h1>
      {isClientAdmin ? (
        <ClientAdminHub />
      ) : (
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
