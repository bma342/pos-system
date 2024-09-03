export interface ServiceFee {
    id: string;
    clientId: string;
    name: string;
    amount: number;
    type: 'FIXED' | 'PERCENTAGE';
    description?: string;
  }