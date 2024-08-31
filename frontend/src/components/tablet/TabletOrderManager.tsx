import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import {
  fetchActiveOrders,
  cancelOrder,
  markItemOutOfStock,
} from '../../redux/slices/orderSlice';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Order, OrderItem } from '../../types';

const TabletOrderManager: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const activeOrders = useSelector(
    (state: RootState) => state.orders.activeOrders
  );
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    dispatch(fetchActiveOrders());
    const interval = setInterval(() => {
      dispatch(fetchActiveOrders());
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [dispatch]);

  const handleCancelOrder = (orderId: string) => {
    dispatch(cancelOrder(orderId));
  };

  const handleMarkItemOutOfStock = (itemId: string) => {
    dispatch(markItemOutOfStock(itemId));
  };

  const renderOrderItem = ({ item }: { item: OrderItem }) => (
    <View style={styles.orderItem}>
      <Text>{item.name}</Text>
      <Text>Quantity: {item.quantity}</Text>
      {item.modifications &&
        item.modifications.map((mod, index) => (
          <Text key={index} style={styles.modification}>
            {mod}
          </Text>
        ))}
      <TouchableOpacity onPress={() => handleMarkItemOutOfStock(item.id)}>
        <Text style={styles.outOfStockButton}>Mark Out of Stock</Text>
      </TouchableOpacity>
    </View>
  );

  const renderOrder = ({ item }: { item: Order }) => (
    <TouchableOpacity
      onPress={() => setSelectedOrder(item)}
      style={styles.orderCard}
    >
      <Text style={styles.orderNumber}>Order #{item.id}</Text>
      <Text>Promise Time: {item.promiseTime}</Text>
      <Text>Total Items: {item.items.length}</Text>
      <TouchableOpacity onPress={() => handleCancelOrder(item.id)}>
        <Text style={styles.cancelButton}>Cancel Order</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.orderList}>
        <Text style={styles.title}>Active Orders</Text>
        <FlatList
          data={activeOrders}
          renderItem={renderOrder}
          keyExtractor={(item) => item.id}
        />
      </View>
      {selectedOrder && (
        <View style={styles.orderDetails}>
          <Text style={styles.title}>Order Details</Text>
          <Text>Order #{selectedOrder.id}</Text>
          <Text>Promise Time: {selectedOrder.promiseTime}</Text>
          <FlatList
            data={selectedOrder.items}
            renderItem={renderOrderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  orderList: {
    flex: 1,
    padding: 10,
  },
  orderDetails: {
    flex: 2,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  orderCard: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  orderNumber: {
    fontWeight: 'bold',
  },
  cancelButton: {
    color: 'red',
    marginTop: 5,
  },
  orderItem: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
  modification: {
    fontStyle: 'italic',
  },
  outOfStockButton: {
    color: 'orange',
    marginTop: 5,
  },
});

export default TabletOrderManager;
