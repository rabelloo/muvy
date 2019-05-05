import { directive, Part } from 'lit-html';
import { createRoute } from './create-route';
import { Route, RouteArgs, WithRoute } from './interfaces';

/**
 * Creates a directive for specifying routes
 * that will only render when it matches the browser url.
 */
export const createRouteDirective = (
  routes: Map<string, Route>,
  iterateRoutes: () => void
) =>
  directive((path: string, renderer: WithRoute) => {
    if (routes.has(path)) {
      return iterateRoutes;
    }

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

    routes.set(path, createRoute(path, render, remove));

    return (part: Part): void => {
      ref = part;
      iterateRoutes();
    };
  });
