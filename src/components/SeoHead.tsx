import { Helmet } from 'react-helmet-async';
import { site } from '../config/site';

export function SeoHead({
  title,
  description,
  image,
  canonical,
  jsonLd,
  noindex,
}: {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
  jsonLd?: Record<string, unknown>;
  noindex?: boolean;
}) {
  const fullTitle = title ? `${title} · ${site.name}` : `${site.name} — ${site.tagline}`;
  const desc = description ?? site.tagline;
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const canonicalUrl = canonical ? `${origin}${canonical}` : undefined;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.name} />
      {image && <meta property="og:image" content={image} />}
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

      <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />

      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
}
