export interface Discount {
    id: string;
    clientId: string;
    name: string;
    code: string;
    type: 'PERCENTAGE' | 'FIXED_AMOUNT';
    value: number;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
    description?: string;
  }