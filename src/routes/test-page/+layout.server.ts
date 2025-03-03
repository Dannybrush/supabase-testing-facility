import { supabase } from '$lib/supabase';
import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
    const { session } = locals; // Session managed in hooks.server.ts

    return {
        session: session ?? null, // Send session to frontend
    };
}
