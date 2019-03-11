import { html } from 'lit-html';
import { until } from 'lit-html/directives/until';
import { GraphQLError } from '../graphQL-error';
import { Loading } from '../loading';
import { movieApi } from './api';
import { Movies } from './movies';
import styles from './now-playing.scss';

export const NowPlaying = () => {
  const content = movieApi.nowPlaying().then(Movies, GraphQLError);

  return html`
    <h2 class=${styles.title}>Now playing</h2>
    ${until(content, Loading())}
  `;
};
