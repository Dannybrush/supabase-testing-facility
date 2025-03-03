<script>
    import NavBar from '$lib/components/Nav.svelte';
    export let session;
</script>

<NavBar {session} />

<main>
    {#if session}
        <p>Welcome back, {session.user.email}!</p>
    {:else}
        <p>Please log in to access more features.</p>
    {/if}
</main>
