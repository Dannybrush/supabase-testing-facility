import type { EmailOtpType } from '@supabase/supabase-js'
import { redirect } from '@sveltejs/kit'

import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ url, locals: { supabase } }) => {

/*

url.searchParams.get('next'):

This extracts the value of the next query parameter from the request URL.

Example: If the URL is https://example.com/auth/callback?next=/dashboard, then next will be '/dashboard'.

?? '/': If next is null or undefined (i.e., not provided in the URL), it defaults to '/'.

*/

  const token_hash = url.searchParams.get('token_hash')
  const type = url.searchParams.get('type') as EmailOtpType | null
  const next = url.searchParams.get('next') ?? '/private'

  /**
   * Clean up the redirect URL by deleting the Auth flow parameters.
   *
   * `next` is preserved for now, because it's needed in the error case.
   */
  const redirectTo = new URL(url)
  redirectTo.pathname = next
  redirectTo.searchParams.delete('token_hash')
  redirectTo.searchParams.delete('type')
  console.log("redirecting in +server.ts")

  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({ type, token_hash })
    if (!error) {
      redirectTo.searchParams.delete('next')
      redirect(303, redirectTo)
      
    }
  }

  redirectTo.pathname = '/auth/error'
  redirect(303, redirectTo)
}