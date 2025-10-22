import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://uiojgmejlvgrpstsuyqq.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpb2pnbWVqbHZncnBzdHN1eXFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3Nzc2OTUsImV4cCI6MjA3NDM1MzY5NX0.U46BIFYoVqAvD0BU5ku-UN0098y6YHbcsBLJ9veH0gw'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
