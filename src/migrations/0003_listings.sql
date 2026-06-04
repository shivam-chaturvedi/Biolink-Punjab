create table if not exists public.listings (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  crop_type text not null,
  quantity numeric,
  price_per_quintal numeric,
  district text,
  needs_transport boolean default false,
  status text default 'Active',
  interested_buyers integer default 0,
  created_at timestamptz default now()
);

alter table public.listings enable row level security;

drop policy if exists "Anyone can view listings" on public.listings;
create policy "Anyone can view listings" on public.listings
for select
using (true);

drop policy if exists "Farmers manage own listings" on public.listings;
create policy "Farmers manage own listings" on public.listings
for insert
with check (auth.uid() = owner_id);

drop policy if exists "Farmers update own listings" on public.listings;
create policy "Farmers update own listings" on public.listings
for update
using (auth.uid() = owner_id)
with check (auth.uid() = owner_id);

drop policy if exists "Farmers delete own listings" on public.listings;
create policy "Farmers delete own listings" on public.listings
for delete
using (auth.uid() = owner_id);
