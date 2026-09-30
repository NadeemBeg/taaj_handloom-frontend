import { useLocation, useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { buildWhatsappUrl, formatINR, type WhatsappOrderLine } from '@taaj/shared';
import { fetchOrderSummary, type CreatedOrder } from '../api/orders';
import { site } from '../config/site';
import { Button } from '../components/ui/Button';
import { Spinner, EmptyState } from '../components/ui/feedback';
import { WhatsAppIcon } from '../components/whatsapp/WhatsAppButton';
import { SeoHead } from '../components/SeoHead';

interface NavState {
  order?: CreatedOrder;
  whatsappUrl?: string;
}

export function OrderConfirmation() {
  const { orderNumber } = useParams();
  const state = (useLocation().state ?? {}) as NavState;

  // Prefer the order handed over from checkout; otherwise fetch the summary.
  const query = useQuery({
    queryKey: ['order', orderNumber],
    queryFn: () => fetchOrderSummary(orderNumber as string),
    enabled: Boolean(orderNumber) && !state.order,
  });

  const order = state.order ?? query.data;

  if (!state.order && query.isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }
  if (!order) {
    return (
      <div className="mx-auto max-w-xl px-6 py-16">
        <SeoHead title="Order" />
        <EmptyState title="Order not found" action={<Link className="text-brand-deep underline" to="/products">Continue shopping</Link>} />
      </div>
    );
  }

  const whatsappUrl =
    state.whatsappUrl ??
    buildWhatsappUrl(site.whatsappNumber, {
      orderNumber: order.orderNumber,
      items: order.items.map<WhatsappOrderLine>((i) => ({
        name: i.snapshot.name,
        sku: i.snapshot.sku,
        color: i.snapshot.color,
        image: i.snapshot.image,
        quantity: i.quantity,
        unitPrice: i.unitPrice,
      })),
      total: order.amounts.total,
    });

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <SeoHead title={`Order ${order.orderNumber}`} />

      <div className="rounded-3xl bg-white p-8 text-center ring-1 ring-black/5">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-soft text-brand-deep">
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
          </svg>
        </div>
        <h1 className="mt-5 font-display text-3xl text-charcoal">Order placed!</h1>
        <p className="mt-2 text-charcoal/60">
          Your order <span className="font-semibold text-charcoal">{order.orderNumber}</span> has been
          received. Please continue on WhatsApp so we can confirm availability and delivery.
        </p>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3 text-base font-medium text-white hover:bg-[#1FB457]"
        >
          <WhatsAppIcon className="h-5 w-5" />
          Continue on WhatsApp
        </a>

        <div className="mt-8 rounded-2xl bg-ivory p-5 text-left">
          <h2 className="mb-3 font-display text-lg text-charcoal">Summary</h2>
          <ul className="space-y-2">
            {order.items.map((i, idx) => (
              <li key={idx} className="flex justify-between gap-3 text-sm">
                <span className="text-charcoal/70">
                  {i.snapshot.name}
                  {i.snapshot.color ? ` · ${i.snapshot.color}` : ''} × {i.quantity}
                </span>
                <span className="font-medium">{formatINR(i.lineTotal)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex justify-between border-t border-brand/10 pt-3">
            <span className="font-semibold text-charcoal">Total</span>
            <span className="font-semibold text-charcoal">{formatINR(order.amounts.total)}</span>
          </div>
        </div>

        <Link to="/products" className="mt-6 inline-block">
          <Button variant="outline">Continue shopping</Button>
        </Link>
      </div>
    </div>
  );
}
