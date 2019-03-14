import { directive, Part, render, TemplateResult } from 'lit-html';

export const withShadow = (template: TemplateResult) => _withShadow(template);

// tslint:disable-next-line: variable-name
const _withShadow = directive((template: TemplateResult) => {
  const element = document.createElement('div');
  element.attachShadow({ mode: 'open' });

  return (part: Part): void => {
    render(template, element.shadowRoot!);
    part.setValue(element);
  };
});
