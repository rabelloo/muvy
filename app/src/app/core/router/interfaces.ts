import { TemplateResult } from 'lit-html';

export interface Route {
  derender: Derenderer;
  params: string[];
  path: string;
  regex: RegExp;
  render: Renderer;
}

export interface RouteArgs {
  params: { [key: string]: string };
}

export type Derenderer = () => void;
export type Renderer = (args: RouteArgs) => void;
export type WithRoute = (args: RouteArgs) => TemplateResult;
