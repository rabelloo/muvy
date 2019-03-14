import gql from 'graphql-tag';
import { apolloClient } from '../core/apollo-client';
import { Movie } from './interface';

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
        releaseDate
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
        budget
        poster
        releaseDate
        revenue
        runtime
        score
        summary
        tagline
        title
        votes
        genres {
          id
          name
        }
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
