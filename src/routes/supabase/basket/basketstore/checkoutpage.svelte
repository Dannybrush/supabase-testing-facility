<!--  (/routes/checkout/+page.svelte) -->

<script>
    import { basket } from '$lib/stores/basket';
    import { supabase } from '$lib/supabase';
    import { onMount } from 'svelte';
  
    let user = null;
    let orderPlaced = false;
    let errorMessage = '';
  
    onMount(async () => {
      const { data: authUser } = await supabase.auth.getUser();
      user = authUser?.user;
    });
  
    async function placeOrder() {
      if (!user) {
        errorMessage = 'You must be logged in to place an order.';
        return;
      }
  
      const { data, error } = await supabase
        .from('orders')
        .insert([{ user_id: user.id, items: $basket }]);
  
      if (error) {
        errorMessage = `Error: ${error.message}`;
      } else {
        orderPlaced = true;
        basket.set([]); // Clear basket after order
      }
    }
  </script>
  
  <h1>Checkout</h1>
  
  {#if errorMessage}
    <p style="color: red;">{errorMessage}</p>
  {/if}
  
  {#if orderPlaced}
    <p>Your order has been placed successfully!</p>
  {:else}
    {#if $basket.length === 0}
      <p>Your basket is empty.</p>
    {:else}
      <ul>
        {#each $basket as item}
          <li>
            {item.name} - £{item.price} x {item.quantity}
          </li>
        {/each}
      </ul>
      <button on:click={placeOrder}>Confirm Order</button>
    {/if}
  {/if}
  