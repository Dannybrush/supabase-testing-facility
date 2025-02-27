<!-- (/routes/products/[id]/+page.svelte) -->

<script>
    import { supabase } from '$lib/supabase';
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { basket } from '$lib/stores/basket'; // Import the basket store
  
    let product = null;
    let errorMessage = '';
  
    const fetchProduct = async (productId) => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();
  
      if (error) {
        errorMessage = `Error: ${error.message}`;
      } else {
        product = data;
      }
    };
  
    onMount(() => {
      const productId = $page.params.id;
      fetchProduct(productId);
    });
  
    function addToBasket() {
      basket.update(items => {
        const existingItem = items.find(item => item.id === product.id);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          items.push({ ...product, quantity: 1 });
        }
        return [...items];
      });
    }
  </script>
  
  {#if errorMessage}
    <p style="color: red;">{errorMessage}</p>
  {:else if product}
    <div class="product-detail">
      <h2>{product.name}</h2>
      <img src={product.image_url} alt={product.name} class="product-image" />
      <p>{product.description}</p>
      <p><strong>Price:</strong> £{product.price}</p>
      <button on:click={addToBasket}>Add to Basket</button>
    </div>
  {/if}
  