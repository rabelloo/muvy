import gql from 'graphql-tag';
import { apolloClient } from '../core/apollo-client';
import { Movie } from './interface';

export const movieApi = {
  search,
  nowPlaying,
  one,
};

const queries = {
  movie: gql`
    query($id: Int!) {
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
  movies: gql`
    query($title: String!) {
      movies(title: $title) {
        id
        poster
        releaseDate
        score
        title
        votes
      }
    }
  `,
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
};

async function search(title: string): Promise<Movie[]> {
  return query<Movie[]>('movies', { title });
}

async function nowPlaying(): Promise<Movie[]> {
  return query<Movie[]>('nowPlaying');
}

async function one(id: number): Promise<Movie> {
  return query<Movie>('movie', { id });
}

async function query<T>(
  name: keyof typeof queries,
  variables?: any
): Promise<T> {
  return apolloClient
    .query({
      query: queries[name],
      variables,
    })
    .then(({ data }) => data[name]);
}
