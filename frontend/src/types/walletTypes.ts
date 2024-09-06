export interface Wallet {
    id: string;
    balance: number;
    userId: string;
    // Add other relevant properties
}

export interface WalletTransaction {
    id: string;
    walletId: string;
    amount: number;
    type: 'CREDIT' | 'DEBIT';
    description: string;
    createdAt: Date;
    // Add other relevant properties
}

export interface Reward {
    id: string;
    name: string;
    points: number;
    // Add other relevant properties
}

export interface Discount {
    id: string;
    name: string;
    percentage: number;
    // Add other relevant properties
}