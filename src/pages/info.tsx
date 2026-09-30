import type { ReactNode } from 'react';
import { buildWhatsappUrl } from '@taaj/shared';
import { site } from '../config/site';
import { WhatsAppButton } from '../components/whatsapp/WhatsAppButton';
import { SeoHead } from '../components/SeoHead';

function Page({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <SeoHead title={title} />
      <h1 className="font-display text-4xl text-charcoal">{title}</h1>
      <div className="prose-taaj mt-6 space-y-4 text-charcoal/70">{children}</div>
    </div>
  );
}

export function About() {
  return (
    <Page title="About TAAJ Handloom">
      <p>
        TAAJ Handloom is a manufacturer, wholesaler and retailer of authentic Maheshwari handloom,
        based in Maheshwar, Madhya Pradesh — the historic home of this craft on the banks of the
        Narmada.
      </p>
      <p>
        We weave and supply Maheshwari sarees, suits and chunari directly from our looms. Every piece
        is crafted by skilled artisans, quality-checked, and offered at manufacturer-direct prices to
        both individual customers and wholesale buyers.
      </p>
      <p>
        Our aim is simple: to bring genuine Maheshwari handloom to you with honest pricing, dependable
        quality and a shopping experience that respects the tradition behind every thread.
      </p>
    </Page>
  );
}

export function Contact() {
  return (
    <Page title="Contact Us">
      <p>We'd love to help you find the right piece. Reach us through any of the channels below.</p>
      <ul className="not-prose space-y-2">
        <li><strong>Business:</strong> {site.name}</li>
        <li><strong>Location:</strong> {site.location}</li>
        <li><strong>WhatsApp / Phone:</strong> as listed on our WhatsApp button</li>
        <li><strong>Email:</strong> available on request</li>
      </ul>
      <div className="not-prose mt-6">
        <WhatsAppButton size="lg" label="Chat on WhatsApp" payload={{ items: [], note: 'I have a question about TAAJ Handloom products.' }} />
      </div>
      <p className="mt-6 text-sm text-charcoal/50">
        Contact details, map and social links are configurable from the admin panel.
      </p>
    </Page>
  );
}

export function Wholesale() {
  const href = buildWhatsappUrl(site.whatsappNumber, {
    items: [],
    note: 'I am interested in wholesale Maheshwari handloom. Please share pricing and minimum order details.',
  });
  return (
    <Page title="Wholesale Inquiry">
      <p>
        As manufacturers of Maheshwari handloom, TAAJ Handloom supplies retailers, boutiques and
        resellers at competitive wholesale prices, with support for bulk and repeat orders.
      </p>
      <ul className="list-disc space-y-1 pl-5">
        <li>Manufacturer-direct wholesale pricing</li>
        <li>Bulk quantities across sarees, suits and chunari</li>
        <li>Minimum order quantities apply per product</li>
      </ul>
      <p>Send us your requirement on WhatsApp and our team will get back with a quote.</p>
      <div className="not-prose mt-6">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-[#25D366] px-7 py-3 font-medium text-white hover:bg-[#1FB457]"
        >
          Start a Wholesale Inquiry
        </a>
      </div>
    </Page>
  );
}

export function PrivacyPolicy() {
  return (
    <Page title="Privacy Policy">
      <p>
        We collect only the information needed to process and deliver your order — such as your name,
        contact number, WhatsApp number and delivery address. We do not sell your data to third
        parties.
      </p>
      <p>Order details you share are used solely to confirm availability, fulfil and support your order.</p>
    </Page>
  );
}

export function Terms() {
  return (
    <Page title="Terms & Conditions">
      <p>
        By placing an order with TAAJ Handloom you agree that product colours may vary slightly due to
        the handwoven nature of the craft and screen differences. Prices and availability are subject
        to confirmation over WhatsApp.
      </p>
    </Page>
  );
}

export function ShippingPolicy() {
  return (
    <Page title="Shipping Policy">
      <p>
        Orders are dispatched after confirmation. Delivery timelines and charges are shared at the time
        of order confirmation based on your location and the items ordered.
      </p>
    </Page>
  );
}

export function ReturnPolicy() {
  return (
    <Page title="Return / Exchange Policy">
      <p>
        If you receive a damaged or incorrect item, contact us within 48 hours of delivery with photos
        and we will arrange an exchange or resolution. Due to the handmade nature of the products,
        minor irregularities are inherent to the craft and not considered defects.
      </p>
    </Page>
  );
}
