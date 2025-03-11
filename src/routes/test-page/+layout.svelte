
<script>
    //import {data} from '$app/stores'
    let {data, children } = $props()
    let {supabase}  = $derived(data)
    import NavBar from '$lib/components/Nav.svelte';
    import { invalidateAll } from '$app/navigation';
   let {session} = data;
</script>

<NavBar session={session}  />

<main>
    {#if session}
        <p>Welcome back, {session.user.email}!</p>
    {:else}
        <p>Please log in to access more features.</p>
    {/if}
</main>
