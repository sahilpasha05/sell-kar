import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type DeviceVariant = {
  id: string;
  device_id: string;
  device_name: string;
  brand: string;
  device_type: 'phone' | 'laptop' | 'ipad';
  storage: string;
  base_price: number;
  created_at: string;
  updated_at: string;
};
