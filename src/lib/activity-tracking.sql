-- Create user_activity table to track user interactions on the website
CREATE TABLE IF NOT EXISTS user_activity (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT NOT NULL,
  page TEXT NOT NULL,
  event_type TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
  ip_address TEXT,
  country TEXT,
  region TEXT,
  city TEXT,
  device_type TEXT,
  device_model TEXT,
  os TEXT,
  browser TEXT,
  scroll_depth NUMERIC,
  mouse_activity BOOLEAN,
  metadata JSONB,
  user_id UUID -- Optional: for authenticated users
);

-- Create index for faster queries on common filters
CREATE INDEX IF NOT EXISTS idx_user_activity_session_id ON user_activity(session_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_event_type ON user_activity(event_type);
CREATE INDEX IF NOT EXISTS idx_user_activity_page ON user_activity(page);
CREATE INDEX IF NOT EXISTS idx_user_activity_timestamp ON user_activity(timestamp);

-- Enable Row Level Security
ALTER TABLE user_activity ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert
CREATE POLICY "Allow inserts for everyone" 
  ON user_activity 
  FOR INSERT 
  TO authenticated, anon
  WITH CHECK (true);

-- Create policy to allow only admins to view
CREATE POLICY "Allow admins to view all data" 
  ON user_activity 
  FOR SELECT 
  TO authenticated
  USING (auth.jwt() ->> 'email' IN ('himanshu@smartbrew.in', 'giridhar.chennuru@smartbrew.in', 'hr@smartbrew.in'));

-- Create policy to allow only admins to delete
CREATE POLICY "Allow admins to delete" 
  ON user_activity 
  FOR DELETE 
  TO authenticated
  USING (auth.jwt() ->> 'email' IN ('himanshu@smartbrew.in', 'giridhar.chennuru@smartbrew.in', 'hr@smartbrew.in'));

-- Enable Realtime for this table
ALTER PUBLICATION supabase_realtime ADD TABLE user_activity; 