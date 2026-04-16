import Stripe from 'stripe'

// Stripe singleton — safe to import in Server Components and Route Handlers
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder_key_for_build', {
  apiVersion: '2026-03-25.dahlia',
  typescript: true,
})

export default stripe
