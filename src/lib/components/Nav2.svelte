<script>
  export let session; // Passed securely from server-side

  let loggedIn = session !== null;
</script>

<nav class="navbar">
  <div class="nav-left">
      <a href="/">Home</a>
  </div>

  <div class="nav-right">
      {#if loggedIn}
          <a href="/profile">Profile</a>
          <form method="post" action="?/logout">
              <button type="submit">Logout</button>
          </form>
      {:else}
          <a href="/signup">Sign Up</a>
          <a href="/login">Login</a>
      {/if}
  </div>
</nav>

<style>
  .navbar {
      display: flex;
      justify-content: space-between;
      padding: 1rem;
      background: #0077b6;
      color: white;
  }

  .nav-right {
      display: flex;
      gap: 1rem;
  }

  a, button {
      color: white;
      text-decoration: none;
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1rem;
  }

  button:hover, a:hover {
      text-decoration: underline;
  }
</style>
