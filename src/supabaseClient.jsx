import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ruxwgnilneardcdhnasz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1eHdnbmlsbmVhcmRjZGhuYXN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4MTUxNzAsImV4cCI6MjA4MjM5MTE3MH0.lxY0uAy7vYSsmnAjmnDaz1z2PbI6BKLE5HbYGaTJjyw';

export const supabase = createClient(supabaseUrl, supabaseKey);