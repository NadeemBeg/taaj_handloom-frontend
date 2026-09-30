import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../types/catalog';

interface WishlistState {
  items: Product[];
  toggle: (product: Product) => void;
  remove: (id: string) => void;
  has: (id: string) => boolean;
  clear: () => void;
}

/** Persisted wishlist of full product summaries (renderable without a refetch). */
export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (product) =>
        set((state) => {
          const exists = state.items.some((p) => p._id === product._id);
          return {
            items: exists
              ? state.items.filter((p) => p._id !== product._id)
              : [product, ...state.items],
          };
        }),
      remove: (id) => set((state) => ({ items: state.items.filter((p) => p._id !== id) })),
      has: (id) => get().items.some((p) => p._id === id),
      clear: () => set({ items: [] }),
    }),
    { name: 'taaj-wishlist' },
  ),
);

export const selectWishlistCount = (s: WishlistState) => s.items.length;
