import React from 'react';
import { InventoryItem } from '../types';

interface Props {
  items: InventoryItem[];
}

const InventoryAlerts: React.FC<Props> = ({ items }) => {
  return (
    <div className="inventory-alerts">
      <h4>Out of Stock Items</h4>
      {items.length === 0 ? (
        <p>No items are currently out of stock.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.name} - Out of stock for {item.outOfStockDuration} hours
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InventoryAlerts;
