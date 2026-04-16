"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Simulate async submit — no backend yet
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <span className="font-bold text-xl tracking-tight text-slate-900">ChaseBot</span>
          </div>
          <a
            href="#waitlist"
            className="text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Get Early Access
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-violet-50 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-28 text-center">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 text-indigo-700 text-sm font-medium px-4 py-1.5 rounded-full mb-8">
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
            Built for freelancers tired of chasing invoices
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.08] mb-6">
            Stop chasing payments.
            <br />
            <span className="text-indigo-600">Start getting paid.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-xl text-slate-500 leading-relaxed mb-10">
            ChaseBot watches your Stripe invoices and automatically sends polite, professional follow-up emails when clients go overdue — so you never have to have that awkward conversation again.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a
              href="#waitlist"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5"
            >
              Join the Waitlist — It&apos;s Free
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <span className="text-sm text-slate-400">$19/mo when we launch · No credit card now</span>
          </div>

          {/* Social proof bar */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-slate-500">
            {["✓ No awkward money conversations", "✓ Works with your existing Stripe", "✓ Cancel anytime"].map((item) => (
              <span key={item} className="font-medium">{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEM CALLOUT ── */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-2xl sm:text-3xl font-semibold leading-relaxed">
            &ldquo;The average freelancer spends{" "}
            <span className="text-indigo-400">14 hours a year</span> chasing late invoices.
            That&apos;s two full workdays of unpaid awkwardness.&rdquo;
          </p>
          <p className="mt-4 text-slate-400 text-lg">
            HoneyBook just raised prices 89%. You deserve a better option.
          </p>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Set it up once. Get paid on repeat.</h2>
            <p className="text-xl text-slate-500 max-w-xl mx-auto">
              Three simple steps. No spreadsheets, no awkward emails, no forgotten invoices.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: "🔗",
                title: "Connect Stripe",
                description:
                  "Link your Stripe account in under 60 seconds. ChaseBot reads your invoices — nothing else. Your clients never know it&apos;s there.",
              },
              {
                step: "02",
                icon: "✍️",
                title: "AI writes your follow-ups",
                description:
                  "Our AI crafts polite, professional emails in your voice. First reminder is friendly. The third one means business. All customizable.",
              },
              {
                step: "03",
                icon: "💰",
                title: "Get paid faster",
                description:
                  "Invoices that go uncontested get paid. On average, freelancers using automated follow-ups get paid 11 days faster.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all"
              >
                <div className="absolute top-6 right-6 text-5xl font-black text-slate-100 select-none">
                  {item.step}
                </div>
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.description }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-20 bg-gradient-to-b from-white to-indigo-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Everything you need. Nothing you don&apos;t.</h2>
            <p className="text-xl text-slate-500">Built lean, for freelancers who just want to get paid.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🔍", title: "Auto-detects overdue invoices", desc: "ChaseBot monitors your Stripe invoices 24/7. The moment one goes overdue, it gets queued for follow-up." },
              { icon: "🤖", title: "AI-generated, human-sounding emails", desc: "Emails that sound like you wrote them — because they start with your tone and style as a baseline." },
              { icon: "📈", title: "Escalating sequence", desc: "Gentle reminder on day 1. Firmer nudge on day 7. Final notice on day 14. You control every step." },
              { icon: "📊", title: "Invoice status dashboard", desc: "See every overdue invoice, every email sent, and which clients are slow payers at a glance." },
              { icon: "⚙️", title: "Fully customizable", desc: "Edit subject lines, tone, timing, and templates. Or just trust the defaults and never think about it." },
              { icon: "🔒", title: "Stripe-only access", desc: "Read-only connection to your invoice data. We never touch your payouts or customer payment methods." },
            ].map((f) => (
              <div key={f.title} className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h4 className="font-semibold text-slate-900 mb-2">{f.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Simple, honest pricing</h2>
            <p className="text-xl text-slate-500">One plan. Everything included. No surprises.</p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="relative bg-white border-2 border-indigo-500 rounded-2xl p-8 shadow-xl shadow-indigo-100">
              {/* Popular badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-indigo-600 text-white text-sm font-semibold px-4 py-1.5 rounded-full">
                  Early Access Price
                </span>
              </div>

              <div className="text-center mb-8">
                <div className="flex items-end justify-center gap-1 mb-2">
                  <span className="text-6xl font-extrabold text-slate-900">$19</span>
                  <span className="text-slate-500 text-xl mb-3">/mo</span>
                </div>
                <p className="text-slate-500">Lock in this rate forever when you join the waitlist.</p>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  "Unlimited invoice monitoring",
                  "AI-written follow-up sequences",
                  "Customizable email templates",
                  "Invoice status dashboard",
                  "Escalating reminder schedule",
                  "Stripe integration (read-only)",
                  "Cancel anytime",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-slate-700">
                    <span className="w-5 h-5 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#waitlist"
                className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-4 rounded-xl transition-colors text-lg"
              >
                Join the Waitlist
              </a>
              <p className="text-center text-slate-400 text-sm mt-3">No credit card required</p>
            </div>

            {/* Comparison callout */}
            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
              <p className="text-amber-800 text-sm font-medium">
                💡 HoneyBook now starts at <span className="line-through">$19</span> <strong>$36/mo</strong> — and that&apos;s before you count the time you spend chasing invoices manually.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL / EMPATHY ── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                quote: "I sent the same 'just following up' email 47 times last year. 47. That's a problem that should be solved by software.",
                name: "Sara K.",
                role: "Wedding Photographer, Austin TX",
              },
              {
                quote: "Half my late invoices would have gotten paid sooner if I'd just followed up consistently. I kept forgetting, or feeling weird about it.",
                name: "Marcus T.",
                role: "Freelance Brand Designer",
              },
            ].map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                <div className="text-indigo-400 text-4xl mb-4">&ldquo;</div>
                <p className="text-slate-700 text-lg leading-relaxed mb-6">{t.quote}</p>
                <div>
                  <p className="font-semibold text-slate-900">{t.name}</p>
                  <p className="text-slate-500 text-sm">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WAITLIST SIGNUP ── */}
      <section id="waitlist" className="py-24 bg-gradient-to-br from-indigo-600 to-violet-600">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Be first in line</h2>
          <p className="text-xl text-indigo-200 mb-10">
            ChaseBot is in early development. Join the waitlist and lock in our launch price of $19/mo — forever. We&apos;ll email you the moment doors open.
          </p>

          {submitted ? (
            <div className="bg-white/10 border border-white/20 rounded-2xl p-8">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-white mb-2">You&apos;re on the list!</h3>
              <p className="text-indigo-200">
                We&apos;ll reach out as soon as ChaseBot is ready. In the meantime, tell a fellow freelancer who needs this.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@yourfreelancebusiness.com"
                required
                className="flex-1 px-5 py-4 rounded-xl text-slate-900 placeholder-slate-400 text-lg focus:outline-none focus:ring-2 focus:ring-white/50 bg-white"
              />
              <button
                type="submit"
                disabled={loading}
                className="sm:w-auto w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-70 text-white font-semibold px-7 py-4 rounded-xl text-lg transition-colors whitespace-nowrap"
              >
                {loading ? "Joining…" : "Join Waitlist"}
              </button>
            </form>
          )}

          <p className="mt-5 text-indigo-300 text-sm">
            No spam. No credit card. Just early access.
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-xl">⚡</span>
              <span className="font-bold text-white">ChaseBot</span>
              <span className="text-slate-600 text-sm ml-2">© 2026</span>
            </div>
            <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm">
              <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
              <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
              <a href="#waitlist" className="hover:text-white transition-colors">Early Access</a>
            </nav>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-xs text-slate-600">
            ChaseBot is not affiliated with Stripe, Inc. Stripe is a trademark of Stripe, Inc.
          </div>
        </div>
      </footer>
    </div>
  );
}
