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
            <div class="muvy-card--header">${header}</div>
          `
        : ''}
      <div class="muvy-card--content">${content}</div>
    </div>
  `;
