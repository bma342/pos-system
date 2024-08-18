import React from 'react';

const MenuItem = ({ name, price }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition">
      <h2 className="text-lg font-bold">{name}</h2>
      <p className="text-gray-600">{price}</p>
      <button className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Add to Cart</button>
    </div>
  );
};

export default MenuItem;
