-- SQL commands to set up Row Level Security (RLS) for the quickchat table
-- Run these commands in your Supabase SQL Editor

-- 1. Enable RLS on the quickchat table (if not already enabled)
ALTER TABLE quickchat ENABLE ROW LEVEL SECURITY;

-- 2. Create a policy to allow public INSERT (for form submissions)
CREATE POLICY "Allow public insert on quickchat"
ON quickchat
FOR INSERT
TO public
WITH CHECK (true);

-- 3. Create a policy to allow admin users to SELECT all records
CREATE POLICY "Allow admin select on quickchat"
ON quickchat
FOR SELECT
TO authenticated
USING (
  auth.jwt() ->> 'email' IN (
    'himanshu@smartbrew.in',
    'giridhar.chennuru@smartbrew.in', 
    'hr@smartbrew.in'
  )
);

-- 4. Create a policy to allow admin users to DELETE records
CREATE POLICY "Allow admin delete on quickchat"
ON quickchat
FOR DELETE
TO authenticated
USING (
  auth.jwt() ->> 'email' IN (
    'himanshu@smartbrew.in',
    'giridhar.chennuru@smartbrew.in',
    'hr@smartbrew.in'
  )
);

-- 5. Optionally, create a policy to allow admin users to UPDATE records
CREATE POLICY "Allow admin update on quickchat"
ON quickchat
FOR UPDATE
TO authenticated
USING (
  auth.jwt() ->> 'email' IN (
    'himanshu@smartbrew.in',
    'giridhar.chennuru@smartbrew.in',
    'hr@smartbrew.in'
  )
)
WITH CHECK (
  auth.jwt() ->> 'email' IN (
    'himanshu@smartbrew.in',
    'giridhar.chennuru@smartbrew.in',
    'hr@smartbrew.in'
  )
);

-- 6. Grant necessary permissions
GRANT INSERT ON quickchat TO public;
GRANT SELECT, UPDATE, DELETE ON quickchat TO authenticated; 