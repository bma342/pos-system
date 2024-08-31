import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../redux/store';
import {
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
} from '../redux/slices/cartSlice';
import { createOrder } from '../api/orderApi';
import { fetchGuestRewards } from '../api/guestApi';
import { OrderType, Reward, CartItem } from '../types';

const CheckoutPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const location = useSelector(
    (state: RootState) => state.location.currentLocation
  );
  const guest = useSelector((state: RootState) => state.auth.guest);

  const [orderType, setOrderType] = useState<OrderType>('pickup');
  const [kitchenTip, setKitchenTip] = useState(0);
  const [driverTip, setDriverTip] = useState(0);
  const [appliedDiscounts, setAppliedDiscounts] = useState<string[]>([]);
  const [availableRewards, setAvailableRewards] = useState<Reward[]>([]);

  useEffect(() => {
    if (guest) {
      fetchGuestRewards(guest.id).then(setAvailableRewards);
    }
  }, [guest]);

  const handleQuantityChange = (index: number, newQuantity: number) => {
    dispatch(updateCartItemQuantity({ index, quantity: newQuantity }));
  };

  const handleRemoveItem = (index: number) => {
    dispatch(removeFromCart(index));
  };

  const calculateItemTotal = (item: CartItem) => {
    const itemTotal = item.menuItem.price * item.quantity;
    const modifierTotal =
      item.selectedModifiers.reduce((sum, mod) => sum + mod.price, 0) *
      item.quantity;
    return itemTotal + modifierTotal;
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + calculateItemTotal(item),
      0
    );
  };

  const calculateTax = (subtotal: number) => {
    return subtotal * (location?.taxRate || 0);
  };

  const calculateServiceCharge = (subtotal: number) => {
    const rate =
      orderType === 'catering'
        ? location?.cateringServiceChargeRate
        : location?.serviceChargeRate;
    return subtotal * (rate || 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal);
    const serviceCharge = calculateServiceCharge(subtotal);
    const tips = orderType === 'catering' ? kitchenTip + driverTip : 0;
    return subtotal + tax + serviceCharge + tips;
  };

  const handleCheckout = async () => {
    try {
      if (!location) {
        throw new Error('Location not selected');
      }
      const order = await createOrder(
        cartItems,
        orderType,
        location.id,
        guest?.id || null,
        appliedDiscounts,
        kitchenTip,
        driverTip
      );
      dispatch(clearCart());
      navigate(`/order-confirmation/${order.id}`);
    } catch (error) {
      console.error('Error creating order:', error);
      // Handle error (show error message, etc.)
    }
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <div className="order-type-selector">
        <label>
          Order Type:
          <select
            value={orderType}
            onChange={(e) => setOrderType(e.target.value as OrderType)}
          >
            <option value="pickup">Pickup</option>
            <option value="delivery">Delivery</option>
            <option value="catering">Catering</option>
          </select>
        </label>
      </div>
      {cartItems.map((item, index) => (
        <div key={index} className="cart-item">
          <h3>{item.menuItem.name}</h3>
          <p>
            Quantity:
            <input
              type="number"
              value={item.quantity}
              onChange={(e) =>
                handleQuantityChange(index, parseInt(e.target.value))
              }
              min="1"
            />
          </p>
          <p>Price: ${calculateItemTotal(item).toFixed(2)}</p>
          {item.selectedModifiers.map((mod) => (
            <p key={mod.id}>
              {mod.name}: ${(mod.price * item.quantity).toFixed(2)}
            </p>
          ))}
          <button onClick={() => handleRemoveItem(index)}>Remove</button>
        </div>
      ))}
      <div className="order-summary">
        <h2>Order Summary</h2>
        <p>Subtotal: ${calculateSubtotal().toFixed(2)}</p>
        <p>Tax: ${calculateTax(calculateSubtotal()).toFixed(2)}</p>
        <p>
          Service Charge: $
          {calculateServiceCharge(calculateSubtotal()).toFixed(2)}
        </p>
        {orderType === 'catering' && (
          <>
            <label>
              Kitchen Tip: $
              <input
                type="number"
                value={kitchenTip}
                onChange={(e) => setKitchenTip(parseFloat(e.target.value))}
                min="0"
                step="0.01"
              />
            </label>
            <label>
              Driver Tip: $
              <input
                type="number"
                value={driverTip}
                onChange={(e) => setDriverTip(parseFloat(e.target.value))}
                min="0"
                step="0.01"
              />
            </label>
          </>
        )}
        <h3>Total: ${calculateTotal().toFixed(2)}</h3>
      </div>
      {availableRewards.length > 0 && (
        <div className="available-rewards">
          <h3>Available Rewards</h3>
          {availableRewards.map((reward) => (
            <div key={reward.id}>
              <p>
                {reward.name} - {reward.description}
              </p>
              <button
                onClick={() =>
                  setAppliedDiscounts([...appliedDiscounts, reward.id])
                }
              >
                Apply
              </button>
            </div>
          ))}
        </div>
      )}
      <button onClick={handleCheckout}>Place Order</button>
    </div>
  );
};

export default CheckoutPage;
