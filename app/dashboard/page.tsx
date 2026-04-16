import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ stripe_connected?: string; stripe_error?: string }>
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Fetch the user's profile (including Stripe connection status)
  const { data: profile } = await supabase
    .from('profiles')
    .select('email, stripe_account_id, stripe_connected')
    .eq('id', user.id)
    .single()

  const params = await searchParams
  const justConnected = params.stripe_connected === 'true'
  const stripeError = params.stripe_error

  const isStripeConnected = profile?.stripe_connected === true

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1">Welcome back, {user.email}</p>
      </div>

      {/* Flash messages */}
      {justConnected && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-5 py-4 rounded-xl flex items-center gap-3">
          <span className="text-xl">✅</span>
          <p className="font-medium">Stripe connected successfully! You&apos;re all set.</p>
        </div>
      )}
      {stripeError && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-5 py-4 rounded-xl flex items-center gap-3">
          <span className="text-xl">⚠️</span>
          <p className="font-medium">Stripe connection failed: {decodeURIComponent(stripeError)}</p>
        </div>
      )}

      {/* Stripe connection card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-1">Stripe Connection</h2>
            <p className="text-slate-500 text-sm max-w-md">
              {isStripeConnected
                ? 'Your Stripe account is connected. ChaseBot can now monitor your invoices.'
                : 'Connect your Stripe account so ChaseBot can monitor your invoices and send follow-ups.'}
            </p>
          </div>

          {isStripeConnected ? (
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-xl text-sm font-medium">
              <span>✓</span>
              <span>Stripe Connected</span>
            </div>
          ) : (
            <Link
              href="/api/stripe/connect"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors shadow-sm whitespace-nowrap"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11.5M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M17 15V18M17 21V18M17 18H14M17 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
              Connect Stripe
            </Link>
          )}
        </div>

        {isStripeConnected && profile?.stripe_account_id && (
          <div className="mt-4 pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-400 font-mono">
              Account ID: {profile.stripe_account_id}
            </p>
          </div>
        )}
      </div>

      {/* Invoice list placeholder */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Your Invoices</h2>

        {isStripeConnected ? (
          <div className="text-center py-12 text-slate-400">
            <div className="text-4xl mb-3">📋</div>
            <p className="font-medium text-slate-600">Invoice sync coming soon</p>
            <p className="text-sm mt-1">
              Your connected Stripe invoices will appear here once syncing is live.
            </p>
          </div>
        ) : (
          <div className="text-center py-12 text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
            <div className="text-4xl mb-3">🔗</div>
            <p className="font-medium text-slate-600">
              Invoices will appear here once Stripe is connected
            </p>
            <p className="text-sm mt-1">
              Connect your Stripe account above to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
