import { html } from 'lit-html';
import styles from './app.scss';
import { NowPlaying } from './app/movie/now-playing';

export const App = () =>
  html`
    <div class=${styles.app}>
      ${NowPlaying()}
    </div>
  `;
