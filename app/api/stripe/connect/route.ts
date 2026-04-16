import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import stripe from '@/lib/stripe'

export async function GET() {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL || ''}/auth/login`
    )
  }

  // Build the Stripe Connect OAuth URL for Standard accounts
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.STRIPE_CONNECT_CLIENT_ID || '',
    scope: 'read_write',
    redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/stripe/connect/callback`,
    state: user.id, // pass user ID as state for CSRF protection
    'stripe_user[email]': user.email ?? '',
  })

  const connectUrl = `https://connect.stripe.com/oauth/authorize?${params.toString()}`

  return NextResponse.redirect(connectUrl)
}
