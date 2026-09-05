import assetUrls from '../data/assetUrls.json';
import mavatar from '../assets/mavatar.png';
import favatar from '../assets/favatar.png';

/**
 * Resolves an image path to a working CDN or relative URL.
 * If the path is already an absolute HTTP/HTTPS URL, returns it directly.
 * If it's a local /src/assets path or filename, resolves via Supabase CDN map.
 */
export function getImageUrl(src, fallbackType = 'male') {
  if (!src) return fallbackType === 'female' ? favatar : mavatar;

  // Already a full CDN URL or data URI
  if (typeof src === 'string' && (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:'))) {
    return src;
  }

  if (typeof src === 'string') {
    const clean = src.trim();
    // Check in assetUrls mapping
    if (assetUrls[clean]) return assetUrls[clean];
    
    // Check filename without path
    const fileName = clean.split('/').pop().split('\\').pop();
    if (assetUrls[fileName]) return assetUrls[fileName];

    // Check with /src/assets/ prefix
    if (assetUrls[`/src/assets/${fileName}`]) return assetUrls[`/src/assets/${fileName}`];
    if (assetUrls[`src/assets/${fileName}`]) return assetUrls[`src/assets/${fileName}`];

    // Otherwise return relative public path
    return clean.startsWith('/') ? `.${clean}` : `./${clean}`;
  }

  return src;
}

/**
 * Handles image load errors by swapping to an avatar placeholder.
 */
export function handleImageError(e, isFemale = false) {
  if (e.target && !e.target.dataset.fallbackApplied) {
    e.target.dataset.fallbackApplied = 'true';
    e.target.src = isFemale ? favatar : mavatar;
  }
}
