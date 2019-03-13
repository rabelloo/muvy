import { gql } from 'apollo-server';

export interface Country {
  id: string;
  name: string;
}

export const CountryType = gql`
  type Country {
    id: String
    name: String
  }
`;
