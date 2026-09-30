import { Outlet, useLocation } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { buildWhatsappUrl } from '@taaj/shared';
import { useSite } from '../../hooks/useSite';
import { Header } from './Header';
import { Footer } from './Footer';
import { WhatsAppIcon } from '../whatsapp/WhatsAppButton';
import { Spinner } from '../ui/feedback';

export function Layout() {
  const { pathname } = useLocation();
  const { announcement } = useSite();

  // Scroll to top on route change.
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="bg-brand-deep px-4 py-2 text-center text-xs font-medium tracking-wide text-white">
        {announcement}
      </div>
      <Header />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="flex min-h-[50vh] items-center justify-center">
              <Spinner />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}

function WhatsAppFab() {
  const { whatsappNumber } = useSite();
  const href = buildWhatsappUrl(whatsappNumber, {
    items: [],
    note: 'I would like to know more about your Maheshwari handloom products.',
  });
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
