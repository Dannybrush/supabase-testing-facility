<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

{@render children()}

<!-- 
<script>
  import { supabase } from '$lib/supabase';
  import { basket, loadBasket, saveBasket } from '$lib/stores/basket';
  import { onMount } from 'svelte';

  let user = null;

  onMount(async () => {
    const { data: authUser } = await supabase.auth.getUser();
    user = authUser?.user;

    if (user) {
      await loadBasket(user.id);
      saveBasket(user.id);
    }
  });
</script>

<slot />

-->