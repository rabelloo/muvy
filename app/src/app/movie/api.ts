import gql from 'graphql-tag';
import { Movie } from '~interfaces/movie';
import { apolloClient } from '../core/apollo-client';

export const movieApi = {
  nowPlaying,
  one,
};

const queries = {
  nowPlaying: gql`
    {
      nowPlaying {
        id
        poster
        score
        title
        votes
      }
    }
  `,
  movie: gql`
    query ($id: Int!) {
      movie(id: $id) {
        id
        backdrop
        releaseDate
        runtime
        score
        summary
        title
        votes
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

async function one(id: number): Promise<Movie> {
  return apolloClient
    .query<{ movie: Movie }>({
      query: queries.movie,
      variables: { id },
    })
    .then(({ data }) => data.movie);
}
