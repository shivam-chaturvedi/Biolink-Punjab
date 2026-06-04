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
