import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
  const { data: profiles } = await supabase.from('profiles').select('username').limit(5).order('username')
  return { profiles: profiles ?? [] }
}