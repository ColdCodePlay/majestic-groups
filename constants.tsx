
import React from 'react';
import {
  Building2,
  Calculator,
  Gavel,
  ShieldCheck,
  FileText,
  Rocket,
  CheckCircle2,
  HeartHandshake,
  Award,
  Lightbulb
} from 'lucide-react';
import { ServiceCategory, ServiceGroup, PricingPlan } from './types';

export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    category: ServiceCategory.BUSINESS_REGISTRATION,
    description: "Legal structuring for your new venture.",
    services: [
      { name: "Private Limited Company", startingPrice: "₹1,999", features: ["Name Approval (RUN)", "DSC & DIN Generation", "MOA & AOA Drafting", "Certificate of Incorporation"] },
      { name: "One Person Company (OPC)", startingPrice: "₹1,999", features: ["Single Director Support", "Limited Liability Protection", "Nominee Registration", "Easy Compliance"] },
      { name: "Limited Liability Partnership (LLP)", startingPrice: "₹2,499", features: ["Partnership Deed Drafting", "Low Compliance Cost", "No Minimum Capital", "Asset Protection"] },
      { name: "Partnership Firm", startingPrice: "₹999", features: ["Deed Notarization", "PAN & TAN Processing", "Bank Account Opening", "Fast Processing"] },
      { name: "Sole Proprietorship", startingPrice: "₹499", features: ["Quick Setup", "Full Control", "MSME Registration", "GST Integration"] },
      { name: "Section 8 (NGO)", startingPrice: "₹7,999", features: ["Non-Profit Status", "Tax Exemptions (12A/80G)", "Trust Building", "Foreign Funding Eligibility"] },
      { name: "Producer Company", startingPrice: "₹9,999", features: ["Farmer Group Support", "Better Market Access", "Financial Assistance", "Direct Membership"] },
      { name: "Public Limited Company", startingPrice: "₹14,999", features: ["Stock Exchange Ready", "Large Capital Raising", "High Credibility", "Unlimited Shareholders"] }
    ]
  },
  {
    category: ServiceCategory.TAX_ACCOUNTING,
    description: "Stay compliant with financial reporting.",
    services: [
      { name: "GST Registration", startingPrice: "₹499", features: ["Certificate in 5 Days", "HSN/SAC Code Support", "LUT Filing", "Registration Guidance"] },
      { name: "GST Return Filing", startingPrice: "₹999", features: ["Monthly/Quarterly GSTR", "ITC Reconciliation", "Late Fee Waiver Advice", "Annual Filing (GSTR-9)"] },
      { name: "Income Tax Return (ITR)", startingPrice: "₹499", features: ["Tax Saving Advice", "Audit Support", "Rectification Filing", "E-Verification"] },
      { name: "TDS Return Filing", startingPrice: "₹999", features: ["Form 24Q/26Q", "TDS Refund Tracking", "Challan Generation", "Interest Calculation"] },
      { name: "Accounting & Bookkeeping", startingPrice: "₹2,499", features: ["Tally/Zoho Setup", "P&L Statements", "Balance Sheet Prep", "Bank Reconciliation"] },
      { name: "Payroll Services", startingPrice: "₹1,999", features: ["Payslip Generation", "PF/ESI Management", "Salary Disbursement", "Compliance Audits"] }
    ]
  },
  {
    category: ServiceCategory.LEGAL_COMPLIANCE,
    description: "Protect your legal status effortlessly.",
    services: [
      { name: "Company Annual Compliance", startingPrice: "₹9,999", features: ["AOC-4 & MGT-7 Filing", "Board Meeting Minutes", "Audit Coordination", "Statutory Registers"] },
      { name: "LLP Annual Compliance", startingPrice: "₹4,999", features: ["Form 8 & Form 11", "DP KYC Processing", "Agreement Updates", "Solvency Reporting"] },
      { name: "Director KYC (DIR-3)", startingPrice: "₹999", features: ["Annual E-KYC", "DIN Restoration", "Contact Verification", "MCA Portal Update"] },
      { name: "ROC Filings", startingPrice: "₹1,499", features: ["Share Transfer", "Address Change", "Increase Capital", "Charge Management"] },
      { name: "Director Appointment/Resignation", startingPrice: "₹1,999", features: ["Form DIR-12", "Board Resolutions", "Resignation Letters", "Consent Documents"] },
      { name: "Company Closure", startingPrice: "₹12,499", features: ["STK-2 Filing", "Indemnity Bond", "Solvency Statement", "Fast Track Exit"] }
    ]
  },
  {
    category: ServiceCategory.INTELLECTUAL_PROPERTY,
    description: "Secure your brand and innovation.",
    services: [
      { name: "Trademark Registration", startingPrice: "₹1,499", features: ["Comprehensive Search", "Class Selection", "Application Filing", "Hearing Support"] },
      { name: "Copyright Registration", startingPrice: "₹2,999", features: ["Work Protection", "Infringement Support", "Licensing Advice", "Artistic/Literary"] },
      { name: "Patent Filing", startingPrice: "₹19,999", features: ["Novelty Search", "Drafting Claims", "Provisional Filing", "Filing Request"] },
      { name: "Design Registration", startingPrice: "₹4,999", features: ["Visual Protection", "Formality Check", "Examination Support", "Exclusive Rights"] },
      { name: "Trademark Renewal", startingPrice: "₹2,499", features: ["Timely Filing", "Status Monitoring", "Certificate Issuance", "Protection Extension"] }
    ]
  },
  {
    category: ServiceCategory.LICENSES_GOVT,
    description: "Mandatory government registrations and operational licenses.",
    services: [
      { name: "GST License", startingPrice: "₹499", features: ["State-wise Registration", "HSN Selection Advice", "Business ID Verification", "Filing Readiness"] },
      { name: "FSSAI License", startingPrice: "₹1,499", features: ["Basic/State/Central support", "Food Safety Compliance", "Labeling Guidance", "Annual Returns"] },
      { name: "Trade License", startingPrice: "₹2,999", features: ["Local Municipal Approval", "Business Specific Compliance", "Renewal Alerts", "Legal Status"] },
      { name: "Shop & Establishment Registration", startingPrice: "₹1,999", features: ["Employee Benefit Compliance", "Working Hour Records", "Holiday Lists", "Local Labor Law Support"] },
      { name: "Import Export Code (IEC)", startingPrice: "₹1,499", features: ["DGFT Online Processing", "Global Trade Gateway", "No Expiry Registration", "Bank Account Linking"] },
      { name: "MSME / Udyam Registration", startingPrice: "₹0", features: ["Government Subsidies", "Priority Sector Lending", "Credit Linked Subsidies", "Portal Verification"] },
      { name: "PF Registration", startingPrice: "₹2,499", features: ["Social Security Setup", "Employee Welfare", "EPFO Portal Support", "Monthly Compliance"] },
      { name: "ESI Registration", startingPrice: "₹2,499", features: ["Medical Insurance Access", "Sickness Benefits", "Maternity Benefit Support", "Employee Health Safety"] },
      { name: "ISO Certification", startingPrice: "₹4,999", features: ["Quality Management Systems", "9001:2015 Standards", "Internal Audit Support", "Global Market Ready"] },
      { name: "Professional Tax Registration", startingPrice: "₹1,999", features: ["State-specific Compliance", "Payroll Deduction Setup", "Annual Return Support", "Legal Deduction Evidence"] }
    ]
  },
  {
    category: ServiceCategory.STARTUP_SUPPORT,
    description: "Accelerate your startup journey with specialized growth services.",
    services: [
      { name: "Startup India Registration", startingPrice: "₹2,999", features: ["DPIIT Recognition", "Self-Certification Rights", "Fast-track Patent Support", "Tax Holidays Eligibility"] },
      { name: "Business Plan Preparation", startingPrice: "₹4,999", features: ["Market Research Data", "Strategic Roadmap", "Executive Summary", "SWOT Analysis"] },
      { name: "Pitch Deck Creation", startingPrice: "₹7,499", features: ["Investor-Ready Design", "Visual Storytelling", "Financial Modeling", "Competitive Analysis"] },
      { name: "Virtual Office Services", startingPrice: "₹999", features: ["Premium Address", "Mail Handling", "Communication Support", "Cost Effective"] },
      { name: "Advisory & Consultation", startingPrice: "₹1,499", features: ["One-on-One CA/CS Call", "Funding Strategy", "Expansion Planning", "Compliance Roadmap"] }
    ]
  },
  {
    category: ServiceCategory.NGO_REGISTRATION,
    description: "Establish your non-profit entity with legal recognition.",
    services: [
      { name: "Sec-08 Co", startingPrice: "₹7,999", features: ["License under Sec 8", "DSC & DIN", "MoA & AoA", "Incorporation Certificate"] },
      { name: "Trust Registration", startingPrice: "₹14,999", features: ["Drafting Trust Deed", "Registration with Sub-Registrar", "PAN Application", "Bank Account Support"] },
      { name: "Society Registration", startingPrice: "₹12,999", features: ["Drafting Bye-laws", "Memorandum of Association", "Registration Certificate", "Election Rules"] }
    ]
  },
  {
    category: ServiceCategory.UDHYAM_REGISTRATION,
    description: "Government benefits for small and medium enterprises.",
    services: [
      { name: "MSME Registration", startingPrice: "₹0", features: ["Udyam Registration Number", "Priority Sector Lending", "Subsidies Eligibility", "Paperless Process"] },
      { name: "NSIC Registration", startingPrice: "₹4,999", features: ["Govt Procurement Preference", "Credit Facilitation", "Marketing Assistance", "Raw Material Support"] },
      { name: "GEM Registration", startingPrice: "₹2,499", features: ["Govt E-Marketplace Seller", "Direct Access to Govt Departments", "Bid Participation", "Vendor Assessment"] }
    ]
  },
  {
    category: ServiceCategory.STARTUP_REGISTRATION,
    description: "Launch and scale your startup with government incentives.",
    services: [
      { name: "Startup India (Make in India)", startingPrice: "₹2,999", features: ["DPIIT Recognition", "Tax Holidays", "Self-Certification", "Public Procurement Norms"] },
      { name: "ESIC & EPF Registration", startingPrice: "₹3,499", features: ["Employee State Insurance", "Provident Fund Setup", "Social Security Compliance", "Portal Access"] },
      { name: "FSSAI License (State & Central)", startingPrice: "₹2,999", features: ["Food Business License", "State/Central Categorization", "Hygiene Rating", "Compliance Audit"] },
      { name: "FASSI Reg & State LIC", startingPrice: "₹3,999", features: ["Manufacturer/Supplier Lic", "State Authority Filing", "Food Safety Mgmt System", "Labeling Compliance"] }
    ]
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Basic",
    price: "₹1,999",
    subtitle: "+ Govt Fees",
    features: [
      "Name Approval",
      "Incorporation Filing",
      "Standard DSC",
      "Email Support",
      "Basic Documentation"
    ]
  },
  {
    name: "Standard",
    price: "₹4,999",
    subtitle: "+ Govt Fees",
    recommended: true,
    features: [
      "Everything in Basic",
      "PAN & TAN Registration",
      "GST Registration",
      "MSME / Udyam Reg",
      "Priority Expert Support"
    ]
  },
  {
    name: "Premium",
    price: "₹9,999",
    subtitle: "All Inclusive*",
    features: [
      "Everything in Standard",
      "1 Year Basic Compliance",
      "Trademark Filing (1 Class)",
      "Startup India Registration",
      "Dedicated Account Manager"
    ]
  }
];

export const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  [ServiceCategory.BUSINESS_REGISTRATION]: <Building2 className="w-6 h-6" />,
  [ServiceCategory.TAX_ACCOUNTING]: <Calculator className="w-6 h-6" />,
  [ServiceCategory.LEGAL_COMPLIANCE]: <Gavel className="w-6 h-6" />,
  [ServiceCategory.INTELLECTUAL_PROPERTY]: <ShieldCheck className="w-6 h-6" />,
  [ServiceCategory.LICENSES_GOVT]: <FileText className="w-6 h-6" />,
  [ServiceCategory.STARTUP_SUPPORT]: <Rocket className="w-6 h-6" />,
  [ServiceCategory.NGO_REGISTRATION]: <HeartHandshake className="w-6 h-6" />,
  [ServiceCategory.UDHYAM_REGISTRATION]: <Award className="w-6 h-6" />,
  [ServiceCategory.STARTUP_REGISTRATION]: <Lightbulb className="w-6 h-6" />,
};

export const TESTIMONIALS = [
  {
    id: 1,
    content: "Majestic Group made our company incorporation incredibly smooth. Their team of experts handled everything from DSC to PAN/TAN while keeping us updated at every step. Truly the best in India.",
    author: "Aditya Verma",
    role: "CEO, TechFlow Solutions",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&q=80&w=100&h=100",
    rating: 5
  },
  {
    id: 2,
    content: "The GST registration was fast and hassle-free. What I loved most was the transparent pricing—no hidden charges at all. Highly recommended for any new entrepreneur.",
    author: "Priya Sharma",
    role: "Founder, GreenGrid E-com",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&q=80&w=100&h=100",
    rating: 5
  },
  {
    id: 3,
    content: "We've been using their compliance services for 2 years now. Their automated alerts and dedicated account managers ensure we never miss a deadline. A game-changer for our legal operations.",
    author: "Rahul Nair",
    role: "Director, ZetaPay Fintech",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=crop&q=80&w=100&h=100",
    rating: 5
  },
  {
    id: 4,
    content: "Trademarking our brand seemed daunting until we found Majestic Group. Their exhaustive search and filing support were top-notch. Our brand is now legally secure.",
    author: "Sneha Kapur",
    role: "CEO, Bloom Organic",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?fit=crop&q=80&w=100&h=100",
    rating: 5
  }
];

export const COMPANY_LOGOS = [
  // { name: "Alka Laboratories", logoUrl: "/logos/alka.png", color: "text-blue-800" }, // File not found in directory
  // Batch Uploaded Logos
  { name: "Partner 1", logoUrl: "/logos/1.png", color: "text-slate-600" },
  { name: "Partner 2", logoUrl: "/logos/2.png", color: "text-slate-600" },
  { name: "Partner 3", logoUrl: "/logos/3.png", color: "text-slate-600" },
  { name: "Partner 4", logoUrl: "/logos/4.png", color: "text-slate-600" },
  { name: "Partner 5", logoUrl: "/logos/5.png", color: "text-slate-600" },
  { name: "Partner 6", logoUrl: "/logos/6.png", color: "text-slate-600" },
  { name: "Partner 7", logoUrl: "/logos/7.png", color: "text-slate-600" },
  { name: "Partner 8", logoUrl: "/logos/8.png", color: "text-slate-600" },
  { name: "Partner 9", logoUrl: "/logos/9.png", color: "text-slate-600" },
  { name: "Partner 10", logoUrl: "/logos/10.png", color: "text-slate-600" },
  { name: "Partner 11", logoUrl: "/logos/11.png", color: "text-slate-600" },
  { name: "Partner 12", logoUrl: "/logos/12.png", color: "text-slate-600" },
  { name: "Partner 13", logoUrl: "/logos/13.png", color: "text-slate-600" },
  { name: "Partner 14", logoUrl: "/logos/14.png", color: "text-slate-600" },
  { name: "Partner 15", logoUrl: "/logos/15.png", color: "text-slate-600" },
  { name: "Partner 16", logoUrl: "/logos/16.png", color: "text-slate-600" },
  { name: "Partner 17", logoUrl: "/logos/17.png", color: "text-slate-600" },
  { name: "Partner 18", logoUrl: "/logos/18.png", color: "text-slate-600" },
  { name: "Partner 19", logoUrl: "/logos/19.png", color: "text-slate-600" },
  { name: "Partner 20", logoUrl: "/logos/20.png", color: "text-slate-600" },
  { name: "Partner 21", logoUrl: "/logos/21.png", color: "text-slate-600" },
  { name: "Partner 22", logoUrl: "/logos/22.png", color: "text-slate-600" },
  { name: "Partner 23", logoUrl: "/logos/23.png", color: "text-slate-600" },
];

export const CALCULATOR_COMPONENTS = [
  { id: 'pvt', name: 'Private Limited Inc.', price: 1999, description: 'Core company registration professional fee.' },
  { id: 'gst', name: 'GST Registration', price: 499, description: 'Complete GST registration and certificate.' },
  { id: 'trademark', name: 'Trademark Filing', price: 1499, description: 'Per class professional filing fee.' },
  { id: 'msme', name: 'MSME Registration', price: 0, description: 'Government Udyam registration support.' },
  { id: 'iec', name: 'Import Export Code', price: 1499, description: 'DGFT lifetime registration.' },
  { id: 'pt', name: 'Professional Tax', price: 1999, description: 'State-specific labor law compliance.' },
];
