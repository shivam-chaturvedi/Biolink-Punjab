-- Enforce unique phone numbers on profiles (one account per phone)
create unique index if not exists profiles_phone_unique
  on public.profiles (phone)
  where phone is not null and phone != '';

-- Sync phone from auth.users when metadata omits it (phone OTP signups)
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
