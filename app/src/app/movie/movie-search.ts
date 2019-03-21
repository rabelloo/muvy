import { html } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';
import { navigate, RouteArgs } from '../core/router';
import { withState } from '../directives';
import { Icon } from '../icon/icon';
import { movieApi } from './api';
import { Movie } from './interface';
import styles from './movie-search.scss';
import { Movies } from './movies';

export const MovieSearch = ({ params: { title = '' } }: RouteArgs) => {
  let render: (_: any[]) => void;
  const search = (value: string) => {
    navigate(`/movies/search/${value}`);
    movieApi.search(value).then(render);
  };

  return html`
    <div class=${styles.search}>
      ${withState<Movie[]>([], ({ state, setState }) => {
        const input = ({ target: { value } }: any) => search(value);

        // init
        if (title && !render) {
          render = setState;
          search(title);
        }

        render = setState;

        return html`
          <h2 class=${styles.h2}>
            <span>Movies</span>
            <label class=${styles.label}>
              <input
                class=${styles.input}
                placeholder="Search for a movie..."
                value=${title}
                @input=${input}
              />
              ${Icon('search')}
              <div class=${styles.line}></div>
            </label>
          </h2>
          ${Movies(state)}
        `;
      })}
    </div>
  `;
};
