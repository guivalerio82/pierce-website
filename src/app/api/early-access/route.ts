import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Insert email into Supabase
    const { error } = await supabase
      .from('early_access_signups')
      .insert([{ email }]);

    if (error) {
      if (error.code === '23505') { // Unique violation error code
        return NextResponse.json(
          { error: 'This email has already been registered' },
          { status: 400 }
        );
      }
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error submitting email:', error);
    return NextResponse.json(
      { error: 'Failed to submit email. Please try again later.' },
      { status: 500 }
    );
  }
} 