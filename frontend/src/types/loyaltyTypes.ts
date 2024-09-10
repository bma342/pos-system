export interface LoyaltyReward {
    id: string;
    name: string;
    description: string;
    rewardType: string;
    pointsRequired: number;
    isActive: boolean;
    availableDays: string[]; // e.g., ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    startDate?: Date;
    endDate?: Date;
    clientId: string; // Added clientId as it's used in the component
    locationId?: string; // Add this line
}

export interface LoyaltyConfig {
    tiers: LoyaltyTier[];
    pointsPerDollar: number;
}

export interface LoyaltyTier {
    tierName: string;
    pointThreshold: number;
    benefits: string[];
}

export interface LoyaltyChallenge {
    id: string;
    name: string;
    description: string;
    targetValue: number;
    unit: string;
    status: 'active' | 'inactive';
}

export interface LoyaltyChallengeProgress {
    challengeId: string;
    currentValue: number;
}

export interface LoyaltyProgram {
    id: string;
    name: string;
    description: string;
    startDate: Date;
    endDate?: Date;
    isActive: boolean;
    rules: any; // You might want to define a more specific type for rules
}

export interface LoyaltyAnalytics {
    date: Date;
    totalPointsEarned: number;
    totalPointsRedeemed: number;
    activeUsers: number;
    newEnrollments: number;
}

export interface LoyaltyIntegration {
    id: string;
    clientId: string;
    integrationType: 'pos' | 'crm' | 'email' | 'sms' | 'other';
    integrationName: string;
    config: any; // You might want to define a more specific type for config
    isActive: boolean;
    lastSyncDate?: Date;
}

export interface LoyaltyTransaction {
    id: string;
    userId: string;
    programId: string;
    orderId?: string;
    points: number;
    type: 'earn' | 'redeem' | 'expire' | 'adjust';
    description?: string;
    balance: number;
    date: Date;
}

export interface LoyaltySubscription {
    id: string;
    userId: string;
    programId: string;
    startDate: Date;
    endDate?: Date;
    status: 'active' | 'paused' | 'cancelled';
    currentPoints: number;
    currentTier?: string;
}

export interface LoyaltyChallengeReward {
    challengeId: string;
    rewardId: string;
    quantity: number;
}

export interface LoyaltyWallet {
    id: string;
    guestId: string;
    points: number;
    tier: string;
    rewards: LoyaltyReward[];
}