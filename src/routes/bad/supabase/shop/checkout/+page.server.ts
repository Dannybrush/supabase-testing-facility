import { supabase } from '$lib/supabase';

export async function load({ locals }) {
    const { data: basket } = await supabase.from('baskets').select('*, products(price)').eq('user_id', locals.user.id);
    
    if (!basket || basket.length === 0) return { redirect: '/shop' };

    const total = basket.reduce((sum, item) => sum + item.products.price * item.quantity, 0);
    
    return { basket, total };
}

export const actions = {
    default: async ({ request, locals }) => {
        const { data: basket } = await supabase.from('baskets').select('*, products(price)').eq('user_id', locals.user.id);

        const total = basket.reduce((sum, item) => sum + item.products.price * item.quantity, 0);

        const { data: order, error } = await supabase.from('orders').insert([{ user_id: locals.user.id, total_price: total }]).select();

        if (order) {
            for (const item of basket) {
                await supabase.from('order_items').insert([{ order_id: order[0].id, product_id: item.product_id, quantity: item.quantity, price: item.products.price }]);
            }
            await supabase.from('baskets').delete().eq('user_id', locals.user.id);
        }

        return { success: true, orderId: order[0].id };
    }
};
