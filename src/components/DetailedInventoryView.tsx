import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInventory, updateInventoryItem } from '../redux/slices/inventorySlice';
import { RootState, AppDispatch } from '../redux/store';
import { InventoryItem } from '../types/inventoryTypes';

const DetailedInventoryView: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status, error } = useSelector((state: RootState) => state.inventory);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchInventory('defaultLocationId')); // Replace with actual location ID
    }
  }, [status, dispatch]);

  const handleUpdateItem = (item: InventoryItem, updates: Partial<InventoryItem>) => {
    dispatch(updateInventoryItem({ locationId: item.locationId, itemId: item.id, updates }));
  };

  if (status === 'loading') {
    return <div>Loading inventory...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Inventory</h2>
      {items.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>Quantity: {item.quantity} {item.unit}</p>
          <button onClick={() => handleUpdateItem(item, { quantity: item.quantity + 1 })}>
            Increase Quantity
          </button>
        </div>
      ))}
    </div>
  );
};

export default DetailedInventoryView;