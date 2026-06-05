-- Only create a profile when signup metadata includes an explicit role.
-- Phone login (no metadata) was incorrectly defaulting every new user to "buyer".
create or replace function public.handle_new_profile()
returns trigger as $$
declare
  user_role text;
begin
  user_role := new.raw_user_meta_data ->> 'role';

  if user_role is null or user_role not in ('farmer', 'buyer') then
    return new;
  end if;

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
    user_role,
    new.raw_user_meta_data ->> 'full_name',
    coalesce(new.raw_user_meta_data ->> 'phone', new.phone),
    new.raw_user_meta_data ->> 'district',
    new.raw_user_meta_data ->> 'company_name',
    new.raw_user_meta_data ->> 'gst_number',
    new.raw_user_meta_data ->> 'contact_person'
  )
  on conflict (id) do update set
    role = excluded.role,
    full_name = coalesce(excluded.full_name, public.profiles.full_name),
    phone = coalesce(excluded.phone, public.profiles.phone),
    district = coalesce(excluded.district, public.profiles.district),
    company_name = coalesce(excluded.company_name, public.profiles.company_name),
    gst_number = coalesce(excluded.gst_number, public.profiles.gst_number),
    contact_person = coalesce(excluded.contact_person, public.profiles.contact_person);
  return new;
end;
$$ language plpgsql security definer;
