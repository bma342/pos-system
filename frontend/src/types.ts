import { store } from './redux/store';

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Define the UserRole type
export type UserRole = 'admin' | 'manager' | 'user';

// Define the OrderType
export type OrderType = 'pickup' | 'delivery' | 'dine-in';

// Define the Reward interface
export interface Reward {
  id: number;
  name: string;
  description: string;
  pointsRequired: number;
}

// Define the interfaces for various entities used in the app

export interface LoyaltyReward {
  id: number;
  name: string;
  pointsRequired: number;
  description?: string;
  expirationDate?: string;
  isActive: boolean;
}

export interface LoyaltyTier {
  id: number;
  firstName: string;
  lastName: string;
  loyaltyPoints: number;
}

export interface Location {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
  email: string;
  latitude: number;
  longitude: number;
  imageUrl?: string;
  corePOSProfileId?: number;
  posApis?: string[];
  isDropoffSite?: boolean;
  dropOffLocations?: DropOffLocation[];
  twoFactorException: boolean;
  paymentGatewayExceptions: PaymentGateway[];
}

export interface Wallet {
  balance: number;
  guestId: number;
  id?: number;
  discounts?: Discount[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  modifiers: Modifier[];
  defaultModifiers: Modifier[];
  reviewsEnabled: boolean;
  averageRating?: number;
  reviewCount?: number;
  showQuantityAvailable: boolean;
  quantityAvailable?: number;
}

export interface Modifier {
  id: string;
  name: string;
  price: number;
}

export interface MenuGroup {
  id: number;
  name: string;
  items: MenuItem[];
}

export interface Menu {
  id: number;
  name: string;
  description?: string;
  groups: MenuGroup[];
}

export interface BrandingProfile {
  id: number;
  clientId: number;
  name: string;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  fontColor: string;
  secondaryFontColor?: string;
}

export interface BrandingState {
  profiles: BrandingProfile[];
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
  error: string | null;
}

export interface ServiceFee {
  id: number;
  name: string;
  amount: number;
  value: number;
}

export interface Client {
  id: number;
  name: string;
  subdomain: string;
  active: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  orderType: OrderType;
  subtotal: number;
  tax: number;
  total: number;
  appliedDiscounts: Reward[];
  kitchenTip?: number;
  driverTip?: number;
}

export interface OrderItem {
  id: number;
  menuItemId: number;
  quantity: number;
  price: number;
}

export interface Role {
  id: number;
  name: string;
  permissions: string[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
}

export interface POSProfile {
  id: number;
  name: string;
  provider: string;
}

export interface POSProfileState {
  profiles: POSProfile[];
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
  error: string | null;
}

export interface Discount {
  id: number;
  name: string;
  type: 'percentage' | 'fixed' | 'bogo';
  value: number;
  code?: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  usageLimit?: number;
  usageCount: number;
  minPurchaseAmount?: number;
  maxDiscountAmount?: number;
  applicableItems?: string;
  applicableCategories?: string;
}

export interface LoyaltyConfig {
  tiers: { tierName: string }[];
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  selectedModifiers: Modifier[];
}

export interface DashboardStat {
  id: number;
  label: string;
  value: number | string;
}

export interface CateringOrder extends Order {
  eventDate: string;
  specialInstructions: string;
}

export interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  reorderPoint: number;
}

// Redux Slice State Types
export interface ClientState {
  clients: Client[];
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
  error: string | null;
}

export interface OrderState {
  orders: Order[];
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
  error: string | null;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  permissions: string[];
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
  error: string | null;
}

export interface WalletState {
  balance: number;
  rewards: LoyaltyReward[];
  discounts: Discount[];
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
  error: string | null;
}

export interface LocationState {
  locations: Location[];
  selectedLocation: Location | null;
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
  error: string | null;
}

export interface MenuState {
  menus: Menu[];
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
  error: string | null;
}

export interface BrandingState {
  profiles: BrandingProfile[];
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
  error: string | null;
}

export interface LoyaltyState {
  rewards: LoyaltyReward[];
  config: LoyaltyConfig;
  userPoints: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface RoleState {
  roles: Role[];
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
  error: string | null;
}

export interface DiscountState {
  list: Discount[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface CartState {
  items: CartItem[];
  discount: Discount | null;
}

export interface GuestState {
  profile: unknown;
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
  error: string | null;
}

export interface UserState {
  profile: User | null;
  rewards: unknown[];
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
  error: string | null;
}

export interface ServiceFeeState {
  serviceFees: ServiceFee[];
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
  error: string | null;
}

export interface InventoryState {
  items: InventoryItem[];
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
  error: string | null;
}

export interface GuestProfile {
  id: number;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  loyaltyPoints: number;
  loyaltyTier: string;
}

export interface DashboardState {
  stats: DashboardStat[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface CateringOrderState {
  orders: CateringOrder[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// General Utility Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message: string;
}

export interface ClientBranding {
  id: string;
  clientId: string;
  logo: string;
  favicon: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  buttonStyle: 'rounded' | 'square';
  headerStyle: 'centered' | 'left-aligned';
  footerContent: string;
}

// Define the AuthResponse type
export interface AuthResponse {
  user: User;
  token: string;
  permissions?: string[]; // Include permissions if it's part of the response
}

export interface DropOffTime {
  id: number;
  time: string;
}

export interface DropOffLocation {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  parentLocationId: number;
  dropOffTimes: DropOffTime[];
}

export interface LoyaltyChallenge {
  id: number;
  name: string;
  description: string;
  conditions: {
    itemCount: number;
    timeframe: string;
    minSpend: number;
    frequency:
      | 'unlimited'
      | 'once_per_day'
      | 'once_per_week'
      | 'once_per_month';
    restrictedMenuItems?: number[];
    restrictedMenuGroups?: number[];
  };
  rewardConfig: {
    reward: string;
    points: number;
    discount: number;
  };
  challengeType: 'purchase-based' | 'engagement-based';
  startDate: Date;
  endDate: Date;
  status: 'active' | 'inactive' | 'completed' | 'archived';
  participantCount: number;
  locationId: number;
  clientId: number;
}

// Add this to the existing types
export interface LoyaltyChallengeProgress {
  id: number;
  challengeId: number;
  guestId: number;
  progress: {
    itemCount?: number;
    totalSpend?: number;
    // Add other relevant progress fields
  };
  isCompleted: boolean;
  completedAt?: Date;
}

export interface POSAlert {
  id: number;
  posProfileId: number;
  errorCode: string;
  message: string;
  timestamp: Date;
}

export interface RealtimeMetrics {
  todaySales: number;
  todayOrders: number;
  averageOrderValue: number;
  newGuests: number;
  returningGuests: number;
  mostPopularItem: string;
}

export enum PaymentGateway {
  STRIPE = 'stripe',
  PAYPAL = 'paypal',
  FINIX = 'finix',
  AEDYN = 'aedyn',
  WORLDPAY = 'worldpay',
}

export interface ClientSettings {
  companyName: string;
  supportEmail: string;
  twoFactorRequired: boolean;
  defaultPaymentGateways: PaymentGateway[];
}
