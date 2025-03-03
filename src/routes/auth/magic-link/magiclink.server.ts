// src/routes/user-management/SVELTE-EXAMPLE/+page.server.ts

import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ url, locals: { safeGetSession } }) => {
  // Check if the user already has an active session.
  const { session } = await safeGetSession()

  // If the user is logged in, redirect them to the account page.
  if (session) {
    redirect(303, '/private')
  }

  // Otherwise, provide the origin URL (used for constructing magic link URLs, etc.)
  console.log("TESTING  ", `${url.origin}/auth`)
  return { url: `${url.origin}/auth` } //e.g. this returns http://localhost
}

export const actions: Actions = {
  default: async (event) => {
    const {
      url,
      request,
      locals: { supabase },
    } = event

    // Extract the email from the submitted form.
    const formData = await request.formData()
    const email = formData.get('email') as string

    // Validate the email using a regex.
    const validEmail = /^[\w-\.+]+@([\w-]+\.)+[\w-]{2,8}$/.test(email)
    if (!validEmail) {
      return fail(400, { errors: { email: 'Please enter a valid email address' }, email })
    }

    // Attempt to sign in with a magic link via Supabase.
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) {
      return fail(400, {
        success: false,
        email,
        message: `There was an issue, Please contact support.`,
      })
    }

    // On success, return a success message.
    return {
      success: true,
      message: 'Please check your email for a magic link to log into the website.',
    }
  },
}
