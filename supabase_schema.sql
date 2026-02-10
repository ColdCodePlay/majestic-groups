-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  starting_price TEXT, -- Storing as text to support "Free" or ranges easily, or use NUMERIC if strict
  features TEXT[] DEFAULT '{}', -- Array of feature strings
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Create policies (modify as needed for admin access vs public read)
-- Allow public read access
CREATE POLICY "Public categories are viewable by everyone" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Public services are viewable by everyone" ON services
  FOR SELECT USING (true);

-- Allow authenticated users (admins) to insert/update/delete
CREATE POLICY "Admins can insert categories" ON categories
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admins can update categories" ON categories
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can delete categories" ON categories
  FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can insert services" ON services
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admins can update services" ON services
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can delete services" ON services
  FOR DELETE USING (auth.role() = 'authenticated');
