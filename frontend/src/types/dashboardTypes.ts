import { Dayjs } from 'dayjs';

export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

export interface DashboardParams {
  dateRange: DateRange;
  clientId: string;
  locationId: string;
}

export interface DashboardData {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  newCustomers: number;
  popularItems: PopularItem[];
  revenue: number;
  customerRetentionRate: number;
  revenueOverTime: ChartData;
  orderTrends: ChartData;
  menuPerformance: ChartData;
  customerInsights: ChartData;
  locationComparison: LocationComparisonData;
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

export interface PopularItem {
  name: string;
  orderCount: number;
}