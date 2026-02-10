-- Insert Business Registration
DO $$
DECLARE
  cat_id uuid;
BEGIN
  INSERT INTO categories (name, description) VALUES ('Business Registration', 'Legal structuring for your new venture.')
  ON CONFLICT (name) DO UPDATE SET description = EXCLUDED.description
  RETURNING id INTO cat_id;

  INSERT INTO services (category_id, name, starting_price, features) VALUES
  (cat_id, 'Private Limited Company', '₹1,999', ARRAY['Name Approval (RUN)', 'DSC & DIN Generation', 'MOA & AOA Drafting', 'Certificate of Incorporation']),
  (cat_id, 'One Person Company (OPC)', '₹1,999', ARRAY['Single Director Support', 'Limited Liability Protection', 'Nominee Registration', 'Easy Compliance']),
  (cat_id, 'Limited Liability Partnership (LLP)', '₹2,499', ARRAY['Partnership Deed Drafting', 'Low Compliance Cost', 'No Minimum Capital', 'Asset Protection']),
  (cat_id, 'Partnership Firm', '₹999', ARRAY['Deed Notarization', 'PAN & TAN Processing', 'Bank Account Opening', 'Fast Processing']),
  (cat_id, 'Sole Proprietorship', '₹499', ARRAY['Quick Setup', 'Full Control', 'MSME Registration', 'GST Integration']),
  (cat_id, 'Section 8 (NGO)', '₹7,999', ARRAY['Non-Profit Status', 'Tax Exemptions (12A/80G)', 'Trust Building', 'Foreign Funding Eligibility']),
  (cat_id, 'Producer Company', '₹9,999', ARRAY['Farmer Group Support', 'Better Market Access', 'Financial Assistance', 'Direct Membership']),
  (cat_id, 'Public Limited Company', '₹14,999', ARRAY['Stock Exchange Ready', 'Large Capital Raising', 'High Credibility', 'Unlimited Shareholders']);
END $$;

-- Insert Tax & Accounting
DO $$
DECLARE
  cat_id uuid;
BEGIN
  INSERT INTO categories (name, description) VALUES ('Tax & Accounting', 'Stay compliant with financial reporting.')
  ON CONFLICT (name) DO UPDATE SET description = EXCLUDED.description
  RETURNING id INTO cat_id;

  INSERT INTO services (category_id, name, starting_price, features) VALUES
  (cat_id, 'GST Registration', '₹499', ARRAY['Certificate in 5 Days', 'HSN/SAC Code Support', 'LUT Filing', 'Registration Guidance']),
  (cat_id, 'GST Return Filing', '₹999', ARRAY['Monthly/Quarterly GSTR', 'ITC Reconciliation', 'Late Fee Waiver Advice', 'Annual Filing (GSTR-9)']),
  (cat_id, 'Income Tax Return (ITR)', '₹499', ARRAY['Tax Saving Advice', 'Audit Support', 'Rectification Filing', 'E-Verification']),
  (cat_id, 'TDS Return Filing', '₹999', ARRAY['Form 24Q/26Q', 'TDS Refund Tracking', 'Challan Generation', 'Interest Calculation']),
  (cat_id, 'Accounting & Bookkeeping', '₹2,499', ARRAY['Tally/Zoho Setup', 'P&L Statements', 'Balance Sheet Prep', 'Bank Reconciliation']),
  (cat_id, 'Payroll Services', '₹1,999', ARRAY['Payslip Generation', 'PF/ESI Management', 'Salary Disbursement', 'Compliance Audits']);
END $$;

-- Insert Legal & Compliance
DO $$
DECLARE
  cat_id uuid;
BEGIN
  INSERT INTO categories (name, description) VALUES ('Legal & Compliance', 'Protect your legal status effortlessly.')
  ON CONFLICT (name) DO UPDATE SET description = EXCLUDED.description
  RETURNING id INTO cat_id;

  INSERT INTO services (category_id, name, starting_price, features) VALUES
  (cat_id, 'Company Annual Compliance', '₹9,999', ARRAY['AOC-4 & MGT-7 Filing', 'Board Meeting Minutes', 'Audit Coordination', 'Statutory Registers']),
  (cat_id, 'LLP Annual Compliance', '₹4,999', ARRAY['Form 8 & Form 11', 'DP KYC Processing', 'Agreement Updates', 'Solvency Reporting']),
  (cat_id, 'Director KYC (DIR-3)', '₹999', ARRAY['Annual E-KYC', 'DIN Restoration', 'Contact Verification', 'MCA Portal Update']),
  (cat_id, 'ROC Filings', '₹1,499', ARRAY['Share Transfer', 'Address Change', 'Increase Capital', 'Charge Management']),
  (cat_id, 'Director Appointment/Resignation', '₹1,999', ARRAY['Form DIR-12', 'Board Resolutions', 'Resignation Letters', 'Consent Documents']),
  (cat_id, 'Company Closure', '₹12,499', ARRAY['STK-2 Filing', 'Indemnity Bond', 'Solvency Statement', 'Fast Track Exit']);
END $$;

-- Insert Intellectual Property
DO $$
DECLARE
  cat_id uuid;
BEGIN
  INSERT INTO categories (name, description) VALUES ('Intellectual Property', 'Secure your brand and innovation.')
  ON CONFLICT (name) DO UPDATE SET description = EXCLUDED.description
  RETURNING id INTO cat_id;

  INSERT INTO services (category_id, name, starting_price, features) VALUES
  (cat_id, 'Trademark Registration', '₹1,499', ARRAY['Comprehensive Search', 'Class Selection', 'Application Filing', 'Hearing Support']),
  (cat_id, 'Copyright Registration', '₹2,999', ARRAY['Work Protection', 'Infringement Support', 'Licensing Advice', 'Artistic/Literary']),
  (cat_id, 'Patent Filing', '₹19,999', ARRAY['Novelty Search', 'Drafting Claims', 'Provisional Filing', 'Filing Request']),
  (cat_id, 'Design Registration', '₹4,999', ARRAY['Visual Protection', 'Formality Check', 'Examination Support', 'Exclusive Rights']),
  (cat_id, 'Trademark Renewal', '₹2,499', ARRAY['Timely Filing', 'Status Monitoring', 'Certificate Issuance', 'Protection Extension']);
END $$;

-- Insert Licenses & Registrations
DO $$
DECLARE
  cat_id uuid;
BEGIN
  INSERT INTO categories (name, description) VALUES ('Licenses & Registrations', 'Mandatory government registrations and operational licenses.')
  ON CONFLICT (name) DO UPDATE SET description = EXCLUDED.description
  RETURNING id INTO cat_id;

  INSERT INTO services (category_id, name, starting_price, features) VALUES
  (cat_id, 'GST License', '₹499', ARRAY['State-wise Registration', 'HSN Selection Advice', 'Business ID Verification', 'Filing Readiness']),
  (cat_id, 'FSSAI License', '₹1,499', ARRAY['Basic/State/Central support', 'Food Safety Compliance', 'Labeling Guidance', 'Annual Returns']),
  (cat_id, 'Trade License', '₹2,999', ARRAY['Local Municipal Approval', 'Business Specific Compliance', 'Renewal Alerts', 'Legal Status']),
  (cat_id, 'Shop & Establishment Registration', '₹1,999', ARRAY['Employee Benefit Compliance', 'Working Hour Records', 'Holiday Lists', 'Local Labor Law Support']),
  (cat_id, 'Import Export Code (IEC)', '₹1,499', ARRAY['DGFT Online Processing', 'Global Trade Gateway', 'No Expiry Registration', 'Bank Account Linking']),
  (cat_id, 'MSME / Udyam Registration', '₹0', ARRAY['Government Subsidies', 'Priority Sector Lending', 'Credit Linked Subsidies', 'Portal Verification']),
  (cat_id, 'PF Registration', '₹2,499', ARRAY['Social Security Setup', 'Employee Welfare', 'EPFO Portal Support', 'Monthly Compliance']),
  (cat_id, 'ESI Registration', '₹2,499', ARRAY['Medical Insurance Access', 'Sickness Benefits', 'Maternity Benefit Support', 'Employee Health Safety']),
  (cat_id, 'ISO Certification', '₹4,999', ARRAY['Quality Management Systems', '9001:2015 Standards', 'Internal Audit Support', 'Global Market Ready']),
  (cat_id, 'Professional Tax Registration', '₹1,999', ARRAY['State-specific Compliance', 'Payroll Deduction Setup', 'Annual Return Support', 'Legal Deduction Evidence']);
END $$;

-- Insert Startup & SME Support
DO $$
DECLARE
  cat_id uuid;
BEGIN
  INSERT INTO categories (name, description) VALUES ('Startup & SME Support', 'Accelerate your startup journey with specialized growth services.')
  ON CONFLICT (name) DO UPDATE SET description = EXCLUDED.description
  RETURNING id INTO cat_id;

  INSERT INTO services (category_id, name, starting_price, features) VALUES
  (cat_id, 'Startup India Registration', '₹2,999', ARRAY['DPIIT Recognition', 'Self-Certification Rights', 'Fast-track Patent Support', 'Tax Holidays Eligibility']),
  (cat_id, 'Business Plan Preparation', '₹4,999', ARRAY['Market Research Data', 'Strategic Roadmap', 'Executive Summary', 'SWOT Analysis']),
  (cat_id, 'Pitch Deck Creation', '₹7,499', ARRAY['Investor-Ready Design', 'Visual Storytelling', 'Financial Modeling', 'Competitive Analysis']),
  (cat_id, 'Virtual Office Services', '₹999', ARRAY['Premium Address', 'Mail Handling', 'Communication Support', 'Cost Effective']),
  (cat_id, 'Advisory & Consultation', '₹1,499', ARRAY['One-on-One CA/CS Call', 'Funding Strategy', 'Expansion Planning', 'Compliance Roadmap']);
END $$;

-- Insert NGO Registration
DO $$
DECLARE
  cat_id uuid;
BEGIN
  INSERT INTO categories (name, description) VALUES ('NGO Registration', 'Establish your non-profit entity with legal recognition.')
  ON CONFLICT (name) DO UPDATE SET description = EXCLUDED.description
  RETURNING id INTO cat_id;

  INSERT INTO services (category_id, name, starting_price, features) VALUES
  (cat_id, 'Sec-08 Co', '₹7,999', ARRAY['License under Sec 8', 'DSC & DIN', 'MoA & AoA', 'Incorporation Certificate']),
  (cat_id, 'Trust Registration', '₹14,999', ARRAY['Drafting Trust Deed', 'Registration with Sub-Registrar', 'PAN Application', 'Bank Account Support']),
  (cat_id, 'Society Registration', '₹12,999', ARRAY['Drafting Bye-laws', 'Memorandum of Association', 'Registration Certificate', 'Election Rules']);
END $$;

-- Insert Udhyam Registration
DO $$
DECLARE
  cat_id uuid;
BEGIN
  INSERT INTO categories (name, description) VALUES ('Udhyam Registration', 'Government benefits for small and medium enterprises.')
  ON CONFLICT (name) DO UPDATE SET description = EXCLUDED.description
  RETURNING id INTO cat_id;

  INSERT INTO services (category_id, name, starting_price, features) VALUES
  (cat_id, 'MSME Registration', '₹0', ARRAY['Udyam Registration Number', 'Priority Sector Lending', 'Subsidies Eligibility', 'Paperless Process']),
  (cat_id, 'NSIC Registration', '₹4,999', ARRAY['Govt Procurement Preference', 'Credit Facilitation', 'Marketing Assistance', 'Raw Material Support']),
  (cat_id, 'GEM Registration', '₹2,499', ARRAY['Govt E-Marketplace Seller', 'Direct Access to Govt Departments', 'Bid Participation', 'Vendor Assessment']);
END $$;

-- Insert Startup Registration
DO $$
DECLARE
  cat_id uuid;
BEGIN
  INSERT INTO categories (name, description) VALUES ('Startup Registration', 'Launch and scale your startup with government incentives.')
  ON CONFLICT (name) DO UPDATE SET description = EXCLUDED.description
  RETURNING id INTO cat_id;

  INSERT INTO services (category_id, name, starting_price, features) VALUES
  (cat_id, 'Startup India (Make in India)', '₹2,999', ARRAY['DPIIT Recognition', 'Tax Holidays', 'Self-Certification', 'Public Procurement Norms']),
  (cat_id, 'ESIC & EPF Registration', '₹3,499', ARRAY['Employee State Insurance', 'Provident Fund Setup', 'Social Security Compliance', 'Portal Access']),
  (cat_id, 'FSSAI License (State & Central)', '₹2,999', ARRAY['Food Business License', 'State/Central Categorization', 'Hygiene Rating', 'Compliance Audit']),
  (cat_id, 'FASSI Reg & State LIC', '₹3,999', ARRAY['Manufacturer/Supplier Lic', 'State Authority Filing', 'Food Safety Mgmt System', 'Labeling Compliance']);
END $$;
