import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

console.log('Supabase Init - URL:', supabaseUrl ? 'Set' : 'Missing');
console.log('Supabase Init - Key:', supabaseAnonKey ? 'Set' : 'Missing');

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase credentials missing! Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const checkConnection = async () => {
    try {
        const { data, error } = await supabase.from('leads').select('count', { count: 'exact', head: true });
        if (error) throw error;
        console.log('Supabase Connection Success:', data);
        return true;
    } catch (err) {
        console.error('Supabase Connection Failed:', err);
        return false;
    }
};
