import React, { useState } from 'react';
import { applyDiscount } from '../api/discountApi';

interface Props {
  cartTotal: number;
  onDiscountApplied: (discountedTotal: number) => void;
}

const DiscountApplier: React.FC<Props> = ({ cartTotal, onDiscountApplied }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleApplyDiscount = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const { discountedTotal, appliedDiscount } = await applyDiscount(
        code,
        cartTotal
      );
      onDiscountApplied(discountedTotal);
      setCode('');
      alert(`Discount applied: ${appliedDiscount.name}`);
    } catch (error) {
      setError('Invalid or expired discount code');
    }
  };

  return (
    <div>
      <form onSubmit={handleApplyDiscount}>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter discount code"
        />
        <button type="submit">Apply Discount</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default DiscountApplier;
