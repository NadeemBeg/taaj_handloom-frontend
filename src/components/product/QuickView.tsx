import { Link } from 'react-router-dom';
import type { Product, CategoryRef } from '../../types/catalog';
import { PriceTag } from './PriceTag';
import { WhatsAppButton } from '../whatsapp/WhatsAppButton';
import { Button } from '../ui/Button';
import { useCart } from '../../store/cart';
import { useCustomer, selectCustomerType } from '../../store/customer';
import { resolvePrice } from '../../lib/pricing';
import { cldImg } from '../../lib/img';
import { productPath, absoluteUrl, categorySlugOf } from '../../lib/paths';

function categoryName(p: Product): string | undefined {
  const c = p.category as CategoryRef | string | undefined;
  return c && typeof c !== 'string' ? c.name : undefined;
}

/** Lightweight product preview shown from a card without leaving the listing. */
export function QuickView({ product, onClose }: { product: Product; onClose: () => void }) {
  const addItem = useCart((s) => s.addItem);
  const customerType = useCustomer(selectCustomerType);
  const priced = resolvePrice(product.pricing, customerType);
  const avail = !product.hasVariants && product.baseStock
    ? product.baseStock.quantity - product.baseStock.reserved
    : undefined;
  const out = avail !== undefined && avail <= 0;
  const category = categoryName(product);

  const add = () =>
    addItem(
      {
        productId: product._id,
        slug: product.slug,
        categorySlug: categorySlugOf(product),
        name: product.name,
        sku: product.sku,
        image: product.media.mainImage.url,
        unitPrice: priced.price,
        mrp: priced.mrp,
        maxStock: avail,
      },
      priced.minQty,
    );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/60 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
    >
      <div
        className="relative grid w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-card-hover sm:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-charcoal shadow-soft"
        >
          ✕
        </button>

        <div className="aspect-[4/5] bg-ivory sm:aspect-auto">
          <img
            src={cldImg(product.media.mainImage.url, 600)}
            alt={product.media.mainImage.alt ?? product.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-3 p-5 sm:p-6">
          {category && (
            <span className="text-[11px] font-semibold uppercase tracking-label text-gold">{category}</span>
          )}
          <h2 className="font-display text-2xl leading-tight text-charcoal">{product.name}</h2>
          <div className="flex flex-wrap items-center gap-2">
            <PriceTag mrp={priced.mrp} price={priced.price} size="lg" />
            {priced.isWholesale && <span className="chip">Wholesale · min {priced.minQty}</span>}
          </div>
          {product.shortDescription && (
            <p className="line-clamp-3 text-sm text-charcoal/60">{product.shortDescription}</p>
          )}

          <div className="mt-auto flex flex-col gap-2 pt-2">
            {product.hasVariants ? (
              <Link
                to={productPath(product)}
                className="inline-flex w-full items-center justify-center rounded-full border border-brand-deep/30 px-4 py-2 text-sm font-semibold text-brand-deep transition-colors hover:border-brand-deep/60 hover:bg-sage/50"
              >
                Select options
              </Link>
            ) : (
              <Button variant="primary" fullWidth disabled={out} onClick={add}>
                {out ? 'Out of stock' : 'Add to Cart'}
              </Button>
            )}
            <WhatsAppButton
              fullWidth
              label="Order on WhatsApp"
              payload={{
                items: [
                  {
                    name: product.name,
                    sku: product.sku,
                    category,
                    image: product.media.mainImage.url,
                    productUrl: absoluteUrl(productPath(product)),
                    quantity: priced.minQty,
                    unitPrice: priced.price,
                  },
                ],
                total: priced.price * priced.minQty,
              }}
            />
            <Link to={productPath(product)} className="mt-1 text-center text-sm font-medium text-brand-deep hover:underline">
              View full details →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
