import { lazy } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Button } from './components/ui/Button';
import { SeoHead } from './components/SeoHead';

// Route-level code splitting — each page ships in its own chunk.
const named = <T extends string>(p: Promise<Record<T, React.ComponentType>>, key: T) =>
  p.then((m) => ({ default: m[key] }));

const Catalog = lazy(() => named(import('./pages/Catalog'), 'Catalog'));
const ProductDetail = lazy(() => named(import('./pages/ProductDetail'), 'ProductDetail'));
const Search = lazy(() => named(import('./pages/Search'), 'Search'));
const Cart = lazy(() => named(import('./pages/Cart'), 'Cart'));
const Wishlist = lazy(() => named(import('./pages/Wishlist'), 'Wishlist'));
const Checkout = lazy(() => named(import('./pages/Checkout'), 'Checkout'));
const OrderConfirmation = lazy(() => named(import('./pages/OrderConfirmation'), 'OrderConfirmation'));
const MaheshwariHistory = lazy(() => named(import('./pages/MaheshwariHistory'), 'MaheshwariHistory'));
const About = lazy(() => named(import('./pages/info'), 'About'));
const Contact = lazy(() => named(import('./pages/info'), 'Contact'));
const Wholesale = lazy(() => named(import('./pages/info'), 'Wholesale'));
const PrivacyPolicy = lazy(() => named(import('./pages/info'), 'PrivacyPolicy'));
const Terms = lazy(() => named(import('./pages/info'), 'Terms'));
const ShippingPolicy = lazy(() => named(import('./pages/info'), 'ShippingPolicy'));
const ReturnPolicy = lazy(() => named(import('./pages/info'), 'ReturnPolicy'));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Catalog />} />
        <Route path="search" element={<Search />} />
        <Route path="cart" element={<Cart />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="order/:orderNumber" element={<OrderConfirmation />} />

        <Route path="history-of-maheshwari-saree" element={<MaheshwariHistory />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="wholesale" element={<Wholesale />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="shipping-policy" element={<ShippingPolicy />} />
        <Route path="returns" element={<ReturnPolicy />} />

        <Route path=":categorySlug" element={<Catalog />} />
        <Route path=":categorySlug/:slug" element={<ProductDetail />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-6 py-24 text-center">
      <SeoHead title="Page not found" noindex />
      <h1 className="font-display text-5xl text-brand-deep">404</h1>
      <p className="mt-3 text-charcoal/60">We couldn't find that page.</p>
      <Link to="/" className="mt-6 inline-block">
        <Button>Back to home</Button>
      </Link>
    </div>
  );
}
