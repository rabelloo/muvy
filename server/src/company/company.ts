import { gql } from 'apollo-server';

export interface Company {
  id: number;
  logo: string;
  name: string;
  originCountry: string;
}

export const CompanyType = gql`
  type Company {
    id: Int
    logo: String
    name: String
    originCountry: String
  }
`;
