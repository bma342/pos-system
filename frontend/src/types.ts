import { store } from './redux/store';

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Define the UserRole type
export type UserRole = 'admin' | 'manager' | 'user';

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
  gpsCoordinates?: string;
}

export interface Wallet {
  balance: number;
  guestId: number;
  id?: number;
  discounts?: Discount[];
}

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
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
  id: number;
  clientId: number;
  items: OrderItem[];
  total: number;
  status: string;
  customerName?: string;
  createdAt?: string;
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
  id: string;
  name: string;
  value: number;
  type: string;
  expirationDate: string;
  locationId: number | null;
  conditions: Record<string, unknown>;
  startDate: string;
  endDate: string;
}

export interface LoyaltyConfig {
  tiers: { tierName: string }[];
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
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
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  permissions: string[]; // Added to align with the auth slice
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
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
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

// Define the AuthResponse type
export interface AuthResponse {
  user: User;
  token: string;
  permissions?: string[]; // Include permissions if it's part of the response
}
