import { Link } from 'react-router-dom';
import { useSite } from '../../hooks/useSite';
import { WhatsAppButton } from '../whatsapp/WhatsAppButton';
import { FooterInstagram } from './FooterInstagram';

const shopLinks = [
  { label: 'All Products', to: '/products' },
  { label: 'Sarees', to: '/sarees' },
  { label: 'Suits', to: '/suits' },
  { label: 'Chunari', to: '/chunari' },
];
const companyLinks = [
  { label: 'About Us', to: '/about' },
  { label: 'Wholesale', to: '/wholesale' },
  { label: 'Contact', to: '/contact' },
];
const careLinks = [
  { label: 'Shipping Policy', to: '/shipping-policy' },
  { label: 'Return / Exchange', to: '/returns' },
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms & Conditions', to: '/terms' },
];
const trust = ['Manufacturer Direct', 'Authentic Maheshwari', 'Quality Checked', 'Secure WhatsApp Ordering'];

export function Footer() {
  const { name, tagline, location, social, email, phone, whatsappNumber } = useSite();
  const socials = [
    { key: 'instagram', href: social.instagram, Icon: InstagramIcon, label: 'Instagram' },
    { key: 'facebook', href: social.facebook, Icon: FacebookIcon, label: 'Facebook' },
    { key: 'youtube', href: social.youtube, Icon: YoutubeIcon, label: 'YouTube' },
  ].filter((s) => s.href);
  const waLink = whatsappNumber ? `https://wa.me/${whatsappNumber.replace(/\D/g, '')}` : undefined;

  return (
    <footer className="mt-20 bg-brand-deep text-ivory/80">
      {/* Communication band */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-6 py-9 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="font-display text-2xl text-ivory">Have a question about a saree?</p>
            <p className="mt-1 text-sm text-ivory/60">
              Talk to our Maheshwar team directly — we reply personally on WhatsApp.
            </p>
          </div>
          <WhatsAppButton
            size="lg"
            label="Chat with us"
            payload={{ items: [], note: 'Hello TAAJ Handloom, I have a question about your sarees.' }}
          />
        </div>
      </div>

      {/* Main columns */}
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-12">
        {/* Brand */}
        <div className="lg:col-span-4">
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-2xl font-semibold text-gold-light">TAAJ</span>
            <span className="font-display text-lg text-ivory/80">Handloom</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ivory/60">
            {tagline || 'Authentic Maheshwari handloom sarees, woven at the source in Maheshwar, Madhya Pradesh — direct from our looms to your wardrobe.'}
          </p>

          {/* Compact Instagram strip — latest posts from @taaj_handloom */}
          <FooterInstagram />

          {socials.length > 0 && (
            <div className="mt-5 flex gap-2.5">
              {socials.map(({ key, href, Icon, label }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-ivory/80 transition-colors hover:border-gold hover:bg-gold hover:text-brand-deep"
                >
                  <Icon />
                </a>
              ))}
            </div>
          )}
        </div>

        <FooterCol title="Shop" links={shopLinks} className="lg:col-span-2" />
        <FooterCol title="Company" links={companyLinks} className="lg:col-span-2" />
        <FooterCol title="Customer Care" links={careLinks} className="lg:col-span-2" />

        {/* Contact */}
        <div className="lg:col-span-2">
          <FooterTitle>Get in Touch</FooterTitle>
          <ul className="space-y-3 text-sm text-ivory/70">
            {location && (
              <li className="flex gap-2.5">
                <MapPinIcon />
                <span>{location}</span>
              </li>
            )}
            {phone && (
              <li className="flex gap-2.5">
                <PhoneIcon />
                <a href={`tel:${phone}`} className="transition-colors hover:text-gold-light">
                  {phone}
                </a>
              </li>
            )}
            {email && (
              <li className="flex gap-2.5">
                <MailIcon />
                <a href={`mailto:${email}`} className="break-all transition-colors hover:text-gold-light">
                  {email}
                </a>
              </li>
            )}
            {waLink && (
              <li className="flex gap-2.5">
                <ChatIcon />
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-gold-light"
                >
                  WhatsApp us
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Trust strip */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-4 gap-y-2 px-6 py-4 text-center text-[11px] font-medium uppercase tracking-label text-ivory/55">
          {trust.map((t, i) => (
            <span key={t} className="flex items-center gap-4">
              {i > 0 && <span className="text-gold/50">•</span>}
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-ivory/50 sm:flex-row">
          <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
          <p>Handcrafted in Maheshwar, Madhya Pradesh.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterTitle({ children }: { children: React.ReactNode }) {
  return <h4 className="mb-4 text-xs font-semibold uppercase tracking-label text-gold-light">{children}</h4>;
}

function FooterCol({
  title,
  links,
  className,
}: {
  title: string;
  links: { label: string; to: string }[];
  className?: string;
}) {
  return (
    <div className={className}>
      <FooterTitle>{title}</FooterTitle>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="text-sm text-ivory/70 transition-colors hover:text-gold-light">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* — contact glyphs (16px, gold accent) — */
function iconCls() {
  return 'mt-0.5 h-4 w-4 flex-shrink-0 text-gold-light';
}
function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" className={iconCls()} fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className={iconCls()} fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5c0 8.3 6.7 15 15 15v-3.3l-4-1.3-1.8 1.8a12 12 0 0 1-6.4-6.4L8.6 9 7.3 5H4z" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className={iconCls()} fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 5 8-5" />
    </svg>
  );
}
function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" className={iconCls()} fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a8 8 0 0 1-11.5 7.2L4 20l1-4.3A8 8 0 1 1 21 12z" />
    </svg>
  );
}

/* — social glyphs — */
function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M13 22v-8h2.7l.4-3H13V9.1c0-.9.25-1.5 1.5-1.5H16V5c-.3 0-1.2-.1-2.2-.1-2.2 0-3.8 1.4-3.8 3.9V11H7.5v3H10v8z" />
    </svg>
  );
}
function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M22 8.2a2.6 2.6 0 0 0-1.8-1.8C18.6 6 12 6 12 6s-6.6 0-8.2.4A2.6 2.6 0 0 0 2 8.2 27 27 0 0 0 1.6 12 27 27 0 0 0 2 15.8a2.6 2.6 0 0 0 1.8 1.8C5.4 18 12 18 12 18s6.6 0 8.2-.4a2.6 2.6 0 0 0 1.8-1.8c.3-1.6.4-3.8.4-3.8s0-2.2-.4-3.8zM10 15V9l5 3z" />
    </svg>
  );
}
