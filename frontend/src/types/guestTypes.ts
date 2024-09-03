export interface Guest {
    id: string;
    name: string;
    email: string;
    phone?: string;
    lastVisit?: Date;
    visitCount: number;
    preferences?: string[];
  }