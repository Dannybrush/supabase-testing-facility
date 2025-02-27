<script>
    import { supabase } from '$lib/supabase'; // Import Supabase client
    let products = [];
    let errorMessage = '';
  
    // Fetch products from Supabase
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')  // Accessing the products table
        .select('*');      // Fetch all columns
  
      if (error) {
        errorMessage = `Error: ${error.message}`;
      } else {
        products = data;
      }
    };

  // Call fetchProducts when the component mounts
  fetchProducts();
</script>

<!-- Added Heading for the Products Page -->
<h1>Products</h1>

{#if errorMessage}
  <p style="color: red;">{errorMessage}</p>
{:else}
  <div class="products">
    {#each products as product}
      <div class="product-card">
        <a href={`/basket/products/${product.id}`} class="product-link">
          <img src={product.image_url} alt={product.name} class="product-image" />
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>£{product.price}</p>
        </a>
      </div>
    {/each}
  </div>
{/if}

<style>
    /* Styles for the heading */
    h1 {
    text-align: center;
    font-size: 2rem;
    color: #333;
    margin-top: 20px;
  }

  .products {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
  .product-card {
    width: 200px;
    padding: 1rem;
    border: 1px solid #ccc;
    text-align: center;
  }
  .product-image {
    width: 100%;
    height: auto;
  }
</style>