import { html } from 'lit-html';
import { route } from './app/core/router';
import { MovieDetail } from './app/movie/movie-detail';
import { MovieSearch } from './app/movie/movie-search';
import { NowPlaying } from './app/movie/now-playing';

export const App = () =>
  html`
    ${route('/movies/now-playing', NowPlaying)}
    ${route('/movies/search/:title', MovieSearch)}
    ${route('/movies/:id', MovieDetail)}
    ${route('*', MovieSearch)}
  `;
