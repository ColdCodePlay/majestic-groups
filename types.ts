
export interface Service {
  id: string;
  name: string;
  description: string;
  category: ServiceCategory;
  features: string[];
}

export enum ServiceCategory {
  BUSINESS_REGISTRATION = 'Business Registration',
  TAX_ACCOUNTING = 'Tax & Accounting',
  LEGAL_COMPLIANCE = 'Legal & Compliance',
  INTELLECTUAL_PROPERTY = 'Intellectual Property',
  LICENSES_GOVT = 'Licenses & Registrations',
  STARTUP_SUPPORT = 'Startup & SME Support'
}

export interface ComponentProps {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface DetailedService {
  name: string;
  features: string[];
  startingPrice?: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  subtitle?: string;
  features: string[];
  recommended?: boolean;
}

export interface ServiceGroup {
  category: ServiceCategory;
  description: string;
  services: DetailedService[];
}

export type LeadStatus = 'New' | 'Contacted' | 'In Progress' | 'Converted' | 'Lost';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessName?: string;
  location: string;
  plan: string;
  price: string;
  status: LeadStatus;
  timestamp: string;
  items?: string[];
}

