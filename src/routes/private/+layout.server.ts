import { supabase } from '$lib/supabase';
import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
    const { session } = locals; // Assuming session is managed in hooks.server.ts

    
    if (!session) {
        throw redirect(302, '/login'); // Ensure only authenticated users access this
    } 
    const { data: profile, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', session.user.id)
        .single();

    if (error) {
        console.error("Failed to fetch username:", error);
        return { username: null };
    }

    return { username: profile.username };
}