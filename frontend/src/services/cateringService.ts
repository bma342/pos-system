import { fetchCateringOrders, updateCateringOrder, deleteCateringOrder } from '../api/cateringApi';
import { CateringOrder } from '../types/cateringTypes';

export const cateringService = {
  fetchCateringOrders,
  updateCateringOrder,
  deleteCateringOrder,
};
