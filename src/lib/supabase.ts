
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://vdpxpvbrxsevftbcqqoy.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkcHhwdmJyeHNldmZ0YmNxcW95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3NTkzOTQsImV4cCI6MjA1NjMzNTM5NH0.8glNpUrxW0rzDPxBkPhZtynlZEk0MwQilWfXhIbSwF0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
