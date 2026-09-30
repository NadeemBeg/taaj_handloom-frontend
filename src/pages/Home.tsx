import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useProducts, useCategories, useBanners } from '../hooks/useCatalog';
import { useSite } from '../hooks/useSite';
import { ProductGrid } from '../components/product/ProductGrid';
import { HeroSlider } from '../components/home/HeroSlider';
import { CharkhaStory } from '../components/home/CharkhaStory';
import { SocialStrip } from '../components/home/SocialStrip';
import { Button } from '../components/ui/Button';
import { WhatsAppButton } from '../components/whatsapp/WhatsAppButton';
import { CategoryCircle } from '../components/catalog/CategoryCircle';
import { CategoryRail } from '../components/catalog/CategoryRail';
import { SeoHead } from '../components/SeoHead';
import { site } from '../config/site';
import type { Product } from '../types/catalog';

const WHY = [
  {
    title: 'Manufacturer Direct',
    body: 'Every saree comes straight from our own looms and weavers. With no middlemen in between, you receive genuine handloom pieces — and better value — directly from the makers.',
  },
  {
    title: 'Authentic Maheshwari',
    body: 'These are true Maheshwari handloom sarees, traditionally woven in Maheshwar, Madhya Pradesh. Each drape carries the signature borders, motifs and time-honoured techniques passed down through generations.',
  },
  {
    title: 'Wholesale & Retail',
    body: 'Whether you want a single special saree or bulk quantities for your store, we serve you. Individual customers and resellers alike enjoy the same authentic quality and honest pricing.',
  },
  {
    title: 'Quality Checked',
    body: 'Before dispatch, every saree is inspected by hand — fabric, weave, finishing, borders and overall craftsmanship. Only pieces that meet our standard are sent to you.',
  },
  {
    title: 'Direct WhatsApp Ordering',
    body: 'Have a question or ready to buy? Connect with us directly on WhatsApp and place your saree order in minutes — a simple, personal and convenient way to shop.',
  },
  {
    title: 'From Maheshwar, MP',
    body: 'Our sarees come straight from Maheshwar, Madhya Pradesh — the historic home of the renowned Maheshwari handloom tradition. You receive a piece woven at the very source of the craft.',
  },
];

export function Home() {
  const featured = useProducts({ limit: 8, isFeatured: true });
  const newArrivals = useProducts({ limit: 8, isNewArrival: true });
  const bestSellers = useProducts({ limit: 8, isBestSeller: true, sort: 'best_selling' });
  const { data: categories } = useCategories();
  const { data: banners } = useBanners('HERO');
  const { homeSections } = useSite();

  // Home shows only the top-level departments; each opens a page that lists
  // its child categories.
  const topCategories = (categories ?? [])
    .filter((c) => !c.parent && c.isActive !== false)
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

  // Keyed section renderers; the admin controls which appear and in what order.
  const sections: Record<string, ReactNode> = {
    categories: topCategories.length ? (
      <Section key="categories" title="Shop by Category">
        <CategoryRail>
          {topCategories.map((cat) => (
            <CategoryCircle key={cat._id} category={cat} />
          ))}
        </CategoryRail>
      </Section>
    ) : null,
    featured: <ProductSection key="featured" title="Featured Products" viewAll="/products" query={featured} />,
    charkha: <CharkhaStory key="charkha" />,
    why: (
      <section key="why" className="bg-ivory">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <h2 className="text-center font-display text-3xl text-charcoal">Why Choose TAAJ Handloom</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WHY.map((w) => (
              <div key={w.title} className="rounded-2xl bg-white p-6 ring-1 ring-line/60">
                <h3 className="font-display text-xl text-brand-deep">{w.title}</h3>
                <p className="mt-2 text-sm text-charcoal/60">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    ),
    newArrivals: <ProductSection key="newArrivals" title="New Arrivals" viewAll="/products" query={newArrivals} />,
    bestSellers: <ProductSection key="bestSellers" title="Best Sellers" viewAll="/products" query={bestSellers} />,
    wholesale: (
      <section key="wholesale" className="mx-auto max-w-7xl px-6 py-14">
        <div className="flex flex-col items-center gap-4 rounded-3xl bg-brand-deep px-8 py-14 text-center text-white">
          <h2 className="font-display text-3xl text-ivory">Looking for Maheshwari Sarees in Bulk?</h2>
          <p className="max-w-xl text-white/80">
            As manufacturers, we offer competitive wholesale pricing for retailers and resellers.
          </p>
          <WhatsAppButton
            size="lg"
            label="Contact us on WhatsApp"
            payload={{ items: [], customerType: 'wholesale', note: 'I am interested in wholesale Maheshwari handloom products.' }}
          />
        </div>
      </section>
    ),
    social: (
      <SocialStrip
        key="social"
        images={(newArrivals.data?.items ?? bestSellers.data?.items ?? []).map((p) => p.media.mainImage.url).slice(0, 6)}
      />
    ),
  };

  const ordered = [...homeSections]
    .filter((s) => s.enabled && sections[s.key])
    .sort((a, b) => a.order - b.order);

  return (
    <div>
      <SeoHead />

      {/* Hero — always shown; admin-managed slider with a static fallback */}
      {banners && banners.length > 0 ? (
        <HeroSlider banners={banners} />
      ) : (
        <section className="bg-ivory">
          <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 py-16 sm:py-20 lg:grid-cols-2">
            <div>
              <span className="inline-block rounded-full bg-brand-soft px-4 py-1 text-sm font-medium text-brand-deep">
                Manufacturer • Wholesale • Retail
              </span>
              <h1 className="mt-5 font-display text-4xl leading-tight text-charcoal sm:text-5xl">
                Authentic Maheshwari Handloom, <span className="text-brand-deep">Woven with Tradition</span>
              </h1>
              <p className="mt-4 max-w-lg text-lg text-charcoal/60">Handcrafted in {site.location}.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/sarees"><Button size="lg">Shop Sarees</Button></Link>
                <Link to="/products"><Button size="lg" variant="outline">Explore Collection</Button></Link>
                <Link to="/wholesale"><Button size="lg" variant="gold">Wholesale Inquiry</Button></Link>
              </div>
            </div>
            <div className="relative hidden aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-brand-soft via-ivory to-gold/20 lg:block">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-3xl text-brand-deep/40">TAAJ Handloom</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {ordered.map((s) => sections[s.key])}
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <h2 className="mb-8 font-display text-3xl text-charcoal">{title}</h2>
      {children}
    </section>
  );
}

function ProductSection({
  title,
  viewAll,
  query,
}: {
  title: string;
  viewAll: string;
  query: { data?: { items: Product[] }; isLoading: boolean };
}) {
  if (!query.isLoading && (!query.data || query.data.items.length === 0)) return null;
  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="font-display text-3xl text-charcoal">{title}</h2>
        <Link to={viewAll} className="text-sm font-medium text-brand-deep hover:underline">
          View all →
        </Link>
      </div>
      <ProductGrid products={query.data?.items.slice(0, 8)} loading={query.isLoading} skeletonCount={4} />
    </section>
  );
}
