<script>
    import { onMount } from 'svelte';
    import { supabase } from '$lib/supabase';
    import { addToBasket } from '$lib/stores/basket';
    import { page } from '$app/stores';
  
    let product = null;
    let loading = true;
    let error = null;
    let productId;
  
    // Extract product ID from the page URL
    $: productId = $page.params.id;
  
    // Fetch product details from Supabase
    onMount(async () => {
      if (!productId) {
        error = 'Invalid product ID.';
        loading = false;
        return;
      }
  
      const { data, error: fetchError } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();
  
      if (fetchError) {
        error = 'Failed to load product.';
        console.error(fetchError);
      } else {
        product = data;
      }
  
      loading = false;
    });
  
    function handleAddToBasket() {
      if (product) {
        console.log("added")
        addToBasket(product);
      }else {console.log("failed here ")}
    }
  </script>
  
  <style>
      /* Styles for the heading */
  h1 {
    text-align: center;
    font-size: 2rem;
    color: #333;
    margin-top: 20px;
  }

    .product-container {
      max-width: 600px;
      margin: 40px auto;
      padding: 20px;
      text-align: center;
      background: rgba(219, 6, 6, 0.986);
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
  
    .product-image {
      width: 100%;
      max-width: 400px;
      border-radius: 8px;
      margin-bottom: 15px;
    }
  
    h1 {
      color: #03045e;
      font-size: 2rem;
    }
  
    .price {
      font-size: 1.2rem;
      font-weight: bold;
      color: #0077b6;
      margin: 15px 0;
    }
  
    button {
      background-color: #2000d8;
      color: white;
      border: none;
      padding: 12px 24px;
      font-size: 1rem;
      font-weight: 600;
      border-radius: 8px;
      cursor: pointer;
      transition: background-color 0.3s;
    }
  
    button:hover {
      background-color: #0077b6;
    }
  
    .error {
      color: red;
      font-weight: bold;
      margin-top: 20px;
    }
  </style>


  <!-- Added Heading for the Products Page -->
<h1>Product.name</h1>

  {#if loading}
    <p>Loading product...</p>
  {:else if error}
    <p class="error">{error}</p>
  {:else}
    <div class="product-container">
      <h1>{product.name}</h1>
      <img class="product-image" src={product.image_url} alt={product.name} />
      <p>{product.description}</p>
      <p class="price">£{product.price}</p>
      <button on:click={handleAddToBasket}>Add to Basket</button>
    </div>
  {/if}
  