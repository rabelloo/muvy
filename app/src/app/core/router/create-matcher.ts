import { store } from '../store';
import { Route, RouteArgs } from './interfaces';

/**
 * Creates a function that loops the routes in search of matches with the current url.
 * The first match will be rendered, all others will be removed from DOM.
 * @param routes A function that returns the `Map<string, Route>` to scan.
 */
export const createMatcher = (routes: () => Map<string, Route>) => {
  let activeRoute: Route;

  return (href: string) => {
    const lastRoute = activeRoute;

    Array.from(routes().values()).some((route) => {
      const { params, regex, render } = route;
      const matches = href.match(regex);

      if (matches) {
        render(createArgs(matches, params));
        activeRoute = route;
        return true;
      }

      return false;
    });

    if (lastRoute != null && lastRoute !== activeRoute) {
      lastRoute.derender();
    }
  };
};

// =======================================
// =============== Private ===============
// =======================================

const createArgs = (matches: RegExpMatchArray, params: string[]): RouteArgs => {
  const values = matches.slice(1);

  return {
    state: store.state(),
    params: params.reduce((args: any, param, i) => {
      // faster than deconstructing
      args[param] = values[i];
      return args;
    }, {}),
  };
};
