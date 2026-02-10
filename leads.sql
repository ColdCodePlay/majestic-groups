-- Create Leads Table
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  business_name TEXT,
  location TEXT,
  plan TEXT,
  price TEXT,
  status TEXT DEFAULT 'New',
  source TEXT DEFAULT 'Website',
  comments JSONB DEFAULT '[]'::jsonb,
  items TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Policy: Public can insert (Submit Form)
CREATE POLICY "Public can insert leads" ON leads
  FOR INSERT WITH CHECK (true);

-- Policy: Admins can view all leads
CREATE POLICY "Admins can view leads" ON leads
  FOR SELECT USING (auth.role() = 'authenticated');

-- Policy: Admins can update leads
CREATE POLICY "Admins can update leads" ON leads
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Policy: Admins can delete leads
CREATE POLICY "Admins can delete leads" ON leads
  FOR DELETE USING (auth.role() = 'authenticated');
