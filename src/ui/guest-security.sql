DO $$ 
DECLARE 
    t text;
BEGIN
    -- List of tables you want to unlock
    FOR t IN SELECT unnest(ARRAY['profiles', 'cabins', 'bookings', 'settings', 'guests']) 
    LOOP
        -- 1. Disable RLS entirely (The Nuclear Option)
        EXECUTE format('ALTER TABLE public.%I DISABLE ROW LEVEL SECURITY', t);

        -- 2. Clean up the old policies so they don't haunt you later
        EXECUTE format('DROP POLICY IF EXISTS "Public View" ON public.%I', t);
        EXECUTE format('DROP POLICY IF EXISTS "Admin Access" ON public.%I', t);
    END LOOP;