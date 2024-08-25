import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  addServiceFee,
  updateServiceFee,
} from '../redux/slices/serviceFeeSlice';
import { AppDispatch } from '../redux/store';
import { ServiceFee } from '../types';

const ServiceFeeManager: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [feeName, setFeeName] = useState('');
  const [feeAmount, setFeeAmount] = useState<number | string>('');

  const handleAddFee = () => {
    if (feeName && feeAmount) {
      const newFee: Omit<ServiceFee, 'id'> = {
        name: feeName,
        amount: Number(feeAmount),
        value: Number(feeAmount),
      };
      dispatch(addServiceFee(newFee));
      setFeeName('');
      setFeeAmount('');
    }
  };

  const handleUpdateFee = (id: number) => {
    if (feeAmount) {
      dispatch(
        updateServiceFee({
          id,
          amount: Number(feeAmount),
          value: Number(feeAmount),
        })
      );
      setFeeAmount('');
    }
  };

  return (
    <div>
      <h2>Manage Service Fees</h2>
      <input
        type="text"
        placeholder="Fee Name"
        value={feeName}
        onChange={(e) => setFeeName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Fee Amount"
        value={feeAmount}
        onChange={(e) => setFeeAmount(e.target.value)}
      />
      <button onClick={handleAddFee}>Add Service Fee</button>
      <button onClick={() => handleUpdateFee(1)}>Update Fee</button>
    </div>
  );
};

export default ServiceFeeManager;
