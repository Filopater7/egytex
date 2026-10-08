-- Create products table for EgyTex food & desserts store
create table if not exists public.products (
  id           text primary key,
  name         text not null,
  description  text not null,
  full_description text not null,
  price        numeric(10, 2) not null check (price > 0),
  image        text not null,
  category     text not null check (category in ('sweet-food', 'savory-food')),
  stock        integer not null default 0 check (stock >= 0),
  is_new       boolean not null default false,
  is_featured  boolean not null default false,
  created_at   timestamptz not null default now()
);

-- Enable Row Level Security
alter table public.products enable row level security;

-- Allow anyone to read products (public storefront)
create policy "Products are publicly readable"
  on public.products
  for select
  using (true);

-- Allow authenticated users (admin) to insert/update/delete
create policy "Admins can insert products"
  on public.products
  for insert
  with check (true);

create policy "Admins can update products"
  on public.products
  for update
  using (true);

create policy "Admins can delete products"
  on public.products
  for delete
  using (true);
