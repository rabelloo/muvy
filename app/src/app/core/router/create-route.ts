import { Derenderer, Renderer, Route } from './interfaces';

/**
 * Creates a `Route` object with all needed info for route matching.
 * @param path Route's path match template.
 * @param render Function that renders a template when the route matches.
 * @param remove Function that removes a template when the route doesn't match.
 */
export const createRoute = (
  path: string,
  render: Renderer,
  remove: Derenderer
): Route => ({
  path,
  derender: remove,
  render,
  regex: getRegex(path),
  params: getParams(path),
});

// =======================================
// =============== Private ===============
// =======================================

const getParams = (path: string) =>
  path
    .split('/')
    .filter(part => part.startsWith(':'))
    .map(param => param.slice(1));

const getRegex = (path: string) =>
  new RegExp(path.replace(/^\*$/g, '.*').replace(/:(.*)/g, '(.*)'));
