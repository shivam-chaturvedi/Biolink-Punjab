create table if not exists public.listing_interests (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  buyer_id uuid not null references public.profiles(id) on delete cascade,
  quantity numeric,
  message text,
  offered_price numeric,
  buyer_location text,
  status text default 'pending',
  created_at timestamptz default now()
);

alter table public.listing_interests enable row level security;

drop policy if exists "Buyers insert interests" on public.listing_interests;
create policy "Buyers insert interests" on public.listing_interests
for insert
with check (auth.uid() = buyer_id);

drop policy if exists "View own interests" on public.listing_interests;
create policy "View own interests" on public.listing_interests
for select
using (
  auth.uid() = buyer_id
  or auth.uid() = (
    select owner_id from public.listings where public.listings.id = listing_interests.listing_id
  )
);

drop policy if exists "Update interest status owner" on public.listing_interests;
create policy "Update interest status owner" on public.listing_interests
for update
using (
  auth.uid() = (
    select owner_id from public.listings where public.listings.id = listing_interests.listing_id
  )
)
with check (
  auth.uid() = (
    select owner_id from public.listings where public.listings.id = listing_interests.listing_id
  )
);
