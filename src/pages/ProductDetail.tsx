import { useMemo, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProduct } from '../hooks/useCatalog';
import { PriceTag } from '../components/product/PriceTag';
import { Button } from '../components/ui/Button';
import { WhatsAppButton } from '../components/whatsapp/WhatsAppButton';
import { Spinner, ErrorState, EmptyState } from '../components/ui/feedback';
import { SeoHead } from '../components/SeoHead';
import { useCart } from '../store/cart';
import { useCustomer, selectCustomerType } from '../store/customer';
import { resolvePrice } from '../lib/pricing';
import { productPath, absoluteUrl, categorySlugOf, categoryNameOf } from '../lib/paths';
import { cldImg } from '../lib/img';
import type { ProductImage, Variant } from '../types/catalog';
import { cn } from '../lib/cn';

export function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const addItem = useCart((s) => s.addItem);
  const customerType = useCustomer(selectCustomerType);
  const { data, isLoading, isError, refetch } = useProduct(slug);

  const [activeImg, setActiveImg] = useState(0);
  const [variantId, setVariantId] = useState<string | undefined>();
  const [zoom, setZoom] = useState(false);

  const product = data?.product;
  const variants = data?.variants ?? [];
  const selectedVariant: Variant | undefined = variants.find((v) => v._id === variantId);

  const images: ProductImage[] = useMemo(() => {
    if (!product) return [];
    if (selectedVariant?.images?.length) return selectedVariant.images;
    return [product.media.mainImage, ...(product.media.gallery ?? [])];
  }, [product, selectedVariant]);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }
  if (isError) return <div className="mx-auto max-w-3xl px-6 py-16"><ErrorState onRetry={() => refetch()} /></div>;
  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16">
        <EmptyState title="Product not found" action={<Link className="text-brand-deep underline" to="/products">Browse products</Link>} />
      </div>
    );
  }

  const price = selectedVariant?.price ?? product.pricing.price;
  const priced = resolvePrice(product.pricing, customerType, {
    price: selectedVariant?.price,
    mrp: selectedVariant?.mrp,
    wholesalePrice: selectedVariant?.wholesalePrice,
  });

  const stock = selectedVariant?.stock ?? product.baseStock;
  const available = stock ? stock.quantity - stock.reserved : undefined;
  const needsVariant = !!product.hasVariants && !selectedVariant;
  const outOfStock = available !== undefined && available <= 0;
  const canBuy = !needsVariant && !outOfStock;

  const cartPayload = () => ({
    productId: product._id,
    slug: product.slug,
    categorySlug: categorySlugOf(product),
    variantId: selectedVariant?._id,
    name: product.name,
    sku: selectedVariant?.sku ?? product.sku,
    color: selectedVariant?.color.name,
    image: images[0]?.url,
    unitPrice: priced.price,
    mrp: priced.mrp,
    maxStock: available,
  });

  const addToCart = () => canBuy && addItem(cartPayload(), priced.minQty);
  const buyNow = () => {
    if (!canBuy) return;
    addItem(cartPayload(), priced.minQty);
    navigate('/cart');
  };

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: images.map((i) => i.url),
    description: product.shortDescription || product.description || product.name,
    sku: selectedVariant?.sku ?? product.sku,
    brand: { '@type': 'Brand', name: 'TAAJ Handloom' },
    ...(product.attributes?.material ? { material: product.attributes.material } : {}),
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: price,
      availability: outOfStock
        ? 'https://schema.org/OutOfStock'
        : 'https://schema.org/InStock',
    },
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <SeoHead
        title={product.name}
        description={product.shortDescription}
        image={product.media.mainImage.url}
        canonical={window.location.pathname}
        jsonLd={productJsonLd}
      />

      <nav className="mb-5 text-sm text-charcoal/50">
        <Link to="/products" className="hover:text-brand-deep">Products</Link>
        <span className="mx-2">/</span>
        <span className="text-charcoal/70">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Gallery */}
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => setZoom(true)}
            className="group aspect-[4/5] cursor-zoom-in overflow-hidden rounded-2xl bg-ivory"
            aria-label="Zoom image"
          >
            <img
              src={cldImg(images[activeImg]?.url ?? '', 900)}
              alt={product.name}
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </button>
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((img, i) => (
                <button
                  key={img.url + i}
                  onClick={() => setActiveImg(i)}
                  className={cn(
                    'h-20 w-16 shrink-0 overflow-hidden rounded-lg ring-1 transition',
                    i === activeImg ? 'ring-2 ring-brand-deep' : 'ring-black/10',
                  )}
                >
                  <img src={cldImg(img.url, 160)} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <h1 className="font-display text-3xl text-charcoal sm:text-4xl">{product.name}</h1>
          <p className="mt-1 text-sm text-charcoal/40">SKU: {selectedVariant?.sku ?? product.sku}</p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <PriceTag mrp={priced.mrp} price={priced.price} size="lg" />
            {priced.isWholesale && (
              <span className="chip">Wholesale price · min {priced.minQty} pcs</span>
            )}
          </div>
          {customerType === 'wholesale' && !priced.isWholesale && (
            <p className="mt-1 text-xs text-muted">
              Wholesale pricing on request — send a WhatsApp inquiry below.
            </p>
          )}

          <div className="mt-3">
            {outOfStock ? (
              <span className="text-sm font-medium text-red-600">Out of stock</span>
            ) : available !== undefined && available <= (stock?.lowStockThreshold ?? 0) ? (
              <span className="text-sm font-medium text-gold">Only {available} left</span>
            ) : (
              <span className="text-sm font-medium text-brand-deep">In stock</span>
            )}
          </div>

          {product.shortDescription && (
            <p className="mt-4 text-charcoal/70">{product.shortDescription}</p>
          )}

          {/* Variant (colour) selector */}
          {product.hasVariants && variants.length > 0 && (
            <div className="mt-6">
              <p className="mb-2 text-sm font-semibold text-charcoal/70">
                Colour{selectedVariant ? `: ${selectedVariant.color.name}` : ''}
              </p>
              <div className="flex flex-wrap gap-2">
                {variants.map((v) => {
                  const active = v._id === variantId;
                  const vOut = v.stock ? v.stock.quantity - v.stock.reserved <= 0 : false;
                  return (
                    <button
                      key={v._id}
                      onClick={() => { setVariantId(v._id); setActiveImg(0); }}
                      disabled={vOut}
                      title={v.color.name}
                      className={cn(
                        'flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition',
                        active ? 'border-brand-deep bg-brand-soft/40 text-brand-deep' : 'border-brand/20 text-charcoal/80',
                        vOut && 'cursor-not-allowed opacity-40',
                      )}
                    >
                      <span className="h-4 w-4 rounded-full ring-1 ring-black/10" style={{ backgroundColor: v.color.hex ?? '#ccc' }} />
                      {v.color.name}
                    </button>
                  );
                })}
              </div>
              {needsVariant && <p className="mt-2 text-xs text-red-500">Please select a colour.</p>}
            </div>
          )}

          {/* Actions */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button variant="outline" size="lg" fullWidth disabled={!canBuy} onClick={addToCart}>
              Add to Cart
            </Button>
            <Button variant="primary" size="lg" fullWidth disabled={!canBuy} onClick={buyNow}>
              Buy Now
            </Button>
          </div>
          <div className="mt-3">
            <WhatsAppButton
              size="lg"
              fullWidth
              payload={{
                items: [
                  {
                    name: product.name,
                    sku: selectedVariant?.sku ?? product.sku,
                    color: selectedVariant?.color.name,
                    category: categoryNameOf(product),
                    image: images[0]?.url,
                    productUrl: absoluteUrl(productPath(product)),
                    quantity: priced.minQty,
                    unitPrice: priced.price,
                  },
                ],
                total: priced.price * priced.minQty,
              }}
            />
          </div>

          {/* Trust badges */}
          <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              { t: '100% Handwoven', Icon: WeaveMark },
              { t: 'Made in Maheshwar', Icon: LoomMark },
              { t: 'Quality Checked', Icon: CheckMark },
              { t: 'Natural Yarn', Icon: LeafMark },
            ].map(({ t, Icon }) => (
              <div key={t} className="flex flex-col items-center gap-1.5 rounded-xl bg-sage/60 px-2 py-3 text-center">
                <Icon />
                <span className="text-[11px] font-medium leading-tight text-forest-700">{t}</span>
              </div>
            ))}
          </div>

          {/* Meta */}
          <dl className="mt-8 grid grid-cols-2 gap-y-3 border-t border-line pt-6 text-sm">
            <Meta label="Fabric" value={product.attributes?.fabric} />
            <Meta label="Material" value={product.attributes?.material} />
            <Meta label="Pattern" value={product.attributes?.pattern} />
            <Meta label="Occasion" value={product.attributes?.occasion?.join(', ')} />
          </dl>

          {product.description && (
            <section className="mt-8 border-t border-brand/10 pt-6">
              <h2 className="mb-2 font-display text-xl text-charcoal">Description</h2>
              <p className="whitespace-pre-line text-charcoal/70">{product.description}</p>
            </section>
          )}
          {product.careInstructions && (
            <section className="mt-6">
              <h2 className="mb-2 font-display text-xl text-charcoal">Care</h2>
              <p className="text-charcoal/70">{product.careInstructions}</p>
            </section>
          )}

          <section className="mt-6 grid gap-4 border-t border-line pt-6 sm:grid-cols-2">
            <div>
              <h3 className="font-display text-lg text-charcoal">Shipping</h3>
              <p className="mt-1 text-sm text-charcoal/60">
                Dispatched from Maheshwar within 2–4 working days. Delivery timelines are confirmed on WhatsApp.
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg text-charcoal">Returns &amp; Exchange</h3>
              <p className="mt-1 text-sm text-charcoal/60">
                Easy exchange on manufacturing defects. Message us on WhatsApp within 48 hours of delivery.
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* Image lightbox */}
      {zoom && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/90 p-4"
          onClick={() => setZoom(false)}
          role="dialog"
          aria-modal="true"
        >
          <img
            src={cldImg(images[activeImg]?.url ?? '', 1400)}
            alt={product.name}
            className="max-h-full max-w-full rounded-lg object-contain"
          />
          <button
            onClick={() => setZoom(false)}
            aria-label="Close"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-charcoal"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

function badge(children: React.ReactNode) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-gold" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}
function WeaveMark() { return badge(<path d="M3 8c3 0 3 8 6 8s3-8 6-8 3 8 6 8" />); }
function LoomMark() { return badge(<><path d="M4 5h16M4 19h16M7 5v14M17 5v14M4 12h16" /></>); }
function CheckMark() { return badge(<><circle cx="12" cy="12" r="9" /><path d="M8.5 12l2.5 2.5L16 9" /></>); }
function LeafMark() { return badge(<path d="M5 21c0-8 6-14 14-14 0 8-6 14-14 14zM5 21c4-4 8-6 10-8" />); }

function Meta({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <>
      <dt className="text-charcoal/50">{label}</dt>
      <dd className="text-charcoal/80">{value}</dd>
    </>
  );
}
