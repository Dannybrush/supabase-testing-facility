<!-- src/routes/user-management/SVELTE-EXAMPLE/+page.svelte -->

<script lang="ts">
	// Import SvelteKit's form enhancement to allow progressive enhancement
	import { enhance } from '$app/forms'
	// Import types for the form data and the submit function
	import type { ActionData, SubmitFunction } from '../../$types.js'
  
	// 'form' is passed in as a prop, containing any data returned from the server action (like error messages or success messages).
	export let form: ActionData;
  
	let loading = false
  
	// Define a custom submit handler that toggles the loading state.
	const handleSubmit: SubmitFunction = () => {
	  loading = true
	  return async ({ update }) => {
		update() // refreshes the data from the server after submission
		loading = false
	  }
	}
  </script>
  
  <svelte:head>
	<title>User Management</title>
  </svelte:head>
  
  <!-- The form for entering the email to get a magic link -->
  <form class="row flex flex-center" method="POST" use:enhance={handleSubmit}>
	<div class="col-6 form-widget">
	  <h1 class="header">Supabase + SvelteKit</h1>
	  <p class="description">Sign in via magic link with your email below</p>
  
	  <!-- If there's a message from the server (e.g., success or error) display it -->
	  {#if form?.message !== undefined}
		<div class="success {form?.success ? '' : 'fail'}">
		  {form?.message}
		</div>
	  {/if}
  
	  <div>
		<label for="email">Email address</label>
		<input
		  id="email"
		  name="email"
		  class="inputField"
		  type="email"
		  placeholder="Your email"
		  value={form?.email ?? ''}
		/>
	  </div>
  
	  <!-- If there are any field-specific errors, display them -->
	  {#if form?.errors?.email}
		<span class="flex items-center text-sm error">
		  {form?.errors?.email}
		</span>
	  {/if}
  
	  <div>
		<button class="button primary block">
		  { loading ? 'Loading' : 'Send magic link' }
		</button>
	  </div>
	</div>
  </form>
  