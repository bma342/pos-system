import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { InventoryItem } from '../types/inventoryTypes';

const Inventory: React.FC = () => {
  const items = useSelector((state: RootState) => state.inventory.items);
  const status = useSelector((state: RootState) => state.inventory.status);
  const error = useSelector((state: RootState) => state.inventory.error);

  if (status === 'loading') {
    return <div>Loading inventory...</div>;
  }

  if (error) {
    return <div>Error fetching inventory: {error}</div>;
  }

  return (
    <div>
      <h2>Inventory</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Reorder Point</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item: InventoryItem) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.unit}</td>
              <td>{item.reorderPoint}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;
