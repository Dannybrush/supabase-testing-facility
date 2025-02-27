



<script lang="ts">
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
  
    // Reactive variable to hold the authenticated user (if any)
    $: user = $page.data.user;
  
    // Track whether the dropdown is open
    let dropdownOpen = false;
  
    // Toggle the visibility of the dropdown
    function toggleDropdown() {
      dropdownOpen = !dropdownOpen;
    }
  
    // Handle logout action (you can call your Supabase signOut method here)
    async function logout() {
      // Example: you might call: await supabase.auth.signOut();
      // For now, we simply navigate to the login page
      goto('/Unauthenticated/login');
    }
  </script>
  
  <nav class="navbar">
    <!-- Logo/Brand -->
    <div class="nav-logo">
      <a href="/">My Online Store</a>
    </div>
  
    <!-- Navigation Links -->
    <div class="nav-links">
      <a href="/products">Products</a>
      {#if user}
        <!-- Profile Dropdown (only shown if user is logged in) -->
        <div class="profile-dropdown">
          <button class="dropdown-btn" on:click={toggleDropdown}>
            {user.email} &#9662;
          </button>
          {#if dropdownOpen}
            <div class="dropdown-menu">
              <a href="/Profile">Profile</a>
              <a href="/orders">Orders</a>
              <a on:click={logout} style="cursor: pointer;">Logout</a>
            </div>
          {/if}
        </div>
      {:else}
        <!-- Login/Signup links for unauthenticated users -->
        <a href="/Unauthenticated/login">Login</a>
        <a href="/Unauthenticated/signup">Sign Up</a>
      {/if}
    </div>
  </nav>
  
  <style>
    /* Navbar container styling */
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #0077b6;
      padding: 10px 20px;
      color: #ffffff;
    }
  
    /* Logo styling */
    .nav-logo a {
      color: #ffffff;
      text-decoration: none;
      font-size: 1.5rem;
      font-weight: bold;
    }
  
    /* Navigation links styling */
    .nav-links a {
      color: #ffffff;
      text-decoration: none;
      margin-left: 20px;
      font-size: 1rem;
    }
  
    /* Profile dropdown styling */
    .profile-dropdown {
      position: relative;
      display: inline-block;
      margin-left: 20px;
    }
  
    .dropdown-btn {
      background: none;
      border: none;
      color: #ffffff;
      cursor: pointer;
      font-size: 1rem;
      font-weight: bold;
    }
  
    /* Dropdown menu styling */
    .dropdown-menu {
      position: absolute;
      top: 100%;
      right: 0;
      background-color: #ffffff;
      color: #333333;
      border: 1px solid #ccc;
      border-radius: 4px;
      min-width: 150px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      z-index: 100;
    }
  
    .dropdown-menu a {
      display: block;
      padding: 10px 15px;
      text-decoration: none;
      color: #333333;
    }
  
    .dropdown-menu a:hover {
      background-color: #f4f4f4;
    }
  </style>
  