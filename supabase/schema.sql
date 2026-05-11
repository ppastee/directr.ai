create table if not exists tools (
  id              integer primary key,
  category        text not null,
  name            text not null,
  emoji           text,
  logo_domain     text,
  url             text,
  tagline         text,
  description     text,
  price           text,
  free            boolean default false,
  free_tier       text,
  free_tier_label text,
  rating          numeric(3,1),
  reviews         integer default 0,
  tags            text[],
  sponsored       boolean default false,
  api_access      boolean default false,
  output_res      text,
  watermark       boolean default false,
  embedding       jsonb, -- text-embedding-3-small, 1536 floats. NULL until backfilled.
  embedding_input text,  -- exact string we embedded; used to detect when re-embed is needed
  updated_at      timestamptz default now()
);

create index if not exists tools_category_idx on tools(category);

-- Enable Row Level Security (data is public read-only)
alter table tools enable row level security;
create policy "public read" on tools for select using (true);
