import { html } from 'lit-html';
import { Card } from '../card/card';
import { Icon } from '../icon/icon';
import { Movie } from './interface';
import styles from './movie-card.scss';

export const MovieCard = (movie: Movie) => {
  const { id, title, releaseDate, poster, score, votes } = movie;
  const year = new Date(releaseDate).getFullYear();

  const header = html`
    <div class=${styles.title}>
      <span>${title}</span>
      <small>(${year})</small>
    </div>
    <div class=${styles.score}>
      <span title="Average score">${score} ${Icon('star')}</span>
      <span title="Amount of votes">${votes} ${Icon('face')}</span>
    </div>
  `;
  const content = html`
    <img src=${poster} />
  `;

  return html`
    <li class=${styles.item}>
      <a href="/movies/${id}">${Card({ header, content })}</a>
    </li>
  `;
};
