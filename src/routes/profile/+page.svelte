<script>
    import { supabase } from '$lib/supabase';
    import { onMount } from 'svelte';

    let user = null;
    let message = '';

    onMount(async () => {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
            message = 'No user logged in.';
        } else {
            user = data.user;
        }
    });
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100">
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 class="text-2xl font-semibold text-center text-gray-700 mb-4">User Profile</h1>

        {#if user}
            <p class="text-center text-gray-600">Email: {user.email}</p>
            <p class="text-center text-gray-600">User ID: {user.id}</p>
        {:else}
            <p class="text-center text-red-500">{message}</p>
        {/if}
    </div>
</div>
