import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CustomerType = 'individual' | 'wholesale';

interface CustomerState {
  customerType: CustomerType;
  setCustomerType: (t: CustomerType) => void;
}

/**
 * Persisted shopping mode — retail (individual) vs wholesale.
 *
 * The wholesale mode + pricing logic is intentionally kept intact for future
 * use, but the customer-facing site currently exposes retail pricing only (the
 * header switch was removed). The `migrate` step below coerces any previously
 * persisted `wholesale` selection back to `individual` so returning visitors
 * always see retail prices. To re-enable wholesale on the storefront later,
 * restore the header toggle — no store changes are required.
 */
export const useCustomer = create<CustomerState>()(
  persist(
    (set) => ({
      customerType: 'individual',
      setCustomerType: (customerType) => set({ customerType }),
    }),
    {
      name: 'taaj-customer-type',
      version: 2,
      migrate: (persisted) => ({
        ...(persisted as CustomerState),
        customerType: 'individual',
      }),
    },
  ),
);

export const selectCustomerType = (s: CustomerState) => s.customerType;
