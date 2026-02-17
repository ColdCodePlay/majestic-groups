-- Allow public (anonymous) users to insert leads
DROP POLICY IF EXISTS "Enable insert for all users" ON "public"."leads";
DROP POLICY IF EXISTS "Public can insert leads" ON "public"."leads";

-- Re-create the policy to explicitly allow INSERT for everyone (anon + authenticated)
CREATE POLICY "Enable insert for all users"
ON "public"."leads"
FOR INSERT
TO public
WITH CHECK (true);
