import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cedoqtltxacqzraotllm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlZG9xdGx0eGFjcXpyYW90bGxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3MTQ0NTYsImV4cCI6MjA2NjI5MDQ1Nn0.sNpQ_1msMiZbOUk3VZsvH8Ne8JuEQ3L241x5JuF1qzI';

export const supabase = createClient(supabaseUrl, supabaseKey);