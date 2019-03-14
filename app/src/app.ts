import { html } from 'lit-html';
import styles from './app.scss';
import { createRouter } from './app/core/router';
import { MovieDetail } from './app/movie/movie-detail';
import { NowPlaying } from './app/movie/now-playing';

const { route } = createRouter();

export const App = () =>
  html`
    <div class=${styles.app}>
      ${route('/movies/:id', MovieDetail)}
      ${route('*', NowPlaying)}
    </div>
  `;
