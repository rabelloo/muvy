import gql from 'graphql-tag';
import { apolloWith } from '../core/apollo-with';
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

const apollo = apolloWith(queries);

function search(title: string): Promise<Movie[]> {
  return apollo.switchQuery<Movie[]>('movies', { title });
}

function nowPlaying(): Promise<Movie[]> {
  return apollo.query<Movie[]>('nowPlaying');
}

function one(id: number): Promise<Movie> {
  return apollo.query<Movie>('movie', { id });
}
