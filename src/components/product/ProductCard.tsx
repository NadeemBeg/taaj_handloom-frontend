import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product, CategoryRef } from '../../types/catalog';
import { PriceTag } from './PriceTag';
import { QuickView } from './QuickView';
import { WhatsAppButton } from '../whatsapp/WhatsAppButton';
import { useCart } from '../../store/cart';
import { useCustomer, selectCustomerType } from '../../store/customer';
import { useWishlist } from '../../store/wishlist';
import { resolvePrice } from '../../lib/pricing';
import { cldImg, cldSrcSet } from '../../lib/img';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { HeartIcon } from '../ui/HeartIcon';
import { productPath, absoluteUrl, categorySlugOf } from '../../lib/paths';

function availableStock(p: Product): number | undefined {
  if (p.hasVariants || !p.baseStock) return undefined;
  return p.baseStock.quantity - p.baseStock.reserved;
}

function categoryName(p: Product): string | undefined {
  const c = p.category as CategoryRef | string | undefined;
  if (!c) return undefined;
  return typeof c === 'string' ? undefined : c.name;
}

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCart((s) => s.addItem);
  const customerType = useCustomer(selectCustomerType);
  const wishItems = useWishlist((s) => s.items);
  const toggleWish = useWishlist((s) => s.toggle);
  const wished = wishItems.some((p) => p._id === product._id);
  const [quickOpen, setQuickOpen] = useState(false);
  const avail = availableStock(product);
  const out = avail !== undefined && avail <= 0;
  const low = avail !== undefined && avail > 0 && avail <= (product.baseStock?.lowStockThreshold ?? 3);
  const flags = product.flags ?? {};
  const category = categoryName(product);
  const priced = resolvePrice(product.pricing, customerType);

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
    <>
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-line/60 transition-all duration-300 ease-premium hover:-translate-y-1 hover:shadow-card-hover">
      <div className="relative aspect-[3/4] overflow-hidden bg-ivory">
        <Link to={productPath(product)} className="block h-full w-full" aria-label={product.name}>
          <img
            src={cldImg(product.media.mainImage.url, 600)}
            srcSet={cldSrcSet(product.media.mainImage.url, [300, 450, 600])}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            alt={product.media.mainImage.alt ?? product.name}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
          />
        </Link>

        {/* Flags */}
        <div className="pointer-events-none absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {flags.isNewArrival && <Badge tone="green">New</Badge>}
          {flags.isBestSeller && <Badge tone="gold">Bestseller</Badge>}
          {low && <Badge tone="warning">Only {avail} left</Badge>}
        </div>

        {/* Wishlist heart */}
        <button
          type="button"
          onClick={() => toggleWish(product)}
          aria-pressed={wished}
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-soft backdrop-blur transition-colors hover:bg-white"
        >
          <HeartIcon filled={wished} className="h-4 w-4 text-brand" />
        </button>

        {/* Quick view — reveals on hover (desktop), always tappable on touch */}
        <button
          type="button"
          onClick={() => setQuickOpen(true)}
          className="absolute inset-x-3 bottom-3 flex items-center justify-center rounded-full bg-white/95 py-2 text-sm font-semibold text-brand-deep shadow-soft backdrop-blur
            opacity-100 transition-all duration-300 ease-premium
            md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
        >
          Quick view
        </button>

        {out && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/60">
            <span className="rounded-full bg-charcoal/85 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white">
              Out of stock
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-4">
        {category && (
          <span className="text-[11px] font-semibold uppercase tracking-label text-gold">{category}</span>
        )}
        <Link to={productPath(product)}>
          <h3 className="line-clamp-2 min-h-[2.6rem] font-display text-lg leading-tight text-charcoal transition-colors group-hover:text-brand-deep">
            {product.name}
          </h3>
        </Link>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <PriceTag mrp={priced.mrp} price={priced.price} />
          {priced.isWholesale && <span className="chip">Wholesale · min {priced.minQty}</span>}
        </div>

        <div className="mt-auto flex flex-col gap-2 pt-1">
          {product.hasVariants ? (
            <Link
              to={productPath(product)}
              className="inline-flex w-full items-center justify-center rounded-full border border-brand-deep/30 px-3.5 py-1.5 text-sm font-semibold text-brand-deep transition-all duration-200 ease-premium hover:border-brand-deep/60 hover:bg-sage/50"
            >
              Select options
            </Link>
          ) : (
            <Button variant="primary" size="sm" fullWidth disabled={out} onClick={add}>
              {out ? 'Unavailable' : 'Add to cart'}
            </Button>
          )}
          <WhatsAppButton
            size="sm"
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
        </div>
      </div>
    </article>
    {quickOpen && <QuickView product={product} onClose={() => setQuickOpen(false)} />}
    </>
  );
}

