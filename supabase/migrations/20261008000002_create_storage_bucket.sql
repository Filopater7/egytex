-- Create public storage bucket for product images
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'product-images',
  'product-images',
  true,
  5242880,  -- 5 MB max per file
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do nothing;

-- Allow anyone to read images (public bucket)
create policy "Public read access for product images"
  on storage.objects for select
  using (bucket_id = 'product-images');

-- Allow uploads (admin use — no auth required for now)
create policy "Allow image uploads"
  on storage.objects for insert
  with check (bucket_id = 'product-images');

-- Allow deletes
create policy "Allow image deletes"
  on storage.objects for delete
  using (bucket_id = 'product-images');
