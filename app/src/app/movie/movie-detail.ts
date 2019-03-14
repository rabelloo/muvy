import { html } from 'lit-html';
import { until } from 'lit-html/directives/until';
import { RouteArgs } from '../core/router';
import { GraphQLError } from '../graphQL-error';
import { Loading } from '../loading';
import { movieApi } from './api';
import { Movie } from './interface';
import styles from './movie-detail.scss';

export const MovieDetail = ({ params: { id } }: RouteArgs) => {
  const movie = movieApi.one(+id).then(detail, GraphQLError);

  return html`
    ${until(movie, Loading())}
  `;
};

const detail = ({ title, backdrop }: Movie) => html`
  <img src=${backdrop} />
  <span>${title}</span>
`;
