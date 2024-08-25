import React from 'react';

interface Discount {
  id: number;
  name: string;
  vanityName?: string;
}

interface DiscountSelectorProps {
  discounts: Discount[];
  selectedDiscountId: number;
  onSelect: (id: number) => void;
}

const DiscountSelector: React.FC<DiscountSelectorProps> = ({
  discounts,
  selectedDiscountId,
  onSelect,
}) => {
  return (
    <select
      value={selectedDiscountId}
      onChange={(e) => onSelect(Number(e.target.value))}
    >
      {discounts.map((discount) => (
        <option key={discount.id} value={discount.id}>
          {discount.vanityName || discount.name}
        </option>
      ))}
    </select>
  );
};

export default DiscountSelector;
