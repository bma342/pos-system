import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import {
  addToCart,
  removeFromCart,
  applyDiscount,
  selectCartItems,
  selectCartTotal,
} from '../redux/slices/cartSlice';
import { Discount, CartItem, MenuItem } from '../types';
import { fetchMenus } from '../redux/slices/menuSlice';

const OrderPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const menus = useSelector((state: RootState) => state.menu.menus);
  const menuStatus = useSelector((state: RootState) => state.menu.status);

  useEffect(() => {
    if (menuStatus === 'idle') {
      dispatch(fetchMenus());
    }
  }, [dispatch, menuStatus]);

  const handleAddToCart = (item: MenuItem) => {
    dispatch(addToCart({ ...item, quantity: 1 }));
  };

  const handleRemoveFromCart = (itemId: string) => {
    dispatch(removeFromCart(itemId));
  };

  const handleApplyDiscount = (discount: Discount) => {
    dispatch(applyDiscount(discount));
  };

  if (menuStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (menuStatus === 'failed') {
    return <div>Error loading menu. Please try again.</div>;
  }

  return (
    <div>
      <h1>Order Page</h1>
      <div>
        <h2>Menu</h2>
        {menus.map((menu) => (
          <div key={menu.id}>
            <h3>{menu.name}</h3>
            {menu.items.map((item) => (
              <div key={item.id}>
                <span>{item.name}</span>
                <span>${item.price.toFixed(2)}</span>
                <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div>
        <h3>Cart</h3>
        {cartItems.map((cartItem: CartItem) => (
          <div key={cartItem.id}>
            <span>{cartItem.name}</span>
            <span>${cartItem.price.toFixed(2)}</span>
            <span>Quantity: {cartItem.quantity}</span>
            <button onClick={() => handleRemoveFromCart(cartItem.id)}>
              Remove
            </button>
          </div>
        ))}
        <div>Total: ${cartTotal.toFixed(2)}</div>
      </div>
      {/* Add discount application UI here */}
    </div>
  );
};

export default OrderPage;