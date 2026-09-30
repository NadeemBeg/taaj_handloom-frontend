import { useQuery } from '@tanstack/react-query';
import { fetchSettings } from '../api/catalog';
import { site as defaults } from '../config/site';

export interface ResolvedSite {
  name: string;
  tagline: string;
  whatsappNumber: string;
  location: string;
  announcement: string;
  phone?: string;
  email?: string;
  social: { instagram?: string; facebook?: string; youtube?: string };
  homeSections: { key: string; enabled: boolean; order: number }[];
}

const DEFAULT_SECTIONS = [
  'categories',
  'featured',
  'charkha',
  'why',
  'newArrivals',
  'bestSellers',
  'wholesale',
  'social',
].map((key, i) => ({ key, enabled: true, order: i + 1 }));

/**
 * Resolved, business-editable site config. Reads the DB `WebsiteSetting`
 * (shared react-query cache) and falls back to the static config defaults.
 * The WhatsApp number is always sourced here — never hardcoded.
 */
export function useSite(): ResolvedSite {
  const { data } = useQuery({
    queryKey: ['settings'],
    queryFn: fetchSettings,
    staleTime: 5 * 60_000,
  });

  const addr = data?.address;
  const location = addr
    ? [addr.city, addr.state, addr.country].filter(Boolean).join(', ') || defaults.location
    : defaults.location;

  return {
    name: data?.brand?.name || defaults.name,
    tagline: data?.brand?.tagline || defaults.tagline,
    whatsappNumber: data?.whatsappNumber || defaults.whatsappNumber,
    location,
    announcement: data?.announcement || defaults.announcement,
    phone: data?.phone || undefined,
    email: data?.email || undefined,
    social: data?.social ?? {},
    homeSections: data?.homeSections?.length ? data.homeSections : DEFAULT_SECTIONS,
  };
}
