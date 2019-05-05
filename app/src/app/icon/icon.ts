import { html } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import styles from './icon.scss';

export const Icon = (
  name: string,
  color?: 'primary' | 'accent' | 'warn' | 'success'
) =>
  html`
    <i
      class=${classMap({
        'material-icons': true,
        [styles[color || '']]: true,
      })}
    >
      ${name}
    </i>
  `;
