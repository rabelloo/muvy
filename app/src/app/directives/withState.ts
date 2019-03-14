import { directive, Part, TemplateResult } from 'lit-html';

export const withState = <T>(initial: T, renderer: WithState<T>) =>
  _withState(initial, renderer);

export type WithState<T> = (args: {
  state: T;
  setState: (value: T) => void;
}) => TemplateResult;

// tslint:disable-next-line: variable-name
const _withState = directive((initial: any, renderer: WithState<any>) => {
  let ref: Part;
  const setState = (state: any) => {
    ref.setValue(renderer({ state, setState }));
    ref.commit();
  };

  return (part: Part): void => {
    ref = part;
    part.setValue(renderer({ state: initial, setState }));
  };
});
