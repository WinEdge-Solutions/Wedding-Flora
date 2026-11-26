-- =============================================================================
-- Wedding Flora Atelier CMS — Supabase Schema, RLS & Media Storage Setup
-- Run this script once in your Supabase Dashboard -> SQL Editor.
-- =============================================================================

-- 1. Table to store the active published (and draft) site configuration JSON
create table if not exists public.site_cms_config (
  key text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null
);

-- 2. Optional Admin Users allowlist table (if empty, any authenticated Supabase
--    user created in your Auth dashboard is treated as an admin; once populated,
--    only listed user emails or IDs can publish changes).
create table if not exists public.cms_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  role text not null default 'editor',
  created_at timestamptz not null default now()
);

-- 3. Enable Row Level Security
alter table public.site_cms_config enable row level security;
alter table public.cms_admins enable row level security;

-- Helper function: true when cms_admins is empty OR current user is in cms_admins
create or replace function public.is_cms_admin()
returns boolean
language sql
security definer
stable
as $$
  select auth.uid() is not null and (
    not exists (select 1 from public.cms_admins)
    or exists (select 1 from public.cms_admins where user_id = auth.uid())
  );
$$;

-- Public read access for published config so website visitors load content fast
drop policy if exists "Public can read published cms config" on public.site_cms_config;
create policy "Public can read published cms config"
  on public.site_cms_config
  for select
  using (key = 'published' or public.is_cms_admin());

-- Authenticated admins can insert/update/delete CMS configs
drop policy if exists "Admins can write cms config" on public.site_cms_config;
create policy "Admins can write cms config"
  on public.site_cms_config
  for all
  using (public.is_cms_admin())
  with check (public.is_cms_admin());

-- Admins can read their own admin record
drop policy if exists "Admins can read admin list" on public.cms_admins;
create policy "Admins can read admin list"
  on public.cms_admins
  for select
  using (auth.uid() = user_id or public.is_cms_admin());

-- 4. Create Public Storage Bucket for Photos & Videos ("cms-media")
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'cms-media',
  'cms-media',
  true,
  104857600, -- 100 MB per file (supports 4K wedding reels & high-res photography)
  array[
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/avif',
    'image/gif',
    'image/svg+xml',
    'video/mp4',
    'video/webm',
    'video/quicktime'
  ]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Storage RLS: Anyone can view published media; only admins can upload/update/delete
drop policy if exists "Public can view cms-media" on storage.objects;
create policy "Public can view cms-media"
  on storage.objects
  for select
  using (bucket_id = 'cms-media');

drop policy if exists "Admins can upload cms-media" on storage.objects;
create policy "Admins can upload cms-media"
  on storage.objects
  for insert
  with check (bucket_id = 'cms-media' and public.is_cms_admin());

drop policy if exists "Admins can update cms-media" on storage.objects;
create policy "Admins can update cms-media"
  on storage.objects
  for update
  using (bucket_id = 'cms-media' and public.is_cms_admin());

drop policy if exists "Admins can delete cms-media" on storage.objects;
create policy "Admins can delete cms-media"
  on storage.objects
  for delete
  using (bucket_id = 'cms-media' and public.is_cms_admin());

