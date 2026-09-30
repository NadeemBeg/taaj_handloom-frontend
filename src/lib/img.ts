/**
 * Responsive image helpers. For Cloudinary-hosted images we inject automatic
 * format (AVIF/WebP) + quality and a width transform; other URLs pass through
 * unchanged so seed/placeholder images still work.
 */
function isCloudinary(url?: string): boolean {
  return !!url && url.includes('res.cloudinary.com') && url.includes('/upload/');
}

export function cldImg(url: string, width: number): string {
  if (!isCloudinary(url)) return url;
  return url.replace('/upload/', `/upload/f_auto,q_auto,c_fill,w_${width}/`);
}

export function cldSrcSet(url: string, widths: number[]): string | undefined {
  if (!isCloudinary(url)) return undefined;
  return widths.map((w) => `${cldImg(url, w)} ${w}w`).join(', ');
}
