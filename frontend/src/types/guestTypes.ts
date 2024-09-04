export interface Guest {
    id: string;
    name: string;
    email: string;
    phone?: string;
    lastVisit?: Date;
    visitCount: number;
    preferences?: string[];
  }

export interface GuestMetrics {
  totalGuests: number;
  newGuests: number;
  activeGuests: number;
  averageOrderValue: number;
  repeatGuestRate: number;
  guestRetentionRate: number;
  guestLifetimeValue: number;
  averageOrdersPerGuest: number;
  topGuests: {
    guestId: string;
    name: string;
    totalOrders: number;
    totalSpent: number;
  }[];
  guestSatisfactionScore: number;
  lastUpdated: string;
}