<script>
    import { basket } from '$lib/stores/basket';
  
    async function handleCheckout() {
      basket.set([]); // Clear basket
      alert('Checkout successful! Your order has been placed.');
    }
  </script>
  
  <button on:click={handleCheckout}>Checkout</button>
  