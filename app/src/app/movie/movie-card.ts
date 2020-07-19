import { html } from 'lit-html';
import { Card } from '../card/card';
import { user } from '../core/user';
import { withState } from '../directives';
import { Icon } from '../icon/icon';
import { movieApi } from './api';
import { Movie } from './interface';
import styles from './movie-card.scss';

export const MovieCard = (movie: Movie) => {
  const { id, title, releaseDate, poster, score, votes } = movie;
  const year = releaseDate && new Date(releaseDate).getFullYear();
  const watched = user.data.watched.includes(movie.id);

  // TODO: no poster
  const header: any = withState(watched, ({ state, setState }) => {
    const toggleWatched = (event: Event) => {
      event.stopPropagation();
      event.preventDefault();
      movieApi.watched(movie, !state);
      setState(!state);
    };

    return html`
      <div class=${styles.image}>
        <button
          title=${state ? 'Watched' : 'Not watched'}
          @click=${toggleWatched}
        >
          ${state ? Icon('check', 'success') : Icon('add')}
        </button>
        ${poster ? html`<img src=${poster} />` : ''}
      </div>
    `;
  });

  const content = html`
    <h3 class=${styles.title}>
      <div>
        <span>${title}</span>
        <small>${year ? html`(${year})` : ''}</small>
      </div>
      <div class=${styles.score}>
        <span title="Average score">${score} ${Icon('star')}</span>
        <span title="Amount of votes">${votes} ${Icon('face')}</span>
      </div>
    </h3>
  `;

  return html`
    <li class=${styles.item}>
      <a href="/movies/${id}">${Card({ header, content })}</a>
    </li>
  `;
};
