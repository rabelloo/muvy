import { html } from 'lit-html';
import { Card } from '../card/card';
import { MovieDetailed } from './interface';
import styles from './movie-detail.scss';

export const MovieDetail = (movie: MovieDetailed) => {
  return movie && movie.id ? detail(movie) : empty;
};

// TODO: better skeleton
const empty = html`
  <div class=${styles.container}>
    <img
      class=${styles.backdrop}
      style="background: linear-gradient(45deg, #000, #333); opacity: .5"
    />
    ${Card({
      content: html` <div style="display: flex">
        <img class="pulse ${styles.emptyImg}" />
        <div class=${styles.body} style="width: 100vw">
          <h2 class="pulse ${styles.emptyTitle}"></h2>
        </div>
      </div>`,
    })}
  </div>
`;

const detail = (movie: MovieDetailed) => html`
  <div class=${styles.container}>
    <img class=${styles.backdrop} src=${movie.backdrop} />
    ${Card({ content: content(movie) })}
  </div>
`;

const content = (movie: MovieDetailed) => {
  const { poster, title, releaseDate, summary, tagline } = movie;
  const { genres, revenue, budget } = movie;
  const [month, day, year] = releaseDate
    ? new Date(releaseDate).toDateString().split(' ').slice(1)
    : ['', '', ''];

  // TODO: share header with movie-card
  return html`
    <div class=${styles.content}>
      <img src=${poster} />
      <div class=${styles.body}>
        <h2 class=${styles.title}>${title} ${year ? html`(${year})` : ''}</h2>
        <div class=${styles.slide}>
          <div class=${styles.subtitle}>
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
          <p>Revenue: ${money(revenue)}</p>
          <p>Budget: ${money(budget)}</p>
        </div>
      </div>
    </div>
  `;
};

// TODO: money mask algorithm
const format = (value: number | string): string =>
  `${value}`.length > 3
    ? `${format(`${value}`.slice(0, -3))}.${`${value}`.slice(-3)}`
    : `${value}`;
const money = (value: number) => html`
  <span title="$${format(value)}">$${Math.round(value / 1000000) + 'M'}</span>
`;
