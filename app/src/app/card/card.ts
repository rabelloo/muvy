import { html, TemplateResult } from 'lit-html';
import './card.scss';

export const Card = ({
  content,
  header,
}: {
  content: TemplateResult;
  header?: TemplateResult;
  footer?: TemplateResult;
}) =>
  html`
    <div class="muvy-card">
      ${header
        ? html`
            <h3 class="muvy-card--header">${header}</h3>
          `
        : ''}
      <div class="muvy-card--content">${content}</div>
    </div>
  `;
