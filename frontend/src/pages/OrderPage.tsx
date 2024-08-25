import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import {
  addToCart,
  removeFromCart,
  applyDiscount,
  selectCartItems,
} from '../redux/slices/cartSlice';
import { Discount, CartItem, MenuItem } from '../types';
import { fetchMenus } from '../redux/slices/menuSlice';
import { fetchDiscounts } from '../redux/slices/discountSlice';
import { useClientContext } from '../context/ClientContext';

const OrderPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector(selectCartItems);
  const { clientId } = useClientContext();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [availableDiscounts, setAvailableDiscounts] = useState<Discount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (clientId) {
        setLoading(true);
        try {
          const menuAction = await dispatch(fetchMenus(clientId));
          if (fetchMenus.fulfilled.match(menuAction)) {
            const items = menuAction.payload.flatMap((menu) =>
              menu.groups.flatMap((group) => group.items)
            );
            setMenuItems(items);
          }

          const discountAction = await dispatch(fetchDiscounts(clientId));
          if (fetchDiscounts.fulfilled.match(discountAction)) {
            setAvailableDiscounts(discountAction.payload);
          }
        } catch (err) {
          setError('Failed to load menu items or discounts');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [dispatch, clientId]);

  const handleAddToCart = (item: MenuItem) => {
    dispatch(
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
      })
    );
  };

  const handleRemoveFromCart = (itemId: number) => {
    dispatch(removeFromCart(itemId));
  };

  const handleApplyDiscount = (discount: Discount) => {
    dispatch(applyDiscount(discount));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Order</h2>
      <div>
        <h3>Menu Items</h3>
        {menuItems.map((item) => (
          <div key={item.id}>
            <span>
              {item.name} - ${item.price.toFixed(2)}
            </span>
            <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <div>
        <h3>Cart</h3>
        {cart.map((cartItem: CartItem) => (
          <div key={cartItem.id}>
            <span>{cartItem.name}</span>
            <span>${cartItem.price.toFixed(2)}</span>
            <button onClick={() => handleRemoveFromCart(cartItem.id)}>
              Remove
            </button>
          </div>
        ))}
      </div>
      <div>
        <h3>Available Discounts</h3>
        {availableDiscounts.map((discount) => (
          <button
            key={discount.id}
            onClick={() => handleApplyDiscount(discount)}
          >
            Apply {discount.name} ({discount.value}% off)
          </button>
        ))}
      </div>
    </div>
  );
};

export default OrderPage;
