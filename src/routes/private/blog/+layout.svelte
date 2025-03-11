<script lang="ts">

    import type { Snippet } from 'svelte';
    import type { LayoutData } from './$types';

    let { data, children }: { data: LayoutData, children: Snippet } = $props();

//Path: routes/private/blog/+layout.svelte
//This layout wraps the blog admin page, providing a consistent structure and styling.



  //import { render } from '$app/render';
</script>

<div class="blog-admin-layout">
  <aside class="sidebar">
    <h2>Admin Panel</h2>
    <nav>
      <ul>
        <li><a href="/private/blog">Manage Posts</a></li>
        <li><a href="/private/blog/new">Create Post</a></li>
        <li><a href="/private">Dashboard</a></li>
      </ul>
    </nav>
  </aside>

  <main class="content">
    {@render children()}
  </main>
</div>

<style>
  .blog-admin-layout {
    display: flex;
    height: 100vh;
  }

  .sidebar {
    width: 250px;
    background-color: #0077B6; /* Your primary color */
    color: white;
    padding: 20px;
  }

  .sidebar h2 {
    margin-bottom: 15px;
  }

  .sidebar nav ul {
    list-style: none;
    padding: 0;
  }

  .sidebar nav ul li {
    margin-bottom: 10px;
  }

  .sidebar nav a {
    color: white;
    text-decoration: none;
    font-weight: bold;
  }

  .sidebar nav a:hover {
    text-decoration: underline;
  }

  .content {
    flex: 1;
    padding: 20px;
    background: #CAF0F8; /* Light background for readability */
  }
</style>
