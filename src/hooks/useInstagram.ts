import { useQuery } from '@tanstack/react-query';
import { instagram } from '../config/site';

/** A single Instagram post, normalised from the Behold feed payload. */
export interface IgPost {
  id: string;
  permalink: string;
  image: string;
  caption?: string;
  isVideo: boolean;
}

/** Behold has changed its payload shape over time — read it defensively. */
async function fetchBeholdFeed(feedId: string): Promise<IgPost[]> {
  const res = await fetch(`https://feeds.behold.so/${feedId}`);
  if (!res.ok) throw new Error(`Instagram feed responded ${res.status}`);
  const data = await res.json();
  const raw: unknown[] = Array.isArray(data)
    ? data
    : Array.isArray((data as { posts?: unknown[] }).posts)
      ? (data as { posts: unknown[] }).posts
      : [];

  return raw
    .map((item): IgPost | null => {
      const p = item as Record<string, any>;
      // Prefer Behold's own image renditions (stable CDN, and a poster image
      // even for video/reel posts) over the raw Instagram CDN mediaUrl.
      const image: string =
        p.sizes?.medium?.mediaUrl ||
        p.sizes?.large?.mediaUrl ||
        p.sizes?.small?.mediaUrl ||
        p.sizes?.full?.mediaUrl ||
        p.thumbnailUrl ||
        p.mediaUrl ||
        '';
      const permalink: string = p.permalink || instagram.profileUrl;
      if (!image) return null;
      const mediaType = String(p.mediaType || '').toUpperCase();
      return {
        id: String(p.id || permalink),
        permalink,
        image,
        caption: typeof p.caption === 'string' ? p.caption : undefined,
        isVideo: mediaType === 'VIDEO' || mediaType.includes('REEL'),
      };
    })
    .filter((p): p is IgPost => p !== null);
}

/** Latest posts from @taaj_handloom via the configured Behold feed. */
export function useInstagramFeed() {
  const feedId = instagram.beholdFeedId;
  return useQuery({
    queryKey: ['instagram-feed', feedId],
    queryFn: () => fetchBeholdFeed(feedId),
    enabled: Boolean(feedId),
    staleTime: 10 * 60_000,
    retry: 1,
  });
}
