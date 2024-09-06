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
    locationId?: string;
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