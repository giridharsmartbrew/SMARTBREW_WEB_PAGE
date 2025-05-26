import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jnjwmungxzofyhyletod.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpuandtdW5neHpvZnloeWxldG9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1ODU2NzYsImV4cCI6MjA2MzE2MTY3Nn0.9tLnOpeLXq8MpwKna9ZmKgQgU3YwpPeN7JaenyxyXgY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 