/**
 * Gets the href from the clicked <a> element in a MouseEvent.
 */
export const getHref = (event: MouseEvent) => {
  if (shouldIgnore(event)) {
    return;
  }

  const anchor = getAnchor(event);

  if (notLink(anchor)) {
    return;
  }

  // ignore empty links and mailto:
  const { href } = anchor;
  if (!href || href.includes('mailto:')) {
    return;
  }

  // ignore outside links
  const { location } = window;
  const origin = location.origin || `${location.protocol}//${location.host}`;
  if (!href.startsWith(origin)) {
    return;
  }

  // internal link that must be routed
  event.preventDefault();

  // ignore same page as requested
  return href === location.href ? undefined : href.replace(origin, '');
};

// =======================================
// =============== Private ===============
// =======================================

const shouldIgnore = (event: MouseEvent): boolean =>
  event.defaultPrevented ||
  event.button !== 0 ||
  event.metaKey ||
  event.ctrlKey ||
  event.shiftKey;

const getAnchor = (event: MouseEvent): HTMLAnchorElement =>
  event
    .composedPath()
    .find((element: HTMLElement) => element.tagName === 'A') as any;

const notLink = (anchor: HTMLAnchorElement) =>
  !anchor ||
  anchor.target ||
  anchor.hasAttribute('download') ||
  anchor.getAttribute('rel') === 'external';
