import React, { useState } from 'react';
import { InventoryItem } from '../types';

interface Props {
  inventory: InventoryItem[];
}

const DetailedInventoryView: React.FC<Props> = ({ inventory }) => {
  const [filter, setFilter] = useState('');

  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="detailed-inventory-view">
      <h3>Detailed Inventory View</h3>
      <input
        type="text"
        placeholder="Filter items..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Reorder Point</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredInventory.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.reorderPoint}</td>
              <td>{item.quantity <= item.reorderPoint ? 'Low Stock' : 'OK'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DetailedInventoryView;
