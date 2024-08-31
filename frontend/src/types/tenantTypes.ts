export interface Tenant {
  id: string;
  name: string;
  subdomain: string;
  plan: TenantPlan;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export enum TenantPlan {
  BASIC = 'BASIC',
  PREMIUM = 'PREMIUM',
  ENTERPRISE = 'ENTERPRISE',
}
