<script>
    export let data;
    let { basket, total } = data;
</script>

<h1>Checkout</h1>
<ul>
    {#each basket as item}
        <li>{item.products.name} - £{item.products.price} x {item.quantity}</li>
    {/each}
</ul>
<p><strong>Total: £{total}</strong></p>

<form method="POST">
    <button type="submit">Place Order</button>
</form>
