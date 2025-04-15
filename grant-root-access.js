import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export async function grantRootAccess(req, res) {
  if (req.method === 'POST') {
    const email = 'jensenbarry3@yahoo.com';
    const { data, error } = await supabaseClient
      .from('profiles') // Assuming you have a profiles table to manage user roles
      .update({ role: 'root' }) // Update the role to 'root'
      .eq('email', email); // Match the user by email

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ message: 'Root access granted', data });
  }

  return res.status(405).send('Method not allowed');
}