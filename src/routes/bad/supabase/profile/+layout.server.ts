import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';

/**
 * Server-side load function for the /Profile route.
 * This runs before any child page in the Profile folder is rendered.
 */
export const load = async ({ request }) => {
  // Retrieve the verified user session from Supabase.
  // Using getUser() ensures that data is fetched from the Auth server,
  // giving you trusted user information.
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error) {
    console.error('Error fetching user:', error.message);
  }

  // If no user is authenticated, redirect to the login page.
  if (!user) {
    console.log('No verified session found. Redirecting to login.');
    throw redirect(303, '/user-management/SVELTE-EXAMPLE');
  }

  // Return the trusted user data so it is available in child pages.
  return { user };
};
