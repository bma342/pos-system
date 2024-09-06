export interface ServiceFee {
    id: string;
    name: string;
    amount: number;
    type: 'fixed' | 'percentage';
    // Add any other relevant fields
}