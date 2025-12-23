import { headers } from 'next/headers';

/**
 * Restituisce un origin assoluto da usare con fetch verso le route interne.
 * Usa gli header della richiesta (async in Next 16) e fa fallback a NEXT_PUBLIC_SITE_URL.
 */
export async function getBaseUrl() {
  const h = await headers(); // API dinamica asincrona in Next 15/16
  const proto = h.get('x-forwarded-proto') ?? 'http';
  const host =
    h.get('x-forwarded-host') ??
    h.get('host') ??
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/^https?:\/\//, '');

  const envOrigin = process.env.NEXT_PUBLIC_SITE_URL;
  const origin = host
    ? `${proto}://${host}`
    : envOrigin
    ? envOrigin
    : 'http://localhost:3000'; // ultimo fallback in dev

  return origin;
}
