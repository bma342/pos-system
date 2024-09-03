export interface Wallet {
    id: string;
    userId: string;
    balance: number;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface WalletTransaction {
    id: string;
    walletId: string;
    amount: number;
    type: 'CREDIT' | 'DEBIT';
    description: string;
    createdAt: Date;
  }