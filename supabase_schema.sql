-- Create table for DCode Apps
create table public.dcode_apps (
    id uuid not null default gen_random_uuid (),
    created_at timestamp
    with
        time zone not null default now(),
        user_id uuid not null default auth.uid (),
        name text not null,
        code text not null default '',
        is_public boolean not null default false,
        constraint dcode_apps_pkey primary key (id),
        constraint dcode_apps_user_id_fkey foreign key (user_id) references auth.users (id) on delete cascade
);

-- Enable RLS (Security)
alter table public.dcode_apps enable row level security;

-- Policies
create policy "Users can view their own apps" on public.dcode_apps for
select using (auth.uid () = user_id);

create policy "Users can insert their own apps" on public.dcode_apps for
insert
with
    check (auth.uid () = user_id);

create policy "Users can update their own apps" on public.dcode_apps for
update using (auth.uid () = user_id);

create policy "Users can delete their own apps" on public.dcode_apps for delete using (auth.uid () = user_id);