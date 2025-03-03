import { redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals: { supabase, safeGetSession } }) => {
  // On loading the page, retrieve locals (supabase and safeGetSession) - from  app.d.ts

  // create new constant called session and call the "safeGetSession method, retruning nthe output here"
  const { session } = await safeGetSession()
  if (!session) {
    // if there is no session
    //log to console
    console.log("no session found in auth/+page.server")
    //redirect to login page
    redirect(303, '/auth') //303 is standard redirect code

  }
  //else :  if there is a session continue;

  //query the database for the profile of the user in this session 
  const { data: profile } = await supabase
    .from('profiles') // from the table in supabase called "Profiles"
    .select('*') //select these fields
    .eq('id', session.user.id) // if the user id of the session owner matches that of the profile in the db
    .single() //only return first result (there should only be one, but this prevents overflow and return of a list. )

  return { session, profile } // return tuple of session and profile then accessible through data 
}

export const actions = {
  update: async ({ request, locals: { supabase, safeGetSession } }) => { // request is used to pull the form data through -> form in body of http req!!  
    const formData = await request.formData()

    const fullName = formData.get('fullName') as string
    const username = formData.get('username') as string
    const website = formData.get('website') as string
    const avatarUrl = formData.get('avatarUrl') as string

    const { session } = await safeGetSession()

    const { error } = await supabase.from('profiles').upsert({
      id: session?.user.id,
      full_name: fullName,
      username,
      website,
      avatar_url: avatarUrl,
      updated_at: new Date(),
    })

    if (error) {
      return fail(500, {
        fullName,
        username,
        website,
        avatarUrl,
      })
    }

    return {
      fullName,
      username,
      website,
      avatarUrl,
    }
  },
  signout: async ({locals: {supabase, safeGetSession}}) => { 
    const { session } = await safeGetSession()
    if (session) { // if there is a current session, log the user out, then redirect to the home page. 
      await supabase.auth.signOut()
      redirect(303, '/goHereOnSignout') 
    }
  },
}
