import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMenu } from '../../api/guestApi';
import { MenuItem } from '../../types';
import { useSocket } from '../../context/SocketContext';

const Menu: React.FC = () => {
  const { locationId } = useParams<{ locationId: string }>();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const socket = useSocket();

  useEffect(() => {
    const loadMenu = async () => {
      const items = await fetchMenu(locationId);
      setMenuItems(items);
    };
    loadMenu();

    if (socket) {
      socket.emit('join-location', locationId);

      socket.on('inventory-update', (update) => {
        setMenuItems((prevItems) =>
          prevItems.map((item) =>
            item.id === update.menuItemId
              ? { ...item, onlineInventoryOffset: update.newInventory }
              : item
          )
        );
      });
    }

    return () => {
      if (socket) {
        socket.off('inventory-update');
      }
    };
  }, [locationId, socket]);

  return (
    <div>
      <h2>Menu</h2>
      {menuItems.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <p>Price: ${item.price}</p>
          {item.isAvailable ? (
            <button>Add to Cart</button>
          ) : (
            <span>Out of Stock</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Menu;
