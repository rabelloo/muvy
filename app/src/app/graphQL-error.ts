import { html } from 'lit-html';

export const GraphQLError = (error: { message: string }) => html`
  <h3>😢 Such Sad, Very Error! 😰</h3>
  <div>${error.message}</div>
`;
