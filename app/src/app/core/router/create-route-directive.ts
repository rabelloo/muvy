import { directive, Part } from 'lit-html';
import { createRoute } from './create-route';
import { Route, RouteArgs, WithRoute } from './interfaces';

/**
 * Creates a directive for specifying routes
 * that will only render when it matches the browser url.
 */
export const createRouteDirective = (routes: Set<Route>, init: () => void) =>
  directive((path: string, renderer: WithRoute) => {
    let ref: Part;
    const render = (args: RouteArgs) => {
      if (ref) {
        ref.setValue(renderer(args));
        ref.commit();
      }
    };
    const remove = () => {
      if (ref) {
        ref.setValue('');
        ref.commit();
      }
    };

    routes.add(createRoute(path, render, remove));

    return (part: Part): void => {
      ref = part;
      init();
    };
  });
