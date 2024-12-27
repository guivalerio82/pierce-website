import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email is required' });
  }

  try {
    const { data, error } = await supabase
      .from('early_access_signups')
      .insert([{ email }])
      .select();

    if (error) throw error;

    return res.status(200).json({ message: 'Successfully signed up for early access' });
  } catch (error: any) {
    if (error?.code === '23505') {
      return res.status(400).json({ error: 'This email has already signed up' });
    }
    return res.status(500).json({ error: 'Error signing up for early access' });
  }
} 