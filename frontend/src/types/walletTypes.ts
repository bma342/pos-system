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