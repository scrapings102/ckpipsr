/**
 * Helper utility to optimize and cache image URLs through Cloudflare proxy (wsrv.nl).
 * This ensures high-resolution quality without blurriness, fast global CDN delivery,
 * and reliable cross-origin (CORS) loading when deployed on platforms like Vercel.
 */
export function cdn(url: string | undefined, width = 800, quality = 90): string {
  if (!url) return "";
  // The visible area chosen in the admin panel rides after "#"; keep it on the
  // proxied address so the picture is still framed on it.
  const view = url.match(/#view=[^#]*$/)?.[0] ?? "";
  if (view) return cdnBase(url.slice(0, -view.length), width, quality) + view;
  return cdnBase(url, width, quality);
}

function cdnBase(url: string, width: number, quality: number): string {
  if (url.startsWith("data:") || url.includes("unsplash.com")) return url;
  
  if (url.includes("wsrv.nl")) {
    try {
      const parsed = new URL(url);
      const targetUrl = parsed.searchParams.get("url");
      if (targetUrl) {
        return `https://wsrv.nl/?url=${encodeURIComponent(targetUrl)}&w=${width}&output=webp&q=${quality}`;
      }
    } catch {
      return url;
    }
    return url;
  }

  if (url.includes("ckpcmc.org") || url.includes("ckpcet.ac.in")) {
    const cleanUrl = url.replace(/^https?:\/\//, "");
    return `https://wsrv.nl/?url=${encodeURIComponent(cleanUrl)}&w=${width}&output=webp&q=${quality}`;
  }

  return url;
}
