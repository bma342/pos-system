export interface RevenueData {
    date: string;
    totalRevenue: number;
    orderCount: number;
    averageOrderValue: number;
    topSellingItems: TopSellingItem[];
  }
  
  export interface TopSellingItem {
    itemId: string;
    itemName: string;
    quantity: number;
    revenue: number;
  }