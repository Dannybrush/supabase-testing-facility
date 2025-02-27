<script lang="ts">
    import { supabase } from '$lib/supabase';
    import { goto } from '$app/navigation';
  
    let email = '';
    let password = '';
    let errorMessage = '';
    let successMessage = '';
  
    // Handles user sign-up using Supabase auth
    const signup = async () => {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        errorMessage = error.message;
      } else {
        // Inform the user and redirect to login after a short delay
        successMessage = 'Sign-up successful! Please check your email to verify your account, then log in.';
        setTimeout(() => goto('/Unauthenticated/login'), 2000);
      }
    };
  </script>
  
  <h1>Sign Up</h1>
  {#if errorMessage}
    <p style="color: red;">{errorMessage}</p>
  {/if}
  {#if successMessage}
    <p style="color: green;">{successMessage}</p>
  {/if}
  <form on:submit|preventDefault={signup}>
    <div>
      <label for="email">Email:</label>
      <input type="email" id="email" bind:value={email} required />
    </div>
    <div>
      <label for="password">Password:</label>
      <input type="password" id="password" bind:value={password} required />
    </div>
    <button type="submit">Sign Up</button>
  </form>
  