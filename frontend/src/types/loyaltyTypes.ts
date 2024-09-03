export interface LoyaltyReward {
    id: string;
    name: string;
    description: string;
    pointsRequired: number;
    reward: string;
  }
  
  export interface LoyaltyConfig {
    id: string;
    clientId: string;
    pointsPerDollar: number;
    expirationPeriod: number; // in days
  }
  
  export interface LoyaltyTransaction {
    id: string;
    userId: string;
    points: number;
    type: 'EARN' | 'REDEEM';
    description: string;
    createdAt: Date;
  }