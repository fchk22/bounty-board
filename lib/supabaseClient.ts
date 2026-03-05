import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://yczhzyakhivcnhmksedw.supabase.co"
const supabaseAnonKey = "sb_publishable_P4nnS9qSFGLtAbVqwwmWuQ_poEaCiph"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)