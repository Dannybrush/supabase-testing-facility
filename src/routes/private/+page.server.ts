import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ depends, locals: { supabase } }) => {
  depends('supabase:db:profiles')
  const { data: profiles } = await supabase.from('profiles').select('username, full_name').order('username')
  return { profiles: profiles ?? [] }
}