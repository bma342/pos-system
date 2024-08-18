import React from 'react';
import SecurePaymentForm from '../components/SecurePaymentForm';

const POS = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">POS System</h1>
      <SecurePaymentForm />
    </div>
  );
};

export default POS;
