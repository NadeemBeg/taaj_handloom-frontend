import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  key: string; // productId + variantId
  productId: string;
  slug: string;
  categorySlug?: string;
  variantId?: string;
  name: string;
  sku: string;
  color?: string;
  image?: string;
  unitPrice: number;
  mrp: number;
  quantity: number;
  maxStock?: number;
}

interface CartState {
  items: CartItem[];
  couponCode?: string;
  addItem: (item: Omit<CartItem, 'key' | 'quantity'>, qty?: number) => void;
  removeItem: (key: string) => void;
  setQuantity: (key: string, qty: number) => void;
  increment: (key: string) => void;
  decrement: (key: string) => void;
  setCouponCode: (code?: string) => void;
  clear: () => void;
}

function makeKey(productId: string, variantId?: string) {
  return variantId ? `${productId}:${variantId}` : productId;
}

function clampQty(qty: number, max?: number): number {
  const floor = Math.max(1, Math.floor(qty));
  return max && max > 0 ? Math.min(floor, max) : floor;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (item, qty = 1) =>
        set((state) => {
          const key = makeKey(item.productId, item.variantId);
          const existing = state.items.find((i) => i.key === key);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.key === key ? { ...i, quantity: clampQty(i.quantity + qty, i.maxStock) } : i,
              ),
            };
          }
          return { items: [...state.items, { ...item, key, quantity: clampQty(qty, item.maxStock) }] };
        }),

      removeItem: (key) => set((state) => ({ items: state.items.filter((i) => i.key !== key) })),

      setQuantity: (key, qty) =>
        set((state) => ({
          items: state.items.map((i) => (i.key === key ? { ...i, quantity: clampQty(qty, i.maxStock) } : i)),
        })),

      increment: (key) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.key === key ? { ...i, quantity: clampQty(i.quantity + 1, i.maxStock) } : i,
          ),
        })),

      decrement: (key) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.key === key ? { ...i, quantity: i.quantity - 1 } : i))
            .filter((i) => i.quantity > 0),
        })),

      setCouponCode: (code) => set({ couponCode: code || undefined }),

      clear: () => set({ items: [], couponCode: undefined }),
    }),
    { name: 'taaj-cart' },
  ),
);

/** Derived selectors. */
export const selectCount = (s: CartState) => s.items.reduce((n, i) => n + i.quantity, 0);
export const selectSubtotal = (s: CartState) => s.items.reduce((n, i) => n + i.unitPrice * i.quantity, 0);
export const selectMrpTotal = (s: CartState) => s.items.reduce((n, i) => n + i.mrp * i.quantity, 0);
