import { NextResponse, type NextRequest } from 'next/server'
import stripe from '@/lib/stripe'
import type Stripe from 'stripe'

// Note: In App Router, Next.js does NOT auto-parse the body for Route Handlers,
// so request.text() gives us the raw body needed for Stripe signature verification.

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ''

  if (!signature) {
    console.warn('[Webhook] Missing stripe-signature header')
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[Webhook] Signature verification failed:', message)
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${message}` },
      { status: 400 }
    )
  }

  // Log the event type — expand handlers as features are built
  console.log(`[Webhook] Received event: ${event.type} (${event.id})`)

  switch (event.type) {
    case 'invoice.payment_failed':
      // TODO: trigger follow-up sequence
      console.log('[Webhook] Invoice payment failed:', event.data.object)
      break

    case 'invoice.overdue':
      // TODO: mark invoice as overdue and start follow-up chain
      console.log('[Webhook] Invoice overdue:', event.data.object)
      break

    case 'invoice.paid':
      // TODO: cancel any pending follow-ups for this invoice
      console.log('[Webhook] Invoice paid:', event.data.object)
      break

    default:
      // Unhandled event type — safe to ignore
      console.log(`[Webhook] Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}
