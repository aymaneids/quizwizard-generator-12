// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ospvtkqtgaobsuqivxxj.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zcHZ0a3F0Z2FvYnN1cWl2eHhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUxNjQ4ODgsImV4cCI6MjA1MDc0MDg4OH0.Di-sAWd6ftLWpSiW5siX18Myw3uMzrWfbD_-1CVhXTg";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);