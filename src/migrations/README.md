# Database migrations

Run these files in order in the Supabase SQL editor or CLI:

1. `0001_extensions.sql`
2. `0002_profiles.sql`
3. `0003_listings.sql`
4. `0004_listing_interests.sql`
5. `0005_profile_marketplace_visibility.sql`
6. `0006_contact_submissions.sql`

The split keeps table creation, trigger setup, and cross-table policies in separate steps so dependencies resolve cleanly.
