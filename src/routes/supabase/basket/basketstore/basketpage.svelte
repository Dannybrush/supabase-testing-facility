
<!-- (/routes/basket/+page.svelte) -->
<script>
    import { basket } from '$lib/stores/basket';
  
    function removeItem(index) {
      basket.update(items => {
        items.splice(index, 1);
        return [...items];
      });
    }
  
    function increaseQuantity(index) {
      basket.update(items => {
        items[index].quantity += 1;
        return [...items];
      });
    }
  
    function decreaseQuantity(index) {
      basket.update(items => {
        if (items[index].quantity > 1) {
          items[index].quantity -= 1;
        } else {
          items.splice(index, 1);
        }
        return [...items];
      });
    }
  </script>
  
  <h1>Your Basket</h1>
  
  {#if $basket.length === 0}
    <p>Your basket is empty.</p>
  {:else}
    <ul>
      {#each $basket as item, index}
        <li>
          <img src={item.image_url} alt={item.name} width="50" />
          <strong>{item.name}</strong> - £{item.price} x {item.quantity}
          <button on:click={() => increaseQuantity(index)}>+</button>
          <button on:click={() => decreaseQuantity(index)}>-</button>
          <button on:click={() => removeItem(index)}>Remove</button>
        </li>
      {/each}
    </ul>
    <a href="/checkout"><button>Proceed to Checkout</button></a>
  {/if}
  