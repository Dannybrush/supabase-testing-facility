<script>
    import { onMount } from 'svelte';
    import { supabase } from '$lib/supabase';
    import { goto } from '$app/navigation';

    let user = null;

    // Fetch user details when the component mounts
    onMount(async () => {
        const { data, error } = await supabase.auth.getUser();

        if (error || !data.user) {
            goto('/login'); // Redirect to login page if not authenticated
        } else {
            user = data.user;
        }
    });

    // Logout function
    const logout = async () => {
        await supabase.auth.signOut();
        goto('/login'); // Redirect to login after logout
    };
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100">
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 class="text-2xl font-semibold text-center text-gray-700 mb-4">Protected Page</h1>

        {#if user}
            <p class="text-center text-gray-600">Welcome, {user.email}!</p>
            <p class="text-center text-gray-600">User ID: {user.id}</p>

            <button on:click={logout}
                class="mt-4 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-200">
                Logout
            </button>
        {/if}
    </div>
</div>
