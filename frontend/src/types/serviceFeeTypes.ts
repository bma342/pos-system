export interface ServiceFee {
    id: string;
    name: string;
    amount: number;
    type: 'fixed' | 'percentage';
    clientId: string;
}

export type ServiceFeeCreateData = Omit<ServiceFee, 'id'>;