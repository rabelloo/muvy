import { html } from 'lit-html';
import { route } from './app/core/router';
import { MovieSearch } from './app/movie/movie-search';
import { NowPlaying } from './app/movie/now-playing';
import { MovieDetailView } from './app/views/movie-detail';

export const App = () =>
  html`
    ${route('/movies/now-playing', NowPlaying)}
    ${route('/movies/search/:title', MovieSearch)}
    ${route('/movies/:id', MovieDetailView)}
    ${route('*', MovieSearch) /* prettier-ignore-line */}
  `;
