create table if not exists public.homepage_content (
  slug text primary key,
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.homepage_content enable row level security;

drop policy if exists "Public can read homepage content" on public.homepage_content;
create policy "Public can read homepage content"
on public.homepage_content
for select
to anon, authenticated
using (true);

insert into public.homepage_content (slug, content)
values ('home', '{}'::jsonb)
on conflict (slug) do nothing;

insert into storage.buckets (id, name, public)
values ('amartoy-media', 'amartoy-media', true)
on conflict (id) do nothing;

drop policy if exists "Public can read homepage media" on storage.objects;
create policy "Public can read homepage media"
on storage.objects
for select
to public
using (bucket_id = 'amartoy-media');

drop policy if exists "Service role manages homepage media" on storage.objects;
create policy "Service role manages homepage media"
on storage.objects
for all
to service_role
using (bucket_id = 'amartoy-media')
with check (bucket_id = 'amartoy-media');
