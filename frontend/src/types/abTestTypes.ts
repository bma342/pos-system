export interface ABTest {
    id: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    status: ABTestStatus;
    variations: ABTestVariation[];
    metrics: ABTestMetric[];
    results?: ABTestResults;
    clientId: number;
    createdAt: string;
    updatedAt: string;
  }
  
  export enum ABTestStatus {
    DRAFT = 'DRAFT',
    RUNNING = 'RUNNING',
    PAUSED = 'PAUSED',
    COMPLETED = 'COMPLETED',
    ARCHIVED = 'ARCHIVED'
  }
  
  export interface ABTestVariation {
    id: string;
    name: string;
    description: string;
    isControl: boolean;
    config: Record<string, any>; // Configuration specific to this variation
  }
  
  export interface ABTestMetric {
    id: string;
    name: string;
    description: string;
    type: ABTestMetricType;
    goal: ABTestMetricGoal;
  }
  
  export enum ABTestMetricType {
    CONVERSION = 'CONVERSION',
    REVENUE = 'REVENUE',
    ENGAGEMENT = 'ENGAGEMENT',
    CUSTOM = 'CUSTOM'
  }
  
  export enum ABTestMetricGoal {
    INCREASE = 'INCREASE',
    DECREASE = 'DECREASE'
  }
  
  export interface ABTestResults {
    variationResults: ABTestVariationResult[];
    winner?: string; // ID of the winning variation
    confidenceLevel: number;
    reportUrl?: string;
  }
  
  export interface ABTestVariationResult {
    variationId: string;
    metrics: Record<string, number>; // Metric ID to value mapping
    sampleSize: number;
    conversionRate?: number;
  }
  
  export interface CreateABTestInput {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    variations: Omit<ABTestVariation, 'id'>[];
    metrics: Omit<ABTestMetric, 'id'>[];
    clientId: number;
  }
  
  export interface UpdateABTestInput {
    id: string;
    name?: string;
    description?: string;
    startDate?: string;
    endDate?: string;
    status?: ABTestStatus;
    variations?: Omit<ABTestVariation, 'id'>[];
    metrics?: Omit<ABTestMetric, 'id'>[];
  }