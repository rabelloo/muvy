import { html } from 'lit-html';
import { route } from './app/core/router';
import { MovieDetail } from './app/movie/movie-detail';
import { NowPlaying } from './app/movie/now-playing';

export const App = () =>
  html`
    ${route('/movies/:id', MovieDetail)}
    ${route('*', NowPlaying)}
  `;
