import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addDiscount, updateDiscount } from '../redux/slices/discountSlice';

const DiscountManager: React.FC = () => {
  const [discountName, setDiscountName] = useState('');
  const [discountValue, setDiscountValue] = useState<number>(0);
  const dispatch = useDispatch();

  const handleAddDiscount = () => {
    dispatch(
      addDiscount({
        id: '1',
        name: discountName,
        value: parseFloat(discountValue.toString()),
      })
    );
  };

  const handleUpdateDiscount = () => {
    dispatch(
      updateDiscount({ id: '1', value: parseFloat(discountValue.toString()) })
    );
  };

  return (
    <div>
      <h1>Discount Manager</h1>
      <input
        type="text"
        value={discountName}
        onChange={(e) => setDiscountName(e.target.value)}
        placeholder="Discount Name"
      />
      <input
        type="number"
        value={discountValue}
        onChange={(e) => setDiscountValue(parseFloat(e.target.value))}
        placeholder="Discount Value"
      />
      <button onClick={handleAddDiscount}>Add Discount</button>
      <button onClick={handleUpdateDiscount}>Update Discount</button>
    </div>
  );
};

export default DiscountManager;
