-- Fix 500 Error: Infinite Recursion in RLS Policies
-- The issue is "Admins full access" policy queries 'profiles', which triggers the policy again.
-- We fix this by using a SECURITY DEFINER function that bypasses RLS for the check.

-- 1. Create a secure function to check admin status
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  -- This runs with the permissions of the function creator (superuser/postgres)
  -- effectively bypassing RLS to safely check the role.
  RETURN EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Drop OLD RLS Policies that caused recursion
DROP POLICY IF EXISTS "Admins full access profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can insert profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can delete profiles" ON public.profiles;

DROP POLICY IF EXISTS "Admins full access leads" ON public.leads;
DROP POLICY IF EXISTS "Admins can view leads" ON public.leads;
DROP POLICY IF EXISTS "Admins can update leads" ON public.leads;
DROP POLICY IF EXISTS "Admins can delete leads" ON public.leads;


-- 3. Re-create Profiles Policies using is_admin()
CREATE POLICY "Admins full access profiles" ON public.profiles
  FOR ALL USING (public.is_admin());

-- Keep the self-view policy (it was fine, but good to ensure uniqueness)
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);


-- 4. Re-create Leads Policies using is_admin()
CREATE POLICY "Admins full access leads" ON public.leads
  FOR ALL USING (public.is_admin());

-- 5. Ensure Agent policies are still there (re-apply to be safe)
DROP POLICY IF EXISTS "Agents view assigned leads" ON public.leads;
CREATE POLICY "Agents view assigned leads" ON public.leads
  FOR SELECT USING (auth.uid() = assigned_to);

DROP POLICY IF EXISTS "Agents update assigned leads" ON public.leads;
CREATE POLICY "Agents update assigned leads" ON public.leads
  FOR UPDATE USING (auth.uid() = assigned_to);

-- 6. Ensure public insert is there
DROP POLICY IF EXISTS "Public can insert leads" ON public.leads;
CREATE POLICY "Public can insert leads" ON public.leads
  FOR INSERT WITH CHECK (true);
