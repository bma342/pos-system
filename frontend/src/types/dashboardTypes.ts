import { Dayjs } from 'dayjs';

export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

export interface DashboardParams {
  dateRange: DateRange;
  clientId?: string;
  locationId?: string;
}

export interface DashboardData {
  totalOrders?: number;
  revenue?: number;
  averageOrderValue?: number;
  customerRetentionRate?: number;
  revenueOverTime?: ChartData;
  orderTrends?: ChartData;
  menuPerformance?: ChartData;
  customerInsights?: ChartData;
  locationComparison?: LocationComparisonData;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
  }[];
}

export interface LocationComparisonData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
  }[];
}

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