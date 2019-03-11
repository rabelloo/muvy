import { html } from 'lit-html';
import { Card } from '../card/card';
import { Movie } from './interface';
import styles from './movie-card.scss';

export const MovieCard = ({ title, poster, score, votes }: Movie) => {
  const header = html`
    <span>${title}</span>
    <div class=${styles.score}>
      <span>score: ${score}</span>
      <span>votes: ${votes}</span>
    </div>
  `;
  const content = html`
    <img src=${poster} />
  `;

  return html`
    <li class=${styles.li}>
      <a target="_blank">${Card({ header, content })}</a>
    </li>
  `;
};