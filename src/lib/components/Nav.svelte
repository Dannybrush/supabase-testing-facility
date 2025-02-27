<script lang="ts">
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
  
    // Reactive statement: if the page's data includes a user, we assign it to 'user'.
    $: user = $page.data.user;
  
    // A simple logout function; in a real app, you would call supabase.auth.signOut() here.
    async function logout() {
      // Example: await supabase.auth.signOut();
      // For now, we simply navigate to the login page.
      goto('/Unauthenticated/login');
    }
  </script>
  
  <nav class="navbar">
    <div class="nav-left">
      <a href="/">My Online Store</a>
    </div>
    <div class="nav-right">
      <a href="/products">Products</a>
      {#if user}
        <!-- Show user info and profile links if logged in -->
        <span class="user-welcome">Welcome, {user.email}</span>
        <a href="/Profile">Profile</a>
        <a href="#" on:click|preventDefault={logout}>Logout</a>
      {:else}
        <!-- Otherwise, show login/signup links -->
        <a href="/Unauthenticated/login">Login</a>
        <a href="/Unauthenticated/signup">Sign Up</a>
      {/if}
    </div>
  </nav>
  
  <style>
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #0077b6;
      padding: 10px 20px;
      color: white;
    }
  
    .nav-left a {
      font-size: 1.5rem;
      font-weight: bold;
      color: white;
      text-decoration: none;
    }
  
    .nav-right {
      display: flex;
      align-items: center;
      gap: 20px;
    }
  
    .nav-right a {
      color: white;
      text-decoration: none;
      font-size: 1rem;
    }
  
    .user-welcome {
      font-weight: bold;
      font-size: 1rem;
    }
  </style>
  