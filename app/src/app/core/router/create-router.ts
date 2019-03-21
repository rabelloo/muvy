import { createMatcher } from './create-matcher';
import { createRouteDirective } from './create-route-directive';
import { Route } from './interfaces';
import { observeClickWith } from './observe-click-with';

/**
 * Creates an instance of a router that observes
 * all anchor clicks and updates the visibility and
 * content of route() directives on route changes,
 * according to their configured path.
 *
 * @example
 * const { route } = createRouter();
 *
 * html`${
 *  route('/clients', () => html`Hello from /clients`);
 *  route('/clients/:id', ({ id }) => html`Hello from /clients/${id}`);
 * }`;
 */
export const createRouter = () => {
  const routes = new Set<Route>();
  const runMatches = createMatcher(() => routes);
  const runWithCurrent = () => runMatches(window.location.pathname);
  const observer = observeClickWith(runMatches);

  document.body.addEventListener('click', observer);
  window.addEventListener('popstate', runWithCurrent);

  return {
    navigate,
    route: createRouteDirective(routes, runWithCurrent),
    destroy: () => {
      document.body.removeEventListener('click', observer);
      window.removeEventListener('popstate', runWithCurrent);
    },
  };
};

/**
 * Navigates to a specified route.
 * @param url Absolute url from origin.
 * @example
 * navigate('/movies')
 * // localhost:1234/movies
 * navigate('/movies/4321')
 * // localhost:1234/movies/4321
 */
function navigate(url: string) {
  window.history.pushState({}, '', url);
}
