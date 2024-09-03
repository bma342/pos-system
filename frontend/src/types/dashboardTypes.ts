export interface DashboardStats {
    totalOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
    topSellingItems: TopSellingItem[];
    newCustomers: number;
    returningCustomers: number;
  }
  
  export interface TopSellingItem {
    itemId: string;
    itemName: string;
    quantity: number;
    revenue: number;
  }