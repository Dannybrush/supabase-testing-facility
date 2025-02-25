<script>
    import { onMount } from 'svelte';
    import { supabase } from '$lib/supabase';

    let basket = [];

    onMount(async () => {
        const { data } = await supabase.from('baskets').select('*, products(name, price)');
        basket = data;
    });

    const removeItem = async (id) => {
        await supabase.from('baskets').delete().match({ id });
        basket = basket.filter(item => item.id !== id);
    };
</script>

<h1>Basket</h1>
<ul>
    {#each basket as item}
        <li>{item.products.name} - £{item.products.price} 
            <button on:click={() => removeItem(item.id)}>Remove</button>
        </li>
    {/each}
</ul>
<a href="/shop/checkout">Go to Checkout</a>
