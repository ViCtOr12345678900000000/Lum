import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://okwidbmoydzbwysqleqm.supabase.co',
  'sb_publishable_3XwPnWZVpvF6Uz6H1lmGGg_wqUOAKp_'
)