-- ============================================================
-- ChaseBot: Initial schema
-- ============================================================

-- Profiles table
-- Mirrors auth.users with app-specific fields.
-- A trigger auto-creates a row whenever a user signs up.

CREATE TABLE IF NOT EXISTS public.profiles (
  id               UUID          NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  email            TEXT,
  stripe_account_id TEXT,
  stripe_connected  BOOLEAN       NOT NULL DEFAULT FALSE,
  created_at       TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ   NOT NULL DEFAULT NOW(),

  CONSTRAINT profiles_pkey PRIMARY KEY (id)
);

-- ── Indexes ──────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS profiles_stripe_account_id_idx
  ON public.profiles (stripe_account_id)
  WHERE stripe_account_id IS NOT NULL;

-- ── Row-Level Security ────────────────────────────────────────
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Service role can do everything (used by server-side operations)
CREATE POLICY "Service role has full access"
  ON public.profiles
  FOR ALL
  TO service_role
  USING (TRUE)
  WITH CHECK (TRUE);

-- ── Auto-create profile on signup ─────────────────────────────
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (
    NEW.id,
    NEW.email
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
