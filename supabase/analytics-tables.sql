-- ═══════════════════════════════════════════════════════════════
-- AmarToy Analytics Tables
-- Run this in your Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════

-- ─── 1. Visitor Tracking ─────────────────────────────────────────────────────
create table if not exists public.analytics_visitors (
  id           bigserial primary key,
  visited_at   timestamptz not null default timezone('utc', now()),
  session_id   text,
  page_path    text,
  country      text,
  device       text
);

alter table public.analytics_visitors enable row level security;

drop policy if exists "Public can insert visitors" on public.analytics_visitors;
create policy "Public can insert visitors"
on public.analytics_visitors for insert
to anon, authenticated
with check (true);

drop policy if exists "Service role can read visitors" on public.analytics_visitors;
create policy "Service role can read visitors"
on public.analytics_visitors for select
to service_role
using (true);

-- ─── 2. Add to Cart Events ───────────────────────────────────────────────────
create table if not exists public.analytics_cart_events (
  id           bigserial primary key,
  added_at     timestamptz not null default timezone('utc', now()),
  product_id   text,
  product_name text,
  price        numeric(12,2),
  quantity     integer default 1
);

alter table public.analytics_cart_events enable row level security;

drop policy if exists "Public can insert cart events" on public.analytics_cart_events;
create policy "Public can insert cart events"
on public.analytics_cart_events for insert
to anon, authenticated
with check (true);

drop policy if exists "Service role can read cart events" on public.analytics_cart_events;
create policy "Service role can read cart events"
on public.analytics_cart_events for select
to service_role
using (true);

-- ─── 3. Wishlist Events ──────────────────────────────────────────────────────
create table if not exists public.analytics_wishlist_events (
  id           bigserial primary key,
  added_at     timestamptz not null default timezone('utc', now()),
  product_id   text,
  product_name text
);

alter table public.analytics_wishlist_events enable row level security;

drop policy if exists "Public can insert wishlist events" on public.analytics_wishlist_events;
create policy "Public can insert wishlist events"
on public.analytics_wishlist_events for insert
to anon, authenticated
with check (true);

drop policy if exists "Service role can read wishlist events" on public.analytics_wishlist_events;
create policy "Service role can read wishlist events"
on public.analytics_wishlist_events for select
to service_role
using (true);

-- ─── 4. Sales / Orders ───────────────────────────────────────────────────────
create table if not exists public.analytics_sales (
  id           bigserial primary key,
  sold_at      timestamptz not null default timezone('utc', now()),
  order_id     text,
  product_id   text,
  product_name text,
  quantity     integer default 1,
  unit_price   numeric(12,2),
  total_amount numeric(12,2)
);

alter table public.analytics_sales enable row level security;

drop policy if exists "Public can insert sales" on public.analytics_sales;
create policy "Public can insert sales"
on public.analytics_sales for insert
to anon, authenticated
with check (true);

drop policy if exists "Service role can read sales" on public.analytics_sales;
create policy "Service role can read sales"
on public.analytics_sales for select
to service_role
using (true);

-- ─── 5. Live Support Messages ────────────────────────────────────────────────
-- Note: Chat sessions are stored in Firebase. This table is for analytics only.
create table if not exists public.analytics_support_messages (
  id            bigserial primary key,
  sent_at       timestamptz not null default timezone('utc', now()),
  session_id    text,
  sender        text check (sender in ('user','admin')),
  replied       boolean default false
);

alter table public.analytics_support_messages enable row level security;

drop policy if exists "Public can insert support messages" on public.analytics_support_messages;
create policy "Public can insert support messages"
on public.analytics_support_messages for insert
to anon, authenticated
with check (true);

drop policy if exists "Service role can read support messages" on public.analytics_support_messages;
create policy "Service role can read support messages"
on public.analytics_support_messages for select
to service_role
using (true);

-- ─── Seed with sample data for demonstration ─────────────────────────────────
-- (Remove this section in production)

-- Sample visitors for current month (April 2026)
insert into public.analytics_visitors (visited_at, session_id, page_path)
select
  date_trunc('month', timezone('utc', now())) + (random() * (date_trunc('month', timezone('utc', now())) + interval '30 days' - date_trunc('month', timezone('utc', now()))))::interval,
  'sess-' || gs,
  case (gs % 4)
    when 0 then '/'
    when 1 then '/shop/'
    when 2 then '/product/'
    else '/contact/'
  end
from generate_series(1, 250) gs;

-- Sample cart events
insert into public.analytics_cart_events (added_at, product_id, product_name, price, quantity)
select
  date_trunc('month', timezone('utc', now())) + (random() * (date_trunc('month', timezone('utc', now())) + interval '25 days' - date_trunc('month', timezone('utc', now()))))::interval,
  'PRD-00' || (gs % 8 + 1),
  case (gs % 5)
    when 0 then 'Robot Toy'
    when 1 then 'Building Block Set'
    when 2 then 'Action Figure'
    when 3 then 'Puzzle Set'
    else 'Doll House'
  end,
  (random() * 3000 + 500)::numeric(12,2),
  (random() * 3 + 1)::integer
from generate_series(1, 180) gs;

-- Sample wishlist events
insert into public.analytics_wishlist_events (added_at, product_id, product_name)
select
  date_trunc('month', timezone('utc', now())) + (random() * (date_trunc('month', timezone('utc', now())) + interval '25 days' - date_trunc('month', timezone('utc', now()))))::interval,
  'PRD-00' || (gs % 8 + 1),
  case (gs % 5)
    when 0 then 'Robot Toy'
    when 1 then 'Building Block Set'
    when 2 then 'Action Figure'
    when 3 then 'Puzzle Set'
    else 'Doll House'
  end
from generate_series(1, 120) gs;

-- Sample sales
insert into public.analytics_sales (sold_at, order_id, product_id, product_name, quantity, unit_price, total_amount)
select
  date_trunc('month', timezone('utc', now())) + (random() * (date_trunc('month', timezone('utc', now())) + interval '25 days' - date_trunc('month', timezone('utc', now()))))::interval,
  'ORD-' || (1000 + gs),
  'PRD-00' || (gs % 8 + 1),
  case (gs % 5)
    when 0 then 'Robot Toy'
    when 1 then 'Building Block Set'
    when 2 then 'Action Figure'
    when 3 then 'Puzzle Set'
    else 'Doll House'
  end,
  (random() * 3 + 1)::integer,
  (random() * 3000 + 500)::numeric(12,2),
  (random() * 9000 + 500)::numeric(12,2)
from generate_series(1, 95) gs;

-- Sample support messages
insert into public.analytics_support_messages (sent_at, session_id, sender, replied)
select
  date_trunc('month', timezone('utc', now())) + (random() * (date_trunc('month', timezone('utc', now())) + interval '25 days' - date_trunc('month', timezone('utc', now()))))::interval,
  'chat-' || gs,
  'user',
  gs % 3 != 0  -- ~67% replied
from generate_series(1, 80) gs;
