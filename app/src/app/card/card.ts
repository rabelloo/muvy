import { html, TemplateResult } from 'lit-html';
import styles from './card.scss';

export const Card = ({
  content,
  header,
}: {
  content: TemplateResult;
  header?: TemplateResult;
  footer?: TemplateResult;
}) =>
  html`
    <div class=${styles.card}>
      ${header
        ? html`
            <h3 class=${styles.header}>${header}</h3>
          `
        : ''}
      <div class=${styles.content}>${content}</div>
    </div>
  `;
