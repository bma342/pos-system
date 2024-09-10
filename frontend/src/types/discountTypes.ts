export interface Discount {
    id: string;
    name: string;
    description: string;
    discountType: 'percentage' | 'fixed' | 'bogo';
    type: 'percentage' | 'fixed' | 'bogo'; // Add this line
    value: number;
    expirationDate: string;
    locationId: string; // Changed to string to match with other IDs
    conditions: Record<string, any>;
    startDate: string;
    endDate: string;
    isActive: boolean;
    minimumOrderValue?: number;
    maximumDiscountAmount?: number;
    usageLimit?: number;
    usageCount: number;
    applicableItems?: string[]; // IDs of items or categories this discount applies to
    clientId: string;
    posProfileId?: string; // ID of the POS profile for syncing
}

export interface DiscountCreateData extends Omit<Discount, 'id' | 'usageCount'> {}

export interface DiscountUpdateData extends Partial<Omit<Discount, 'id' | 'clientId'>> {}

export interface DiscountFilterOptions {
    clientId?: string;
    locationId?: string;
    isActive?: boolean;
    discountType?: 'percentage' | 'fixed' | 'bogo';
    startDate?: string;
    endDate?: string;
}