create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  user_type text not null check (user_type in ('farmer', 'buyer', 'other')),
  message text not null,
  status text default 'new',
  created_at timestamptz default now()
);

alter table public.contact_submissions enable row level security;

drop policy if exists "Anyone can view contact submissions" on public.contact_submissions;
create policy "Anyone can view contact submissions" on public.contact_submissions
for select
using (true);

drop policy if exists "Anyone can insert contact submissions" on public.contact_submissions;
create policy "Anyone can insert contact submissions" on public.contact_submissions
for insert
with check (true);

drop policy if exists "Anyone can update contact submissions" on public.contact_submissions;
create policy "Anyone can update contact submissions" on public.contact_submissions
for update
using (true)
with check (true);

drop policy if exists "Anyone can delete contact submissions" on public.contact_submissions;
create policy "Anyone can delete contact submissions" on public.contact_submissions
for delete
using (true);
