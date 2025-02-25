<!-- src/routes/products/[id]/+page.svelte -->
<script>
    import { supabase } from '$lib/supabase';
    import { onMount } from 'svelte';
    import { addToBasket } from '$lib/stores/basket';
    import { page } from '$app/stores';  // For accessing route params
  
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

    function handleAddToBasket() {
      addToBasket(product);
      console.log(product)
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
      <button on:click={handleAddToBasket}>Add to Basket</button>
    </div>
  {/if}
 