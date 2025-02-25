import { writable } from 'svelte/store';
import { supabase } from '$lib/supabase';

export const basket = writable([]); // Local store for basket items

// Function to load basket from Supabase
export async function loadBasket(userId) {
  if (!userId) return;

  const { data, error } = await supabase
    .from('carts')
    .select('items')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error loading basket:', error.message);
  } else {
    basket.set(data?.items || []);
  }
}

// Function to save basket to Supabase
export async function saveBasket(userId) {
  if (!userId) return;

  basket.subscribe(async items => {
    await supabase
      .from('carts')
      .upsert({ user_id: userId, items }, { onConflict: ['user_id'] });
  });
}

// Function to add an item to the basket
export function addToBasket(product) {
  basket.update(items => {
    const existing = items.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      items.push({ ...product, quantity: 1 });
    }
    return items;
  });
}

// Function to remove an item from the basket
export function removeFromBasket(productId) {
  basket.update(items => items.filter(item => item.id !== productId));
}
