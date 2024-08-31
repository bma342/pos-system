export interface POSIntegration {
  id: number;
  tenantId: string;
  posType: POSType;
  apiKey: string;
  isActive: boolean;
  lastSyncDate: string;
}

export enum POSType {
  TOAST = 'TOAST',
  SQUARE = 'SQUARE',
  CLOVER = 'CLOVER',
  REVEL = 'REVEL',
}
