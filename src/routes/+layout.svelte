<!-- src/routes/user-management/SVELTE-EXAMPLE/+layout.svelte -->

<script lang="ts">
	// Import global styles (relative to the project structure)
	import '../styles.css'
	import { invalidate } from '$app/navigation'
	import { onMount } from 'svelte'
  
	// 'data' is provided by the load functions (from both +layout.server.ts and +layout.ts)
	
  
	// Destructure supabase and session from the data. The reactive assignment ($:) ensures
	// that if the data object updates, our local variables are updated too.
	let { data, children } = $props()
	let { session, supabase } = $derived(data)
  
	onMount(() => {
	  // Subscribe to authentication state changes.
	  // This allows the app to react if, for example, the user's session expires or changes.
	  const { data } = supabase.auth.onAuthStateChange((event, newSession) => {
		// If the new session's expiry is different from the current session, invalidate the cache.
		// This triggers a reload of data related to supabase:auth.
		if (newSession?.expires_at !== session?.expires_at) {
		  invalidate('supabase:auth')
		}
	  })
  
	  // Return an unsubscribe function when the component is destroyed.
	  return () => data.subscription.unsubscribe()
	})
  </script>
  
  <svelte:head>
	<title>User Management</title>
  </svelte:head>
  {@render children()}