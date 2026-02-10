-- Add new columns to the existing leads table safely
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'Website',
ADD COLUMN IF NOT EXISTS comments JSONB DEFAULT '[]'::jsonb;
