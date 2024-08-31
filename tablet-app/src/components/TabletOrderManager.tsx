import { handleError } from '../utils/errorHandler';

// ... existing code ...

const handleCancelOrder = async (orderId: string) => {
  try {
    await dispatch(cancelOrder(orderId));
    Alert.alert('Success', 'Order cancelled successfully');
  } catch (error) {
    handleError(error);
  }
};