/**
 * Utility functions for handling links
 */

/**
 * Determines if a link should be rendered as an anchor tag
 * instead of a Next.js Link component
 */
export function shouldLinkBeAnAnchorTag(href?: string): boolean {
  if (!href) return false

  // Handle links that start with # (anchor links)
  if (href.startsWith('#')) return true

  // Handle links that start with / but have a hash (e.g., "/#section")
  if (href.startsWith('/') && href.includes('#')) return true

  // Handle mail links
  if (href.startsWith('mailto:')) return true

  // Handle tel links
  if (href.startsWith('tel:')) return true

  return false
}

/**
 * Determines if a link should open in a new window
 */
export function shouldLinkOpenInNewWindow(href?: string): boolean {
  if (!href) return false

  // Check if it's an external link (starts with http/https and not on the same domain)
  if (href.startsWith('http:') || href.startsWith('https:')) {
    // You can add domain checks here if needed
    return true
  }

  return false
}
