// File: src/routes/blog/+page.server.ts
// Description: Server-side logic to fetch blog posts securely from Supabase using SSR.

import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
    const supabase= locals.supabase;
    const { data: blogPosts, error:fetchError } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

    if (fetchError) {
        console.error('Error fetching blog posts:', error.message);
        throw error(500, 'Failed to load blog posts');
    }

    return { blogPosts };
};
/*
export const actions: Actions = {
    create: async ({ request, locals }) => {
        const supabase = locals.supabase;
        const formData = await request.formData();

        const title = formData.get('title')?.toString();
        const content = formData.get('content')?.toString();
        const user = locals.session?.user;

        if (!user) {
            return { error: 'Unauthorized' };
        }

        const { error } = await supabase.from('blog_posts').insert([
            { title, content, author_id: user.id }
        ]);

        if (error) {
            return { error: error.message };
        }

        return { success: true };
    }
};*/