<script>
    import { basket, removeFromBasket } from '$lib/stores/basket';
  </script>
  
  {#each $basket as item}
    <div class="basket-item">
      <h3>{item.name}</h3>
      <p>Price: £{item.price} × {item.quantity}</p>
      <button on:click={() => removeFromBasket(item.id)}>Remove</button>
    </div>
  {/each}
  