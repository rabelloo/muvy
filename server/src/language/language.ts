import { gql } from 'apollo-server';

export interface Language {
  id: string;
  name: string;
}

export const LanguageType = gql`
  type Language {
    id: String
    name: String
  }
`;
