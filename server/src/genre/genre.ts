import { gql } from 'apollo-server';

export interface Genre {
  id: number;
  name: string;
}

export const GenreType = gql`
  type Genre {
    id: Int
    name: String
  }
`;
