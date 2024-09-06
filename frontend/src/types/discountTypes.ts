export interface Discount {
    id: string;
    name: string;
    description: string;
    discountType: 'percentage' | 'fixed';
    value: number;
    code: string;
    startDate: string;
    endDate: string;
    isActive: boolean;
    minimumOrderValue?: number;
    maximumDiscountAmount?: number;
    usageLimit?: number;
    usageCount: number;
    applicableItems?: string[]; // IDs of items or categories this discount applies to
    clientId: string;
    locationId?: string; // Optional, if the discount is location-specific
}