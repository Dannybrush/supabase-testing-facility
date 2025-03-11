import { error, redirect } from '@sveltejs/kit';
//import { createServerClient } from '@supabase/ssr';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ request, locals }) => {
    const supabase= locals.supabase;
    // Fetch all blog posts
    const { data: blogPosts, error: fetchError } = await supabase
        .from('blog_posts')
        .select('*');

    if (fetchError){ 
        console.log("the fetcherror is : ", error)
        throw error(500, 'Failed to load blog posts');
    } 
    return { blogPosts };
};

export const actions: Actions = {
    create: async ({ request,locals }) => {
        const supabase= locals.supabase;
        const formData = await request.formData();
        const title = formData.get('title') as string;
        const content = formData.get('content') as string;

        if (!title || !content) throw error(400, 'Title and content are required');

        const { error: insertError } = await supabase.from('blog_posts').insert([{ title: title,content:  content, author_id: ((await supabase.auth.getUser()).data.user?.id)  }]);
        console.log(insertError)

        if (insertError) { 
                     
            throw error(500, 'Failed to create blog post');
        }

        throw redirect(303, '/private/blog');
    },
    delete: async ({ request,locals }) => {
        const supabase= locals.supabase;
        const formData = await request.formData();
        const postId = formData.get('post_id') as string;

        if (!postId) throw error(400, 'Post ID is required');

        const { error: deleteError } = await supabase.from('blog_posts').delete().eq('id', postId);

        if (deleteError) throw error(500, 'Failed to delete blog post');

        throw redirect(303, '/private/blog');
    }
};
