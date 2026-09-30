import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { formatINR } from '@taaj/shared';
import { useCart, selectSubtotal } from '../store/cart';
import { useCustomer, selectCustomerType } from '../store/customer';
import { createOrder, type CreateOrderPayload } from '../api/orders';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/feedback';
import { SeoHead } from '../components/SeoHead';

const schema = z.object({
  name: z.string().trim().min(2, 'Please enter your name'),
  phone: z.string().trim().regex(/^(\+?91)?[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'),
  whatsapp: z.string().trim().regex(/^(\+?91)?[6-9]\d{9}$/, 'Enter a valid number').optional().or(z.literal('')),
  email: z.string().trim().email('Enter a valid email').optional().or(z.literal('')),
  line1: z.string().trim().min(3, 'Address is required'),
  line2: z.string().trim().optional(),
  city: z.string().trim().min(2, 'City is required'),
  state: z.string().trim().min(2, 'State is required'),
  pincode: z.string().trim().regex(/^\d{6}$/, 'Enter a valid 6-digit pincode'),
  country: z.string().trim().min(2),
  notes: z.string().max(1000).optional(),
});
type CheckoutForm = z.infer<typeof schema>;

export function Checkout() {
  const navigate = useNavigate();
  const items = useCart((s) => s.items);
  const subtotal = useCart(selectSubtotal);
  const couponCode = useCart((s) => s.couponCode);
  const clear = useCart((s) => s.clear);
  const customerType = useCustomer(selectCustomerType);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(schema),
    defaultValues: { country: 'India' },
  });

  const mutation = useMutation({
    mutationFn: (payload: CreateOrderPayload) => createOrder(payload),
    onSuccess: ({ order, whatsappUrl }) => {
      clear();
      navigate(`/order/${order.orderNumber}`, { state: { order, whatsappUrl } });
    },
  });

  if (items.length === 0 && !mutation.isPending) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16">
        <SeoHead title="Checkout" />
        <EmptyState
          title="Nothing to check out"
          action={<Link className="text-brand-deep underline" to="/products">Continue shopping</Link>}
        />
      </div>
    );
  }

  const onSubmit = (values: CheckoutForm) => {
    const payload: CreateOrderPayload = {
      contact: {
        name: values.name,
        phone: values.phone,
        whatsapp: values.whatsapp || values.phone,
        email: values.email || undefined,
      },
      shippingAddress: {
        line1: values.line1,
        line2: values.line2 || undefined,
        city: values.city,
        state: values.state,
        pincode: values.pincode,
        country: values.country,
      },
      items: items.map((i) => ({ product: i.productId, variant: i.variantId, quantity: i.quantity })),
      customerType,
      couponCode: couponCode || undefined,
      notes: values.notes || undefined,
    };
    mutation.mutate(payload);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <SeoHead title="Checkout" />
      <h1 className="font-display text-3xl text-charcoal">Checkout</h1>
      <p className="mt-1 text-sm text-charcoal/50">
        Enter your details — we'll create your order and continue on WhatsApp to confirm.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <fieldset className="rounded-2xl bg-white p-6 ring-1 ring-black/5">
            <legend className="px-2 font-display text-lg text-charcoal">Contact</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name" error={errors.name?.message}>
                <input className="tf" {...register('name')} />
              </Field>
              <Field label="Mobile number" error={errors.phone?.message}>
                <input className="tf" inputMode="tel" {...register('phone')} />
              </Field>
              <Field label="WhatsApp number (optional)" error={errors.whatsapp?.message}>
                <input className="tf" inputMode="tel" placeholder="Same as mobile" {...register('whatsapp')} />
              </Field>
              <Field label="Email (optional)" error={errors.email?.message}>
                <input className="tf" inputMode="email" {...register('email')} />
              </Field>
            </div>
          </fieldset>

          <fieldset className="rounded-2xl bg-white p-6 ring-1 ring-black/5">
            <legend className="px-2 font-display text-lg text-charcoal">Delivery address</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Address line 1" error={errors.line1?.message} full>
                <input className="tf" {...register('line1')} />
              </Field>
              <Field label="Address line 2 (optional)" full>
                <input className="tf" {...register('line2')} />
              </Field>
              <Field label="City" error={errors.city?.message}>
                <input className="tf" {...register('city')} />
              </Field>
              <Field label="State" error={errors.state?.message}>
                <input className="tf" {...register('state')} />
              </Field>
              <Field label="Pincode" error={errors.pincode?.message}>
                <input className="tf" inputMode="numeric" {...register('pincode')} />
              </Field>
              <Field label="Country" error={errors.country?.message}>
                <input className="tf" {...register('country')} />
              </Field>
              <Field label="Order notes (optional)" full>
                <textarea className="tf min-h-20" {...register('notes')} />
              </Field>
            </div>
          </fieldset>
        </div>

        {/* Summary */}
        <aside className="h-fit rounded-2xl bg-ivory p-6 ring-1 ring-black/5">
          <h2 className="font-display text-xl text-charcoal">Your order</h2>
          <ul className="mt-4 space-y-3">
            {items.map((i) => (
              <li key={i.key} className="flex justify-between gap-3 text-sm">
                <span className="min-w-0 text-charcoal/70">
                  {i.name}
                  {i.color ? ` · ${i.color}` : ''} × {i.quantity}
                </span>
                <span className="shrink-0 font-medium">{formatINR(i.unitPrice * i.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-brand/10 pt-3">
            <span className="font-semibold text-charcoal">Total</span>
            <span className="font-semibold text-charcoal">{formatINR(subtotal)}</span>
          </div>

          {mutation.isError && (
            <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {(mutation.error as { response?: { data?: { message?: string } } })?.response?.data
                ?.message ?? 'Could not place order. Please try again.'}
            </p>
          )}

          <Button type="submit" size="lg" fullWidth className="mt-6" disabled={mutation.isPending}>
            {mutation.isPending ? 'Placing order…' : 'Place Order & Continue on WhatsApp'}
          </Button>
          <p className="mt-3 text-center text-xs text-charcoal/40">
            No online payment now — you'll confirm details with us on WhatsApp.
          </p>
        </aside>
      </form>
    </div>
  );
}

function Field({
  label,
  error,
  full,
  children,
}: {
  label: string;
  error?: string;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className={`flex flex-col gap-1 ${full ? 'sm:col-span-2' : ''}`}>
      <span className="text-sm font-medium text-charcoal/70">{label}</span>
      {children}
      {error && <span className="text-xs text-red-500">{error}</span>}
    </label>
  );
}
