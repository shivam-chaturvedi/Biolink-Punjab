create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null check (role in ('farmer','buyer')),
  phone text,
  district text,
  company_name text,
  gst_number text,
  contact_person text,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

drop policy if exists "Users view own profile" on public.profiles;
create policy "Users view own profile" on public.profiles
for select
using (auth.uid() = id);

drop policy if exists "Profiles visible to marketplace" on public.profiles;
create policy "Profiles visible to marketplace" on public.profiles
for select
using (
  exists (
    select 1
    from public.listings
    where public.listings.owner_id = public.profiles.id
  )
);

drop policy if exists "Users insert their profile" on public.profiles;
create policy "Users insert their profile" on public.profiles
for insert
with check (auth.uid() = id);

drop policy if exists "Users update their profile" on public.profiles;
create policy "Users update their profile" on public.profiles
for update
using (auth.uid() = id)
with check (auth.uid() = id);

create or replace function public.handle_new_profile()
returns trigger as $$
begin
  insert into public.profiles (
    id,
    role,
    full_name,
    phone,
    district,
    company_name,
    gst_number,
    contact_person
  )
  values (
    new.id,
    coalesce((new.raw_user_meta_data ->> 'role')::text, 'buyer'),
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'phone',
    new.raw_user_meta_data ->> 'district',
    new.raw_user_meta_data ->> 'company_name',
    new.raw_user_meta_data ->> 'gst_number',
    new.raw_user_meta_data ->> 'contact_person'
  )
  on conflict (id) do update set
    role = excluded.role,
    full_name = excluded.full_name,
    phone = excluded.phone,
    district = excluded.district,
    company_name = excluded.company_name,
    gst_number = excluded.gst_number,
    contact_person = excluded.contact_person;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_profile();

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
