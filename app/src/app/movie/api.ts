import firebase from 'firebase/app';
import gql from 'graphql-tag';
import { apolloWith } from '../core/apollo-with';
import { user } from '../core/user';
import { Movie } from './interface';

export const movieApi = {
  nowPlaying,
  one,
  search,
  watched,
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

function nowPlaying(): Promise<Movie[]> {
  return apollo.query<Movie[]>('nowPlaying');
}

function one(id: number): Promise<Movie> {
  return apollo.exhaustQuery<Movie>('movie', { id });
}

function search(title: string): Promise<Movie[]> {
  return apollo.switchQuery<Movie[]>('movies', { title });
}

function watched(movie: Movie, hasWatched: boolean): Promise<void> {
  const value = firebase.firestore.FieldValue;
  const method = hasWatched ? 'arrayUnion' : 'arrayRemove';

  return user.update({ watched: value[method](movie.id) });
}
