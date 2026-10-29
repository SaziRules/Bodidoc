-- PR & Creator Network registrations
-- Submitted via /pr-register (hidden, non-indexed form)
-- All reads/writes from the app use supabaseAdmin (service role), which bypasses RLS.
-- RLS is enabled to block any direct anon/authenticated access to the table.

create table if not exists pr_registrations (
  id               uuid primary key default gen_random_uuid(),
  first_name       text        not null,
  last_name        text        not null,
  gender           text        not null,
  age_confirmed    boolean     not null default false,
  email            text        not null,
  phone            text        not null,
  city             text        not null,
  province         text        not null,
  brand_interests  text[]      not null default '{}',
  active_platforms text[]      not null default '{}',
  facebook_url     text,
  instagram_url    text,
  tiktok_url       text,
  youtube_url      text,
  twitter_url      text,
  content_niches   text[]      not null default '{}',
  rate_card_url    text,
  popia_consent    boolean     not null default false,
  status           text        not null default 'new' check (status in ('new', 'contacted', 'archived')),
  created_at       timestamptz not null default now()
);

-- Enable Row Level Security
alter table pr_registrations enable row level security;

-- Block all direct anon/authenticated access.
-- The API routes use supabaseAdmin (service role key), which bypasses RLS entirely,
-- so no anon policies are needed.

-- ─── Storage bucket ───────────────────────────────────────────────────────────
-- Run the following in the Supabase dashboard → Storage → New bucket,
-- or via the Supabase CLI. SQL Storage API is not available in all project tiers.
--
--   Bucket name : pr-rate-cards
--   Public      : true
--
-- Then add this storage policy so only the service role can manage files
-- (anon uploads go through the API route which uses the service role key):
--
-- No additional storage policies required — the bucket is public for reads,
-- and all uploads are performed server-side via the service role key.
