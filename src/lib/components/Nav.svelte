<script lang="ts">
    import { goto } from '$app/navigation';
    //let { logout } =$props()
    async function logout() {
        const response = await fetch('/auth/logout', { method: 'POST' });

        if (response.ok) {
            location.reload(); // Refresh to reflect logout state
        } else {
            console.error('Logout failed');
        }
    }
  
    let {session = null} = $props();
    console.log("SESSION : ", session)

</script>
  
  <nav class="navbar">
    <div class="nav-left">
      <a href="/">My Online Store</a>
    </div>
    <div class="nav-right">
      <a href="/products">Products</a>
      {#if session?.user}
        <!-- Show user info and profile links if logged in -->
        <span class="user-welcome">Welcome, {session.user.email}</span>
        <a href="/private/account">Profile</a>
        <a href="/auth" onclick={(event) => { event.preventDefault(); logout(); }}>Logout</a>
      {:else}
        <!-- Otherwise, show login/signup links -->
        <a href="/auth">Login</a>
        <a href="/auth">Sign Up</a>
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
  