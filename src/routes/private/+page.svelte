<script lang="ts">
    import { invalidate } from '$app/navigation'
    import type { EventHandler } from 'svelte/elements'
    import type { PageProps } from './$types';

    let { data }: PageProps = $props();
    let { profiles, supabase, user } = $derived(data)
  
    const handleSubmit: EventHandler<SubmitEvent, HTMLFormElement> = async (evt) => {
      evt.preventDefault()
      if (!evt.target) return
  
      const form = evt.target as HTMLFormElement
  
      const note = (new FormData(form).get('profile') ?? '') as string
      if (!note) return
  
      const { error } = await supabase.from('profiles').insert({ note })
      if (error) console.error(error)
  
      invalidate('supabase:db:profiles')
      form.reset()
    }
  </script>
  
  <h1>Private page for user: {user?.email}</h1>
  <h2>Notes</h2>
  <ul>
    {#each profiles as profile}
      <li>{profile.username}</li>
    {/each}
  </ul>
  <form onsubmit={handleSubmit}>
    <label>
      Add a note
      <input name="note" type="text" />
    </label>
  </form>