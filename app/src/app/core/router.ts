import { directive, Part, TemplateResult } from 'lit-html';

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
 *  route('/clients', html`Hello from /clients`);
 *  route('/clients/:id', ({ id }) => html`Hello from /clients/${id}`);
 * }`;
 */
export const createRouter = () => {
  const routes = new Set<Route>();
  const runMatches = createMatcher(() => routes);
  const runWithCurrent = () => runMatches(window.location.pathname);

  document.body.addEventListener('click', observeClickWith(runMatches));
  window.addEventListener('popstate', runWithCurrent);

  const routeDirective = createRouteDirective(routes, runWithCurrent);
  const route = (path: string, renderer: WithRoute) =>
    routeDirective(path, renderer);

  return { route };
};

interface Route {
  hide: Hider;
  params: string[];
  path: string;
  regex: RegExp;
  render: Renderer;
}

export interface RouteArgs {
  params: { [key: string]: string };
}
export type WithRoute = (args: RouteArgs) => TemplateResult;
type Hider = () => void;
type Renderer = (args: RouteArgs) => void;

const createMatcher = (routes: () => Set<Route>) => {
  let matched = false;

  return (href: string) => {
    matched = false;

    routes().forEach(route => {
      const { hide, params, regex, render } = route;
      const matches = href.match(regex);

      if (matches && !matched) {
        render(createArgs(matches, params));
        matched = true;
      } else {
        hide();
      }
    });
  };
};

const createRoute = (path: string, render: Renderer, hide: Hider): Route => ({
  hide,
  path,
  render,
  regex: getRegex(path),
  params: getParams(path),
});

const createRouteDirective = (routes: Set<Route>, init: () => void) =>
  directive((path: string, renderer: WithRoute) => {
    let ref: Part;
    const render = (args: RouteArgs) => {
      if (ref) {
        ref.setValue(renderer(args));
        ref.commit();
      }
    };
    const hide = () => {
      if (ref) {
        ref.setValue('');
        ref.commit();
      }
    };

    routes.add(createRoute(path, render, hide));

    return (part: Part): void => {
      ref = part;
      init();
    };
  });

const createArgs = (matches: RegExpMatchArray, params: string[]): RouteArgs => {
  const values = matches.slice(1);

  // faster than deconstructing
  return {
    params: params.reduce((args: any, param, i) => {
      args[param] = values[i];
      return args;
    }, {}),
  };
};

const getParams = (path: string) =>
  path
    .split('/')
    .filter(part => part.startsWith(':'))
    .map(param => param.slice(1));

const getRegex = (path: string) =>
  new RegExp(path.replace(/^\*$/g, '.*').replace(/:(.*)/g, '(.*)'));

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

const getHref = (event: MouseEvent) => {
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

const observeClickWith = (callback: (href: string) => void) => (
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
