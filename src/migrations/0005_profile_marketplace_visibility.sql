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
