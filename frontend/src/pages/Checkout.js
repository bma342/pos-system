import React from 'react';
import { useSelector } from 'react-redux';

const Checkout = () => {
  const cart = useSelector((state) => state.cart);

  const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <ul>
        {cart.items.map((item) => (
          <li key={item.id} className="flex justify-between py-2">
            <span>{item.name}</span>
            <span>${item.price.toFixed(2)} x {item.quantity}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <h2 className="text-xl font-bold">Total: ${total.toFixed(2)}</h2>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Place Order</button>
      </div>
    </div>
  );
};

export default Checkout;
