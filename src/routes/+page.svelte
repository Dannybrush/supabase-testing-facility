<script>
    let { data } = $props()
    let { profiles } = $derived(data)
  </script>
  
  <h1>Welcome to Supabase!</h1>
  <ul>
    {#each profiles as profile}
      <li>{profile.username}</li>
    {/each}
  </ul>