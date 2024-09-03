import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { fetchMenus } from '../redux/slices/menuSlice';
import { addToCart, applyDiscount, removeFromCart } from '../redux/slices/cartSlice';
import { Menu, MenuItem } from '../types/menuTypes';
import { CartItem, Discount } from '../types/cartTypes';

const OrderPage: React.FC = () => {
  const dispatch = useDispatch();
  const menus = useSelector((state: RootState) => state.menu.menus);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    dispatch(fetchMenus() as any);
  }, [dispatch]);

  const handleAddToCart = (item: MenuItem) => {
    dispatch(addToCart({
      menuItemId: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
    }));
  };

  const handleRemoveFromCart = (itemId: string) => {
    dispatch(removeFromCart(itemId));
  };

  const handleApplyDiscount = (discount: Discount) => {
    dispatch(applyDiscount(discount.amount));
  };

  return (
    <div>
      <h1>Order Page</h1>
      <div>
        <h2>Menu</h2>
        {menus.map((menu: Menu & { menuGroups: MenuGroup[] }) => (
          <div key={menu.id}>
            <h3>{menu.name}</h3>
            {menu.menuGroups.flatMap((group: MenuGroup) => group.items).map((item: MenuItem) => (
              <div key={item.id}>
                <span>{item.name} - ${item.price}</span>
                <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div>
        <h2>Cart</h2>
        {cartItems.map((cartItem: CartItem) => (
          <div key={cartItem.menuItemId}>
            <span>{cartItem.name}</span>
            <span>${cartItem.price.toFixed(2)}</span>
            <button onClick={() => handleRemoveFromCart(cartItem.menuItemId)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderPage;