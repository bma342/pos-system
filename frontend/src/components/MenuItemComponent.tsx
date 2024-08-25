import React from 'react';

interface Modifier {
  id: number;
  name: string;
  price: number;
}

interface MenuItem {
  id: number;
  name: string;
  price: number;
  modifiers: Modifier[];
}

interface Props {
  item: MenuItem;
}

const MenuItemComponent: React.FC<Props> = ({ item }) => {
  return (
    <div className="border p-4 rounded">
      <h4 className="text-md font-semibold">{item.name}</h4>
      <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
      <div className="mt-2">
        <h5 className="text-sm font-bold">Modifiers:</h5>
        <ul className="list-disc ml-4">
          {item.modifiers.map((modifier) => (
            <li key={modifier.id}>
              {modifier.name} (+${modifier.price.toFixed(2)})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MenuItemComponent;
