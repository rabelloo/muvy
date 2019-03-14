import { html } from 'lit-html';
import { until } from 'lit-html/directives/until';
import { Card } from '../card/card';
import { RouteArgs } from '../core/router';
import { GraphQLError } from '../graphQL-error';
import { Loading } from '../loading';
import { movieApi } from './api';
import { MovieDetailed } from './interface';
import styles from './movie-detail.scss';

export const MovieDetail = ({ params: { id } }: RouteArgs) => {
  const movie = movieApi.one(+id).then(detail, GraphQLError);

  return html`
    ${until(movie, Loading())}
  `;
};

const detail = (movie: MovieDetailed) => html`
  <div class=${styles.container}>
    <img class=${styles.backdrop} src=${movie.backdrop} />
    ${Card({ content: content(movie) })}
  </div>
`;

const content = (movie: MovieDetailed) => {
  const { poster, title, releaseDate, summary, tagline } = movie;
  const { genres, revenue, budget } = movie;
  const [month, day, year] = new Date(releaseDate)
    .toDateString()
    .split(' ')
    .slice(1);

  return html`
    <div class=${styles.content}>
      <img src=${poster} />
      <div class=${styles.body}>
        <div class=${styles.title}>
          <h2>${title} (${year})</h2>
          ${tagline ? html`<small>${tagline}</small>` : ''}
          <small>${day} ${month} ${year}</small>
        </div>
        <p>
          ${genres.map(
            ({ id, name }, i) =>
              html`${i > 0 ? ', ' : ''}<a href="/genre/${id}">${name}</a>`
          )}
        </p>
        <p>${summary}</p>
      </div>
    </div>
  `;
};
