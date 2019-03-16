import { getHref } from './get-href';

/**
 * Sets up a click observer that will update history state
 * and then call the specified callback on every <a> element click.
 * @param callback Function to execute
 */
export const observeClickWith = (callback: (href: string) => void) => (
  event: MouseEvent
) => {
  const href = getHref(event);

  if (href == null) {
    return;
  }

  // internal link that must be routed
  window.history.pushState({}, '', href);
  callback(href);
};
