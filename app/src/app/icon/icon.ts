import { html } from 'lit-html';

export const Icon = (name: string) =>
  html`
    <i class="material-icons">${name}</i>
  `;
