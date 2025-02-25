import { supabase } from '$lib/supabase';

export async function load({ url }) {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) {
        return {
            status: 302,
            redirect: '/login'
        };
    }
    return { props: { user: data.user } };
}
