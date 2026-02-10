-- 1. Create Profiles Table (if not exists)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'agent' CHECK (role IN ('admin', 'agent')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable RLS on Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. Profiles Policies
-- Public/Auth can view their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can update all profiles
CREATE POLICY "Admins can update all profiles" ON public.profiles
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can insert profiles (for pre-creating agents)
CREATE POLICY "Admins can insert profiles" ON public.profiles
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );
  
-- Admins can delete profiles
CREATE POLICY "Admins can delete profiles" ON public.profiles
  FOR DELETE USING (
     EXISTS (
      SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 4. Trigger to handle new user signup (updates profile if pre-created, else inserts)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role, full_name)
  VALUES (new.id, new.email, 'agent', new.raw_user_meta_data->>'full_name')
  ON CONFLICT (email) DO UPDATE
  SET id = new.id, -- Link the auth.id to the pre-created profile
      full_name = COALESCE(public.profiles.full_name, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists to avoid duplication errors on re-run
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 5. Update Leads Table
ALTER TABLE public.leads 
ADD COLUMN IF NOT EXISTS assigned_to UUID REFERENCES public.profiles(id);

-- 6. Update Leads RLS Policies (Drop existing first to be safe, or create new ones)
-- We need to drop old policies to enforce the new strict rules
DROP POLICY IF EXISTS "Admins can view leads" ON public.leads;
DROP POLICY IF EXISTS "Admins can update leads" ON public.leads;
DROP POLICY IF EXISTS "Admins can delete leads" ON public.leads;
-- Drop the generic "Public can insert" if it conflicts? No, public insert is fine for landing page.

-- NEW Leads Policies

-- Admin: Full Access
CREATE POLICY "Admins full access leads" ON public.leads
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Agent: View Assigned Only
CREATE POLICY "Agents view assigned leads" ON public.leads
  FOR SELECT USING (
    auth.uid() = assigned_to
  );

-- Agent: Update Assigned Only (Status/Comments)
CREATE POLICY "Agents update assigned leads" ON public.leads
  FOR UPDATE USING (
    auth.uid() = assigned_to
  );

-- Agent: Delete Denied (Implicitly denied by not having a DELETE policy for them)

-- 7. Ensure your own user is an ADMIN (You might need to run this manually with your specific email)
-- INSERT INTO public.profiles (id, email, role) VALUES ('YOUR_USER_ID', 'your@email.com', 'admin') ON CONFLICT (id) DO UPDATE SET role = 'admin';
