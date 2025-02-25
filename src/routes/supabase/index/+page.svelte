<script>
    // Import the supabase client to access your database
    import { supabase } from '$lib/supabase'
    
    // Declare a variable to store the products data
    let products = [];
    
    // Fetch the products when the component is mounted
    const fetchProducts = async () => {
      // Use the Supabase client to fetch all products from the 'products' table
      const { data, error } = await supabase.from('products').select('*');
      
      if (error) {
        console.error('Error fetching products:', error.message);
      } else {
        // If successful, store the products in the 'products' variable
        products = data;
      }
    };
    
    // Call the fetchProducts function when the component is mounted
    fetchProducts();
    </script>
    
    <h1>Product List</h1>
    
    <!-- Display the products dynamically -->
    <ul>
      {#each products as product (product.id)}
        <li>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
        </li>
      {/each}
    </ul>
    