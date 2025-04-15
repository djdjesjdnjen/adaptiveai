
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing required Supabase environment variables');
}

const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export async function grantRootAccess(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }

  const { email, authToken } = req.body;

  if (!email || !authToken) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Verify authentication
    const { user, error: authError } = await supabaseClient.auth.getUser(authToken);
    
    if (authError || !user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Check if user has admin privileges
    const { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profileError || profile?.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    // Update target user role
    const { data, error } = await supabaseClient
      .from('profiles')
      .update({ role: 'root' })
      .eq('email', email);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ message: 'Root access granted', data });
  } catch (error) {
    console.error('Error granting root access:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
