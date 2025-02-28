
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://vdpxpvbrxsevftbcqqoy.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkcHhwdmJyeHNldmZ0YmNxcW95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU0MTE1OTUsImV4cCI6MjAzMDk4NzU5NX0.MiDxebUVTJg7HN0dbKO9z-xZ9ux9ysUlwUOoD4E1EGo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
