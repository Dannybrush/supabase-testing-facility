// src/routes/user-management/SVELTE-EXAMPLE/+layout.ts

import { createBrowserClient, createServerClient, isBrowser } from '@supabase/ssr'
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'
import type { LayoutLoad } from './$types'

export const load: LayoutLoad = async ({ fetch, data, depends }) => {
  // Declare a dependency on the supabase auth data so that if it changes,
  // components depending on it will update.
  depends('supabase:auth')

  // Create a Supabase client. On the client we use the browser version;
  // on the server, we use the server version and pass cookies from layout data.
  const supabase = isBrowser()
    ? createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
        global: {
          fetch,
        },
      })
    : createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
        global: {
          fetch,
        },
        cookies: {
          getAll() {
            return data.cookies
          },
        },
      })

  /**
   * Get the current session. On the client, this is safe to use,
   * and on the server it uses the session provided by the layout.server.ts load.
   */
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const {
    data: { user },
  } = await supabase.auth.getUser()


  // Return both the supabase client and the current session
  return { session, supabase, user }
}
