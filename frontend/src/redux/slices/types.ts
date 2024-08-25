export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface MenuState {
  menus: Menu[];
  loading: boolean;
  error: string | null;
}

export interface ClientState {
  clients: Client[];
  loading: boolean;
  error: string | null;
}

export interface LocationState {
  locations: Location[];
  loading: boolean;
  error: string | null;
}

export interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

export interface RoleState {
  roles: Role[];
  loading: boolean;
  error: string | null;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface Menu {
  id: number;
  name: string;
  groups: MenuGroup[];
}

export interface MenuGroup {
  id: number;
  name: string;
  items: MenuItem[];
}

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
}

export interface Client {
  id: number;
  name: string;
  subdomain: string;
  active: boolean;
}

export interface Location {
  id: number;
  name: string;
  address: string;
  posSystem: string;
  locationHours: string;
  posApiKey: string;
  posGuid: string;
  providerId?: number;
  serviceFee?: number;
}

export interface Order {
  id: number;
  clientId: number;
  items: OrderItem[];
  total: number;
  status: string;
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

export interface ServiceFee {
  id: number;
  name: string;
  amount: number;
}

export interface Provider {
  id: number;
  name: string;
  serviceFee: number;
}

export interface Discount {
  id: number;
  name: string;
  type: string;
  value: string;
  locationId: number | null;
  conditions: Record<string, unknown>;
  startDate: string;
  endDate: string;
}
