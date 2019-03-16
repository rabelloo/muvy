import { Route, RouteArgs } from './interfaces';

/**
 * Creates a function that loops the routes in search of matches with the current url.
 * The first match will be rendered, all others will be removed from DOM.
 * @param routes A function that returns the `Set<Route>` to scan.
 */
export const createMatcher = (routes: () => Set<Route>) => {
  let activeRoute: Route;

  return (href: string) => {
    const lastRoute = activeRoute;

    Array.from(routes()).some(route => {
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
    params: params.reduce((args: any, param, i) => {
      // faster than deconstructing
      args[param] = values[i];
      return args;
    }, {}),
  };
};
