<script>
    import { onMount } from 'svelte';
    import { supabase } from '$lib/supabase';
    import { goto } from '$app/navigation';

    let user = null;
    let fullName = '';
    let address = '';
    let message = '';
    let newPassword = '';

    // Fetch user details when the page loads
    onMount(async () => {
        const { data, error } = await supabase.auth.getUser();

        if (error || !data.user) {
            goto('/login'); // Redirect if not logged in
        } else {
            user = data.user;
            // Fetch user profile data
            const { data: profile } = await supabase
                .from('profiles') // Make sure this table exists
                .select('full_name, address')
                .eq('id', user.id)
                .single();

            if (profile) {
                fullName = profile.full_name || '';
                address = profile.address || '';
            }
        }
    });

    // Update Name & Address
    const updateProfile = async () => {
        message = 'Updating profile...';
        const { error } = await supabase
            .from('profiles')
            .update({ full_name: fullName, address })
            .eq('id', user.id);

        message = error ? `❌ Error: ${error.message}` : '✅ Profile updated!';
    };

    // Change Password
    const updatePassword = async () => {
        if (!newPassword) {
            message = '❌ Please enter a new password.';
            return;
        }

        message = 'Updating password...';
        const { error } = await supabase.auth.updateUser({ password: newPassword });

        message = error ? `❌ Error: ${error.message}` : '✅ Password updated!';
        newPassword = ''; // Clear input
    };

    // Logout function
    const logout = async () => {
        await supabase.auth.signOut();
        goto('/login'); // Redirect after logout
    };
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100">
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 class="text-2xl font-semibold text-center text-gray-700 mb-4">My Account</h1>

        {#if user}
            <p class="text-center text-gray-600">Logged in as: <strong>{user.email}</strong></p>

            <div class="space-y-4 mt-6">
                <h2 class="text-lg font-semibold text-gray-700">Update Profile</h2>
                <label class="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" bind:value={fullName}
                    class="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500" />

                <label class="block text-sm font-medium text-gray-700">Address</label>
                <input type="text" bind:value={address}
                    class="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500" />

                <button on:click={updateProfile}
                    class="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-200">
                    Update Profile
                </button>
            </div>

            <div class="space-y-4 mt-6">
                <h2 class="text-lg font-semibold text-gray-700">Change Password</h2>
                <label class="block text-sm font-medium text-gray-700">New Password</label>
                <input type="password" bind:value={newPassword}
                    class="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500" />

                <button on:click={updatePassword}
                    class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200">
                    Change Password
                </button>
            </div>

            <button on:click={logout}
                class="mt-6 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-200">
                Logout
            </button>

            {#if message}
                <p class="mt-4 text-center text-sm text-gray-600">{message}</p>
            {/if}
        {/if}
    </div>
</div>
