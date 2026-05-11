-- Add embedding columns to tools.
-- Run this in the Supabase SQL editor (or paste into psql).
-- Safe to re-run.

alter table tools
  add column if not exists embedding       jsonb,
  add column if not exists embedding_input text;

comment on column tools.embedding is
  'text-embedding-3-small, 1536 floats stored as jsonb array. NULL until backfilled by scripts/embed-tools.ts.';

comment on column tools.embedding_input is
  'Exact concatenated string we embedded. Used by the backfill script to detect when a tool needs re-embedding.';
