-- Drop the overly permissive write policies
drop policy if exists "Admins can insert products" on public.products;
drop policy if exists "Admins can update products" on public.products;
drop policy if exists "Admins can delete products" on public.products;

-- Drop overly permissive storage policies
drop policy if exists "Allow image uploads" on storage.objects;
drop policy if exists "Allow image deletes" on storage.objects;

-- Products: only server-side service role can write
-- Public (anon key) can only SELECT
-- INSERT / UPDATE / DELETE require the service_role key (never exposed to browser)
create policy "Only service role can insert products"
  on public.products for insert
  with check (auth.role() = 'service_role');

create policy "Only service role can update products"
  on public.products for update
  using (auth.role() = 'service_role');

create policy "Only service role can delete products"
  on public.products for delete
  using (auth.role() = 'service_role');

-- Storage: only service role can upload/delete images
create policy "Only service role can upload images"
  on storage.objects for insert
  with check (
    bucket_id = 'product-images'
    and auth.role() = 'service_role'
  );

create policy "Only service role can delete images"
  on storage.objects for delete
  using (
    bucket_id = 'product-images'
    and auth.role() = 'service_role'
  );
