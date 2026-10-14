-- =====================================================================
-- Make YOUR account an administrator.
--
-- BEFORE running this:
--   1. Supabase Dashboard -> Authentication -> Users -> "Add user"
--      -> "Create new user". Enter your email and a strong password and
--      tick "Auto Confirm User".
--   2. Replace the email below with that same email.
--   3. Run this in SQL Editor.
-- =====================================================================

insert into public.admins (user_id)
select id from auth.users
where email = 'REPLACE_WITH_YOUR_EMAIL@example.com'
on conflict (user_id) do nothing;

-- Check it worked (you should see one row):
select a.user_id, u.email
from public.admins a
join auth.users u on u.id = a.user_id;
