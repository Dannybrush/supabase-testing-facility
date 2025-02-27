<script>
  // Import the basket store and a function to remove items from the basket
  import { basket, removeFromBasket } from '$lib/stores/basket';
</script>

<!-- Added Heading for the Basket Page -->
<h1>Your Basket</h1>

{#if $basket.length === 0}
  <!-- Message when the basket is empty -->
  <p>Your basket is empty.</p>
{:else}
  <!-- Container for all basket items -->
  <div class="basket-container">
    {#each $basket as item}
      <!-- Individual basket item -->
      <div class="basket-item">
        <h3 class="item-title">{item.name}</h3>
        <p class="item-details">Price: £{item.price} × {item.quantity}</p>
        <button class="remove-btn" on:click={() => removeFromBasket(item.id)}>Remove</button>
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

  /* Container for the entire basket */
  .basket-container {
    max-width: 600px;
    margin: 20px auto;
    padding: 0 10px;
  }

  /* Styling for each basket item */
  .basket-item {
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    transition: background-color 0.3s;
  }

  .basket-item:hover {
    background-color: #f0f0f0;
  }

  /* Title styling for each item */
  .item-title {
    margin: 0 0 5px;
    font-size: 1.25rem;
    color: #333;
  }

  /* Styling for item details */
  .item-details {
    margin: 0 0 10px;
    font-size: 1rem;
    color: #666;
  }

  /* Styling for the Remove button */
  .remove-btn {
    background-color: #e63946;
    color: #fff;
    border: none;
    padding: 8px 12px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .remove-btn:hover {
    background-color: #d62828;
  }
</style>
