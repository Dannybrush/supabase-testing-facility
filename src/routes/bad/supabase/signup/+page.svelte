<script>
    import { supabase } from '$lib/supabase';

    let email = '';
    let password = '';
    let message = '';

    // Handle the signup process
    const signUp = async () => {
        const { user, error } = await supabase.auth.signUp({ email, password });
        if (error) {
            message = `Error: ${error.message}`;
        } else {
            message = `Sign-up successful! Welcome, ${user.email}`;
        }
    };
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100">
    <div class="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 class="text-2xl font-bold text-center text-gray-700 mb-4">Sign Up</h1>
        
        <form class="space-y-4" on:submit|preventDefault={signUp}>
            <!-- Email Field -->
            <div>
                <label for="email" class="block text-sm font-medium text-gray-600">Email</label>
                <input type="email" id="email" bind:value={email} required 
                    class="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"/>
            </div>

            <!-- Password Field -->
            <div>
                <label for="password" class="block text-sm font-medium text-gray-600">Password</label>
                <input type="password" id="password" bind:value={password} required 
                    class="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"/>
            </div>

            <!-- Submit Button -->
            <button type="submit"
                class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg shadow-md transition">
                Sign Up
            </button>
        </form>

        <!-- Message Display -->
        {#if message}
            <p class="mt-4 text-center text-sm text-gray-700">{message}</p>
        {/if}
    </div>
</div>
