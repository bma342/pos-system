import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../types';
import styled from 'styled-components';
import { CartItem } from '../types';

const CartPage: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart);

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.items.map((item: CartItem) => (
        <CartItemRow key={item.id}>
          <span>{item.name}</span>
          <span>${item.price.toFixed(2)}</span>
        </CartItemRow>
      ))}
    </div>
  );
};

const CartItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
`;

export default CartPage;
