<script lang="ts">
    import { goto } from '$app/navigation';
	import Nav from '$lib/components/Nav.svelte';
  
    
	export let data

	let { session, supabase, profile } = data
	$: ({ session, supabase, profile } = data)
    // Optional: A simple function for programmatic navigation (if needed)
    function navigateTo(path: string) {
      goto(path);
    }
  </script>
  
  <style>
    /* Hero section styling */
    .hero {
      background: url('/hero.jpg') no-repeat center center;
      background-size: cover;
      padding: 400px 20px;
      text-align: center;
      color: white;
    }
  
    h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
  
    p {
      font-size: 1.25rem;
    }
  
    nav {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-top: 20px;
    }
  
    nav a {
      text-decoration: none;
      color: #ffffff;
      background-color: rgba(0, 119, 182, 0.8);
      padding: 10px 20px;
      border-radius: 5px;
      font-weight: bold;
      transition: background-color 0.3s ease;
    }
  
    nav a:hover {
      background-color: #0077b6;
    }
  
    /* Featured products section styling */
    section {
      max-width: 1200px;
      margin: 40px auto;
      padding: 0 20px;
    }
  
    section h2 {
      font-size: 2rem;
      margin-bottom: 10px;
      text-align: center;
    }
  
    section p {
      text-align: center;
      font-size: 1.1rem;
      margin-bottom: 30px;
    }
  </style>
  
<Nav/>
  <!-- Hero Section -->
  <div class="hero">
    <h1>Welcome to Our Online Store</h1>
    <p>Your one-stop shop for amazing products!</p>
    <nav>
      <a href="/products">Shop Now</a>
      <a href="/Unauthenticated/login">Login</a>
      <a href="/Unauthenticated/signup">Sign Up</a>
    </nav>
  </div>
  
  <!-- Featured Products Section -->
  <section>
    <h2>Featured Products</h2>
    <p>Discover our latest and greatest offerings.</p>
    <!-- Placeholder: Insert product listing component or dynamic content here -->
  </section>
  