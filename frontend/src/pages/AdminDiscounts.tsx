import React, { useEffect, useState } from 'react';
import {
  createDiscount,
  fetchDiscountsByLocation,
  updateDiscount,
  deleteDiscount,
  scheduleDiscountDrop,
} from '../api/discountApi';
import { Discount } from '../types';

const AdminDiscounts: React.FC = () => {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDiscounts();
  }, []);

  const loadDiscounts = async () => {
    try {
      setLoading(true);
      const data = await fetchDiscountsByLocation(1);
      setDiscounts(data);
    } catch (err) {
      setError('Failed to load discounts.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDiscount = async () => {
    try {
      const newDiscount = {
        name: 'New Discount',
        value: 10,
        type: 'percentage',
        expirationDate: new Date().toISOString(),
        locationId: 1,
        conditions: {},
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      };
      await createDiscount(newDiscount);
      loadDiscounts();
    } catch (err) {
      setError('Failed to create discount.');
    }
  };

  const handleUpdateDiscount = async (discountId: number) => {
    try {
      const updatedDiscount = {
        name: 'Updated Discount',
        value: 15,
      };
      await updateDiscount(discountId, updatedDiscount);
      loadDiscounts();
    } catch (err) {
      setError('Failed to update discount.');
    }
  };

  const handleDeleteDiscount = async (discountId: number) => {
    try {
      await deleteDiscount(discountId);
      loadDiscounts();
    } catch (err) {
      setError('Failed to delete discount.');
    }
  };

  const handleScheduleDiscountDrop = async () => {
    try {
      const scheduleData = {
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        recurrence: 'daily' as const,
        discountId: discounts[0]?.id ? Number(discounts[0].id) : 0,
      };
      await scheduleDiscountDrop(scheduleData);
      loadDiscounts();
    } catch (err) {
      setError('Failed to schedule discount drop.');
    }
  };

  return (
    <div>
      <h2>Discount Management</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <button onClick={handleCreateDiscount}>Create Discount</button>
      <button onClick={handleScheduleDiscountDrop}>
        Schedule Discount Drop
      </button>
      {discounts.map((discount) => (
        <div key={discount.id}>
          <p>
            {discount.name} - {discount.value}%
          </p>
          <button onClick={() => handleUpdateDiscount(Number(discount.id))}>
            Update
          </button>
          <button onClick={() => handleDeleteDiscount(Number(discount.id))}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminDiscounts;
