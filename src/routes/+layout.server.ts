
// src/routes/user-management/SVELTE-EXAMPLE/+layout.server.ts

import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals: { safeGetSession }, cookies }) => {
  // Use a helper (safeGetSession) from locals to safely get session and user data.
  const { session, user } = await safeGetSession()

  // Return session, user, and all cookies. This data will be available
  // to the layout load functions on both the server and client.
  return {
    session,
    user,
    cookies: cookies.getAll(),
  }
}
