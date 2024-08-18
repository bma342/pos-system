import React from 'react';

const Menu = ({ name, price }) => {
  return (
    <div className="p-4 border rounded shadow-lg">
      <h2 className="text-lg font-bold">{name}</h2>
      <p className="text-gray-700">{price}</p>
    </div>
  );
};

export default Menu;
