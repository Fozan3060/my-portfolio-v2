// Signals when the preloader starts revealing the page. Entrance animations wait for it,
// otherwise sections that are already in view (like the hero) animate hidden behind the
// preloader and visitors land on a static page.

const EVENT = 'site-ready'

declare global {
  interface Window {
    __siteReady?: boolean
  }
}

export function markSiteReady() {
  if (typeof window === 'undefined' || window.__siteReady) return
  window.__siteReady = true
  window.dispatchEvent(new Event(EVENT))
}

/** Runs `callback` once the page is revealed (immediately if there is no preloader). */
export function whenSiteReady(callback: () => void): () => void {
  if (window.__siteReady || !document.querySelector('[data-preloader]')) {
    callback()
    return () => {}
  }
  window.addEventListener(EVENT, callback, { once: true })
  return () => window.removeEventListener(EVENT, callback)
}
