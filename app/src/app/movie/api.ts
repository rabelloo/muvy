import gql from 'graphql-tag';
import { Movie } from '~interfaces/movie';
import { apolloClient } from '../core/apollo-client';

export const movieApi = {
  nowPlaying,
};

const queries = {
  nowPlaying: gql`
    {
      nowPlaying {
        id
        title
        summary
        score
        votes
        popularity
        releaseDate
        poster
        backdrop
        originalLanguage
        originalTitle
        video
        genres
        adult
      }
    }
  `,
};

async function nowPlaying(): Promise<Movie[]> {
  return apolloClient
    .query<{ nowPlaying: Movie[] }>({
      query: queries.nowPlaying,
    })
    .then(({ data }) => data.nowPlaying);
}
