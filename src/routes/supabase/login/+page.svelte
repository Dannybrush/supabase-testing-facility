<script>
    import { supabase } from '$lib/supabase';
    import { goto } from '$app/navigation';

    let email = '';
    let password = '';
    let message = '';
    let isSubmitting = false; // Track submission state

    // Handle user login
    const login = async () => {
        message = ''; // Clear old messages
        isSubmitting = true; // Show "Logging in..." and disable button

        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            message = `❌ Error: ${error.message}`;
            isSubmitting = false; // Re-enable button if error
        } else {
            message = `✅ Welcome back, ${data.user.email}! Redirecting...`;
            setTimeout(() => goto('/protected'), 1500); // Redirect after 1.5s
        }
    };
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100">
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 class="text-2xl font-semibold text-center text-gray-700 mb-4">Login</h1>

        <form on:submit|preventDefault={login} class="space-y-4">
            <div>
                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" bind:value={email} required
                    class="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
                <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" id="password" bind:value={password} required
                    class="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500" />
            </div>

            <button type="submit" disabled={isSubmitting}
                class="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-200 disabled:bg-gray-400">
                {isSubmitting ? "Logging in..." : "Login"}
            </button>
        </form>

        {#if message}
            <p class="mt-4 text-center text-sm text-gray-600">{message}</p>
        {/if}
    </div>
</div>
