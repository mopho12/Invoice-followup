import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import stripe from '@/lib/stripe'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state') // user ID passed in the OAuth state param
  const error = searchParams.get('error')
  const errorDescription = searchParams.get('error_description')

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  // Handle user-denied or other OAuth errors
  if (error) {
    console.error('[Stripe Connect] OAuth error:', error, errorDescription)
    return NextResponse.redirect(
      `${appUrl}/dashboard?stripe_error=${encodeURIComponent(errorDescription ?? error)}`
    )
  }

  if (!code || !state) {
    return NextResponse.redirect(`${appUrl}/dashboard?stripe_error=missing_params`)
  }

  try {
    // Exchange the authorization code for an access token and connected account ID
    const response = await stripe.oauth.token({
      grant_type: 'authorization_code',
      code,
    })

    const stripeAccountId = response.stripe_user_id

    if (!stripeAccountId) {
      throw new Error('No stripe_user_id returned from Stripe OAuth')
    }

    // Persist the connected account ID to the user's profile
    const supabase = await createClient()

    const { error: dbError } = await supabase
      .from('profiles')
      .update({
        stripe_account_id: stripeAccountId,
        stripe_connected: true,
        updated_at: new Date().toISOString(),
      })
      .eq('id', state)

    if (dbError) {
      console.error('[Stripe Connect] Failed to update profile:', dbError)
      return NextResponse.redirect(
        `${appUrl}/dashboard?stripe_error=database_error`
      )
    }

    return NextResponse.redirect(`${appUrl}/dashboard?stripe_connected=true`)
  } catch (err) {
    console.error('[Stripe Connect] Token exchange failed:', err)
    return NextResponse.redirect(
      `${appUrl}/dashboard?stripe_error=token_exchange_failed`
    )
  }
}
