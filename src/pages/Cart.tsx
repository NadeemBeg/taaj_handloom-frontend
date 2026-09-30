import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { formatINR, discountPercent, type WhatsappOrderLine } from '@taaj/shared';
import { useCart, selectSubtotal, selectMrpTotal } from '../store/cart';
import { useCustomer, selectCustomerType } from '../store/customer';
import { validateCoupon } from '../api/catalog';
import { Button } from '../components/ui/Button';
import { WhatsAppButton } from '../components/whatsapp/WhatsAppButton';
import { EmptyState } from '../components/ui/feedback';
import { SeoHead } from '../components/SeoHead';
import { absoluteUrl } from '../lib/paths';

export function Cart() {
  const items = useCart((s) => s.items);
  const increment = useCart((s) => s.increment);
  const decrement = useCart((s) => s.decrement);
  const removeItem = useCart((s) => s.removeItem);
  const subtotal = useCart(selectSubtotal);
  const mrpTotal = useCart(selectMrpTotal);
  const savings = mrpTotal - subtotal;
  const customerType = useCustomer(selectCustomerType);
  const couponCode = useCart((s) => s.couponCode);
  const setCouponCode = useCart((s) => s.setCouponCode);
  const [codeInput, setCodeInput] = useState(couponCode ?? '');

  // Re-validate the applied coupon whenever the code or subtotal changes.
  const coupon = useQuery({
    queryKey: ['coupon', couponCode, subtotal],
    queryFn: () => validateCoupon(couponCode as string, subtotal),
    enabled: Boolean(couponCode) && subtotal > 0,
    retry: false,
  });
  const discount = coupon.data?.discount ?? 0;
  const total = Math.max(0, subtotal - discount);
  const couponError = coupon.isError
    ? ((coupon.error as { response?: { data?: { message?: string } } })?.response?.data?.message ?? 'Invalid coupon')
    : null;

  const whatsappItems: WhatsappOrderLine[] = items.map((i) => ({
    name: i.name,
    sku: i.sku,
    color: i.color,
    image: i.image,
    productUrl: i.categorySlug ? absoluteUrl(`/${i.categorySlug}/${i.slug}`) : undefined,
    quantity: i.quantity,
    unitPrice: i.unitPrice,
  }));

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16">
        <SeoHead title="Cart" />
        <EmptyState
          title="Your cart is empty"
          description="Explore our handwoven Maheshwari collection."
          action={
            <Link to="/products">
              <Button className="mt-2">Shop now</Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <SeoHead title="Cart" />
      <h1 className="font-display text-3xl text-charcoal">Your Cart</h1>

      {customerType === 'wholesale' && (
        <div className="mt-4 rounded-xl border border-gold/30 bg-gold-soft/50 px-4 py-3 text-sm text-charcoal/80">
          <span className="font-semibold text-brand-deep">Wholesale mode:</span> prices reflect wholesale
          rates and minimum order quantities. Send your order on WhatsApp and we'll confirm final pricing.
        </div>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => {
            const off = discountPercent(item.mrp, item.unitPrice);
            return (
              <div key={item.key} className="flex gap-4 rounded-2xl bg-white p-4 ring-1 ring-black/5">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-24 w-20 shrink-0 rounded-lg object-cover"
                />
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="truncate font-display text-lg text-charcoal">{item.name}</h3>
                      <p className="text-xs text-charcoal/40">
                        SKU: {item.sku}
                        {item.color ? ` · ${item.color}` : ''}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.key)}
                      className="text-sm text-charcoal/40 hover:text-red-500"
                      aria-label={`Remove ${item.name}`}
                    >
                      ✕
                    </button>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="flex items-center rounded-full border border-brand/20">
                      <QtyBtn onClick={() => decrement(item.key)} label="Decrease">–</QtyBtn>
                      <span className="min-w-8 text-center text-sm">{item.quantity}</span>
                      <QtyBtn onClick={() => increment(item.key)} label="Increase">+</QtyBtn>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-charcoal">{formatINR(item.unitPrice * item.quantity)}</p>
                      {off > 0 && <p className="text-xs text-charcoal/40 line-through">{formatINR(item.mrp * item.quantity)}</p>}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <aside className="h-fit rounded-2xl bg-ivory p-6 ring-1 ring-black/5">
          <h2 className="font-display text-xl text-charcoal">Order Summary</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <Row label="Subtotal" value={formatINR(mrpTotal)} />
            {savings > 0 && <Row label="Discount" value={`– ${formatINR(savings)}`} accent />}
            {discount > 0 && <Row label={`Coupon ${coupon.data?.code ?? ''}`} value={`– ${formatINR(discount)}`} accent />}
            <div className="border-t border-line pt-3">
              <Row label="Total" value={formatINR(total)} bold />
            </div>
          </dl>

          {/* Coupon */}
          <div className="mt-4">
            {couponCode && discount > 0 ? (
              <div className="flex items-center justify-between rounded-lg bg-success-soft px-3 py-2 text-sm">
                <span className="font-medium text-success">Coupon {coupon.data?.code} applied</span>
                <button onClick={() => { setCouponCode(undefined); setCodeInput(''); }} className="text-charcoal/50 hover:text-error">Remove</button>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); if (codeInput.trim()) setCouponCode(codeInput.trim().toUpperCase()); }}
                className="flex gap-2"
              >
                <input
                  value={codeInput}
                  onChange={(e) => setCodeInput(e.target.value)}
                  placeholder="Coupon code"
                  className="tf uppercase"
                  aria-label="Coupon code"
                />
                <Button type="submit" variant="secondary" disabled={coupon.isFetching}>
                  {coupon.isFetching ? '…' : 'Apply'}
                </Button>
              </form>
            )}
            {couponError && <p className="mt-1.5 text-xs text-error">{couponError}</p>}
          </div>

          <Link to="/checkout" className="mt-6 block">
            <Button size="lg" fullWidth>Proceed to Checkout</Button>
          </Link>
          <div className="mt-3">
            <WhatsAppButton
              size="lg"
              fullWidth
              label="Order on WhatsApp"
              payload={{
                items: whatsappItems,
                total,
                coupon: discount > 0 ? { code: coupon.data!.code, discount } : undefined,
              }}
            />
          </div>
          <p className="mt-3 text-center text-xs text-charcoal/40">
            Orders are confirmed on WhatsApp. Checkout collects your details first.
          </p>
        </aside>
      </div>
    </div>
  );
}

function QtyBtn({ children, onClick, label }: { children: React.ReactNode; onClick: () => void; label: string }) {
  return (
    <button onClick={onClick} aria-label={label} className="h-9 w-9 text-charcoal/70 hover:text-brand-deep">
      {children}
    </button>
  );
}
function Row({ label, value, bold, accent }: { label: string; value: string; bold?: boolean; accent?: boolean }) {
  return (
    <div className="flex justify-between">
      <dt className={bold ? 'font-semibold text-charcoal' : 'text-charcoal/60'}>{label}</dt>
      <dd className={accent ? 'font-medium text-brand-deep' : bold ? 'font-semibold text-charcoal' : 'text-charcoal/80'}>
        {value}
      </dd>
    </div>
  );
}
