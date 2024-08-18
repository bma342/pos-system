import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenuItems } from '../redux/slices/menuSlice';
import MenuItem from '../components/MenuItem';

const OrderPage = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.menu);

  useEffect(() => {
    dispatch(fetchMenuItems());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order Menu</h1>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'succeeded' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <MenuItem key={item.id} name={item.name} price={item.price} />
          ))}
        </div>
      )}
      {status === 'failed' && <p>Failed to load menu items.</p>}
    </div>
  );
};

export default OrderPage;
